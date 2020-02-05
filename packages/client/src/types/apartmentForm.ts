import { FormFieldPayload } from './actionTypes';

export enum ApartmentFormKeys {
  id = 'id',
  name = 'name',
  description = 'description',
  size = 'size',
  price = 'price',
  roomNums = 'roomNums',
  rented = 'rented',
  coordinates = 'coordinates',
  address = 'address',
}

export interface ApartmentForm {
  [ApartmentFormKeys.id]?: string;
  [ApartmentFormKeys.name]: string;
  [ApartmentFormKeys.description]: string;
  [ApartmentFormKeys.size]: number;
  [ApartmentFormKeys.price]: number;
  [ApartmentFormKeys.roomNums]: number;
  [ApartmentFormKeys.rented]: boolean;
  [ApartmentFormKeys.coordinates]?: Array<number>;
  [ApartmentFormKeys.address]?: string;
}

export const defaultApartmentForm: ApartmentForm = {
  [ApartmentFormKeys.name]: '',
  [ApartmentFormKeys.description]: '',
  [ApartmentFormKeys.size]: 0,
  [ApartmentFormKeys.price]: 0,
  [ApartmentFormKeys.roomNums]: 0,
  [ApartmentFormKeys.rented]: false,
}

export type ApartmentFormFieldPayload = FormFieldPayload<ApartmentFormKeys>;
