import { RootState } from 'types';
import { UsersReducerType } from './usersReducer';
import { createSelector } from 'reselect';

export const selectUsersState = (state: RootState, props?: any): UsersReducerType => {
  return state.users;
};

export const selectUsersList = createSelector(
  [ selectUsersState ],
  (usersState) => usersState.usersList,
);

export const selectUsersError = createSelector(
  [ selectUsersState ],
  (usersState) => usersState.error,
);

export const selectUsersFormField = createSelector(
  [ selectUsersState ],
  (usersState) => usersState.usersForm,
);

export const selectUsersFormFieldError = createSelector(
  [ selectUsersState ],
  (usersState) => usersState.usersFormError,
);

export const selectUserAddDialogOpenStatus = createSelector(
  [ selectUsersState ],
  (usersState) => usersState.addDialogOpen,
);

export const selectUserEditDialogOpenStatus = createSelector(
  [ selectUsersState ],
  (usersState) => usersState.editDialogOpen,
);
