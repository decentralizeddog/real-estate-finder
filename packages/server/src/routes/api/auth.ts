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

const router: Router = Router();

// @route   GET api/auth
// @desc    Get authorized user by given token
// @access  Private
router.get('/', MiddlewareAuth, async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    else {
      res.json(user);
    }
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({
          errors: errors.array(),
        });
    }

    const { email, password } = req.body;
    try {
      let user: IUser = await User.findOne({ email });

      if (!user) {
        return res.status(HttpStatusCodes.BAD_REQUEST)
            .json({
              errors: [
                {
                  message: 'Invalid Credentials'
                }
              ]
            });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(HttpStatusCodes.BAD_REQUEST)
            .json({
              errors: [
                {
                  message: 'Invalid Credentials'
                }
              ]
            });
      }

      const payload: Payload = {
        userId: user.id,
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: config.get('jwtExpiration'),
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      )
    } catch (error) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }
);

export const routerAuth = router;
