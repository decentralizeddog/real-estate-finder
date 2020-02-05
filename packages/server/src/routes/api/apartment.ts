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
  Apartment,
  IApartment,
} from '../../models';
import { UserRole } from '@shared/types';

const router: Router = Router();

// @route   POST api/apartment/list
// @desc    Get apartments list
// @access  Private
router.post('/list', MiddlewareAuth, async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    else {
      const { sizeFilter, priceFilter, roomFilter } = req.body;
      let apartments: Array<IApartment> = [];
      if (user.role === UserRole.Client) {
        apartments = await Apartment.find({ rented: false });
      }
      else {
        apartments = await Apartment.find();
      }

      if (sizeFilter) {
        apartments = apartments.filter((apartment) => apartment.size >= sizeFilter);
      }
      if (priceFilter) {
        apartments = apartments.filter((apartment) => apartment.price >= priceFilter);
      }
      if (roomFilter) {
        apartments = apartments.filter((apartment) => apartment.roomNums >= roomFilter);
      }
      res.json(apartments);
    }
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

// @route   POST api/apartment
// @desc    Create apartment
// @access  Private
router.post('/', MiddlewareAuth, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST)
            .json({
              errors: errors.array(),
            });
  }

  const { name, description, size, price, roomNums, coordinates } = req.body;
  
  try {
    const user: IUser | null = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    if (user.role === UserRole.Client) {
      res.status(HttpStatusCodes.BAD_REQUEST)
        .send('You are not allowed to create apartment');
    }

    const apartment = new Apartment({
      name,
      description,
      size,
      price,
      roomNums,
      realtorId: req.userId,
      coordinates: coordinates,
    });
    await apartment.save();
    res.json({
      _id: apartment.id,
      name,
      description,
      size,
      price,
      roomNums,
      realtor: user,
      coordinates: coordinates,
      rented: apartment.rented,
      created: apartment.created,
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

// @route   POST api/apartment/update
// @desc    Update apartment
// @access  Private
router.post('/update', MiddlewareAuth, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST)
            .json({
              errors: errors.array(),
            });
  }

  const { id, name, description, size, price, roomNums, rented, coordinates } = req.body;
  try {
    const user: IUser | null = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    if (user.role === UserRole.Client) {
      res.status(HttpStatusCodes.BAD_REQUEST)
        .send('You are not allowed to edit apartment');
    }

    let apartment: IApartment | null = await Apartment.findById(id);
    if (!apartment) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
    }
    apartment.name = name;
    apartment.description = description;
    apartment.size = size;
    apartment.price = price;
    apartment.roomNums = roomNums;
    apartment.rented = rented;
    apartment.realtorId = user.id;
    apartment.coordinates = coordinates;
    await apartment.save();

    res.json({
      _id: apartment.id,
      name,
      description,
      size,
      price,
      roomNums,
      realtor: user,
      rented: apartment.rented,
      coordinates: apartment.coordinates,
      created: apartment.created,
    });

  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

// @route   POST api/apartment/remove
// @desc    Remove apartment
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
    if (user.role === UserRole.Client) {
      res.status(HttpStatusCodes.BAD_REQUEST)
        .send('You are not allowed to remove apartment');
    }

    const response = await Apartment.findByIdAndRemove(id);
    res.json(response);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error');
  }
});

export const routerApartment = router;
