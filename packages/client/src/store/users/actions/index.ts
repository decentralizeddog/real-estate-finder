import { ActionType, UsersFormFieldPayload } from 'types';
import { User } from '@shared/types';

export const getUsersList = () => {
  return {
    type: ActionType.USERS_GET_LIST_REQUEST,
  }
}

export const getUsersListSuccess = (payload: Array<User>) => {
  return {
    type: ActionType.USERS_GET_LIST_SUCCESS,
    payload,
  }
}

export const getUsersListFailure = (payload: string) => {
  return {
    type: ActionType.USERS_GET_LIST_FAILURE,
    payload,
  }
}

export const setUsersFormField = (payload: UsersFormFieldPayload) => {
  return {
    type: ActionType.USERS_SET_FORM_FIELD,
    payload,
  }
}

export const setUsersFormFieldError = (payload: UsersFormFieldPayload) => {
  return {
    type: ActionType.USERS_SET_FORM_FIELD_ERROR,
    payload,
  }
}

export const clearUsersFormField = () => {
  return {
    type: ActionType.USERS_CLEAR_FORM_FIELD,
  }
}

export const populateUsersForm = (payload: User) => {
  return {
    type: ActionType.USERS_POPULATE_FORM_FIELD,
    payload,
  }
}

export const submitUsersForm = () => {
  return {
    type: ActionType.USERS_SUBMIT_FORM_REQUEST,
  }
}

export const submitUsersFormSuccess = (payload: User) => {
  return {
    type: ActionType.USERS_SUBMIT_FORM_SUCCESS,
    payload,
  }
}

export const submitUsersFormFailure = (payload: string) => {
  return {
    type: ActionType.USERS_SUBMIT_FORM_FAILURE,
    payload,
  }
}

export const updateUser = () => {
  return {
    type: ActionType.USERS_UPDATE_REQUEST,
  }
}

export const updateUserSuccess = (payload: User) => {
  return {
    type: ActionType.USERS_UPDATE_SUCCESS,
    payload,
  }
}

export const updateUserFailure = (payload: string) => {
  return {
    type: ActionType.USERS_UPDATE_FAILURE,
    payload,
  }
}

export const removeUser = (payload: string) => {
  return {
    type: ActionType.USERS_REMOVE_REQUEST,
    payload,
  }
}

export const removeUserSuccess = (payload: string) => {
  return {
    type: ActionType.USERS_REMOVE_SUCCESS,
    payload,
  }
}

export const removeUserFailure = (payload: string) => {
  return {
    type: ActionType.USERS_REMOVE_FAILURE,
    payload,
  }
}

export const setUserAddDialogOpenStatus = (payload: boolean) => {
  return {
    type: ActionType.USER_SET_ADD_DIALOG_OPEN_STATUS,
    payload,
  }
}

export const setUserEditDialogOpenStatus = (payload: boolean) => {
  return {
    type: ActionType.USER_SET_EDIT_DIALOG_OPEN_STATUS,
    payload,
  }
}
