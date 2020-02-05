import { MiddlewareAuth } from '../../middleware';
import bcrypt from 'bcryptjs';
import config from 'config';
import { check, validationResult } from 'express-validator/check';
import { Router, Response } from 'express';
const express = require('express');
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

// @route   POST api/register
// @desc    register user
// @access  Public
router.post(
  '/',
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCodes.BAD_REQUEST)
              .json({
                errors: errors.array(),
              });
    }

    const { email, name, password, role } = req.body;
    try {
      User.findOne({ email })
        .then(exists => {
          if (exists) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
              errors: [{
                msg: 'User already exists'
              }]
            });
          }
        });
      
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
        password: hashed,
        role
      });

      await user.save();

      const payload: Payload = {
        userId: user.id
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: config.get('jwtExpiration') },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      )
    } catch (error) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }
)

export const routerRegister = router;