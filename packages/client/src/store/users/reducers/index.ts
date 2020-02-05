import { Action, UsersFormFieldPayload, defaultUsersForm, UsersFormKeys } from 'types';
import { UsersReducerType } from '../usersReducer';
import { User } from '@shared/types';

export const getUsersListSuccessReducer = (
  state: UsersReducerType,
  { payload }: Action<Array<User>>,
): UsersReducerType => {
  return {
    ...state,
    usersList: payload,
    error: undefined,
  };
}

export const getUsersListFailureReducer = (
  state: UsersReducerType,
  { payload }: Action<string>,
): UsersReducerType => {
  return {
    ...state,
    error: payload,
  }
}

export const usersSetFormFieldReducer = (
  state: UsersReducerType,
  { payload }: Action<UsersFormFieldPayload>,
): UsersReducerType => {
  return {
    ...state,
    usersForm: {
      ...state.usersForm,
      [payload.key]: payload.value,
    },
    usersFormError: {
      ...state.usersFormError,
      [payload.key]: '',
    }
  }
}

export const usersSetFormFieldErrorReducer = (
  state: UsersReducerType,
  { payload }: Action<UsersFormFieldPayload>,
): UsersReducerType => {
  return {
    ...state,
    usersFormError: {
      ...state.usersFormError,
      [payload.key]: payload.value,
    }
  }
}

export const usersClearFormFieldReducer = (
  state: UsersReducerType,
): UsersReducerType => {
  return {
    ...state,
    usersForm: defaultUsersForm,
    usersFormError: {},
  }
}

export const populateUsersFormReducer = (
  state: UsersReducerType,
  { payload }: Action<User>
): UsersReducerType => {
  return {
    ...state,
    usersForm: {
      [UsersFormKeys.id]: payload._id,
      [UsersFormKeys.name]: payload.name,
      [UsersFormKeys.email]: payload.email,
      [UsersFormKeys.role]: payload.role,
    },
    usersFormError: {}
  }
}

export const submitUsersFormSuccessReducer = (
  state: UsersReducerType,
  { payload }: Action<User>,
): UsersReducerType => {
  return {
    ...state,
    usersList: [
      ...state.usersList,
      payload,
    ],
    error: undefined,
  }
}

export const submitUsersFormFailureReducer = (
  state: UsersReducerType,
  { payload }: Action<string>,
): UsersReducerType => {
  return {
    ...state,
    error: payload,
  }
}

export const updateUserSuccessReducer = (
  state: UsersReducerType,
  { payload }: Action<User>,
): UsersReducerType => {
  return {
    ...state,
    usersList: state.usersList.map((item: User) => item._id !== payload._id ? item : payload),
    error: undefined
  }
}

export const updateUserFailureReducer = (
  state: UsersReducerType,
  { payload }: Action<string>,
): UsersReducerType => {
  return {
    ...state,
    error: payload,
  }
}

export const removeUserSuccessReducer = (
  state: UsersReducerType,
  { payload }: Action<string>,
): UsersReducerType => {
  return {
    ...state,
    usersList: state.usersList.filter((item: User) => item._id !== payload),
    error: undefined,
  }
}

export const removeUserFailureReducer = (
  state: UsersReducerType,
  { payload }: Action<string>,
): UsersReducerType => {
  return {
    ...state,
    error: payload,
  }
}

export const setUserAddDialogOpenStatusReducer = (
  state: UsersReducerType,
  { payload }: Action<boolean>,
): UsersReducerType => {
  return {
    ...state,
    addDialogOpen: payload
  }
}

export const setUserEditDialogOpenStatusReducer = (
  state: UsersReducerType,
  { payload }: Action<boolean>,
): UsersReducerType => {
  return {
    ...state,
    editDialogOpen: payload
  }
}
