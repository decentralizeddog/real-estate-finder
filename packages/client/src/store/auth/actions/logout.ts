import { ActionType } from 'types';

export const userLogout = () => {
  return {
    type: ActionType.AUTH_LOGOUT,
  }
}