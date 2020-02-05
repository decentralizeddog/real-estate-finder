import { Request } from 'express';
import { Payload } from './payload';

export type Request = Request & Payload;
