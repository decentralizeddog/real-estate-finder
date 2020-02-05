import { combineReducers } from "redux";
import { basicReducer } from "store/app/basicReducer";
import { authReducer } from "store/auth/authReducer";
import { apartmentReducer } from 'store/apartment/apartmentReducer';
import { usersReducer } from 'store/users/usersReducer';

const appReducer = combineReducers({
    basic: basicReducer,
    auth: authReducer,
    apartment: apartmentReducer,
    users: usersReducer,
});

export default (state: any, action: any) => {
    return appReducer(state, action);
}
