import { MiddlewareAuth } from '../../middleware';
import bcrypt from 'bcryptjs';
import config from 'config';
import { check, validationResult } from 'express-validator/check';
import { Router, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import {
  Request,
  Payload,
} from 'types';
import {
  User,
  IUser,
} from '../../models';
import { UserRole } from '@shared/types';

const router: Router = Router();

// @route   POST api/user
// @desc    Get authorized user by given user id
// @access  Private
router.post('/', MiddlewareAuth, async (req: Request, res: Response) => {
  try {
    const exists: IUser | null = await User.findById(req.userId).select('-password');
    if (!exists) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    else {
      const { userId } = req.body;
      const user: IUser | null = await User.findById(userId).select('-password');
      if (!user) {
        res.status(HttpStatusCodes.BAD_REQUEST)
          .send('Not exist');
      }
      else {
        res.json(user);
      }
    }
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

// @route   GET api/user/list
// @desc    Get users list
// @access  Private
router.get('/list', MiddlewareAuth, async (req: Request, res: Response) => {
  try {
    const exists: IUser | null = await User.findById(req.userId).select('-password');
    if (!exists) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    else {
      if (exists.role === UserRole.Admin) {
        const users: Array<IUser> = await User.find({ $or: [ {'role': UserRole.Client}, {'role': UserRole.Realtor} ] }).select('-password');
        res.json(users);
      }
      else {
        res.status(HttpStatusCodes.BAD_REQUEST)
          .send('You are not allowed to see users info');
      }
    }
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

// @route   POST api/user/create
// @desc    Admin create user
// @access  Private
router.post('/create', MiddlewareAuth, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST)
            .json({
              errors: errors.array(),
            });
  }

  const { name, email, password, role } = req.body;
  
  try {
    const user: IUser | null = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    if (user.role !== UserRole.Admin) {
      res.status(HttpStatusCodes.BAD_REQUEST)
        .send('You are not allowed to create user');
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role,
    });
    await newUser.save();
    res.json({
      _id: newUser.id,
      name,
      email,
      password,
      role,
      created: newUser.created,
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

// @route   POST api/user/update
// @desc    Admin update user
// @access  Private
router.post('/update', MiddlewareAuth, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST)
            .json({
              errors: errors.array(),
            });
  }

  const { id, name, email, role } = req.body;
  try {
    const user: IUser | null = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    if (user.role !== UserRole.Admin) {
      res.status(HttpStatusCodes.BAD_REQUEST)
        .send('You are not allowed to edit user');
    }

    let update: IUser | null = await User.findById(id);
    if (!update) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    update.name = name;
    update.email = email;
    update.role = role;
    await update.save();

    res.json({
      _id: update.id,
      name,
      email,
      password: update.password,
      role,
      created: update.created,
    });

  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

// @route   POST api/user/remove
// @desc    Admin remove user
// @access  Private
router.post('/remove', MiddlewareAuth, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST)
            .json({
              errors: errors.array(),
            });
  }

  const { id } = req.body;
  try {
    const user: IUser | null = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    if (user.role !== UserRole.Admin) {
      res.status(HttpStatusCodes.BAD_REQUEST)
        .send('You are not allowed to remove user');
    }

    const response = await User.findByIdAndRemove(id);
    res.json(response);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

export const routerUser = router;
