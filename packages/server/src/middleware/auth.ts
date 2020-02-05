import config from 'config';
import { Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Payload } from 'types';

export function MiddlewareAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization');

  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({
        message: 'UnAuthorized, no token',
      });
  }

  // Verify token
  try {
    const payload: Payload | any = jwt.verify(token, config.get('jwtSecret'));
    req.userId = payload.userId;
    next();
  } catch (error) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({
        message: 'Invalid Token',
      });
  }
}
