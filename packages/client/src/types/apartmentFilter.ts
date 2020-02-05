import { FormFieldPayload } from './actionTypes';

export enum ApartmentFilterKeys {
  bySize = 'size',
  byPrice = 'price',
  byRooms = 'room',
}

export interface ApartmentFilter {
  [ApartmentFilterKeys.bySize]?: number;
  [ApartmentFilterKeys.byPrice]?: number;
  [ApartmentFilterKeys.byRooms]?: number;
}

export const defaultApartmentFilter: ApartmentFilter = {
  [ApartmentFilterKeys.bySize]: undefined,
  [ApartmentFilterKeys.byPrice]: undefined,
  [ApartmentFilterKeys.byRooms]: undefined,
}

export type ApartmentFilterFieldPayload = FormFieldPayload<ApartmentFilterKeys>;
