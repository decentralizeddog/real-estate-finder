import { AuthType } from './authTypes';
import { ApartmentType } from './apartmentTypes';
import { UsersType } from './usersType';

export interface Action<T> {
    type: IActionType;
    payload: T;
}

export interface FormFieldPayload<T> {
    index?: number | string;
    key: T;
    value: string | any;
}

enum BasicType {
    INIT_STORE = 'ON_INIT',
    SET_NAVIGATION = 'SET_NAVIGATION',
    SET_LOADING = 'SET_LOADING',
}

export type IActionType = 
    | BasicType
    | AuthType
    | ApartmentType
    | UsersType;

export const ActionType = {
    ...BasicType,
    ...AuthType,
    ...ApartmentType,
    ...UsersType,
};
