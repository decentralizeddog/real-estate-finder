import { BasicReducerType } from 'store/app/basicReducer';
import { AuthReducerType } from 'store/auth/authReducer';
import { ApartmentReducerType } from 'store/apartment/apartmentReducer';
import { UsersReducerType } from 'store/users/usersReducer';

export interface RootState {
    basic: BasicReducerType;
    auth: AuthReducerType;
    apartment: ApartmentReducerType;
    users: UsersReducerType;
}
