import {
  ActionType,
  UsersForm,
  FieldErrors,
  defaultUsersForm,
} from 'types';
import createReducer from 'store/config/createReducer';
import { User } from '@shared/types';
import {
  getUsersListSuccessReducer,
  getUsersListFailureReducer,
  usersSetFormFieldReducer,
  usersSetFormFieldErrorReducer,
  usersClearFormFieldReducer,
  populateUsersFormReducer,
  submitUsersFormSuccessReducer,
  submitUsersFormFailureReducer,
  updateUserSuccessReducer,
  updateUserFailureReducer,
  removeUserSuccessReducer,
  removeUserFailureReducer,
  setUserAddDialogOpenStatusReducer,
  setUserEditDialogOpenStatusReducer,
} from './reducers';

export interface UsersReducerType {
  usersList: Array<User>;
  error?: any;
  addDialogOpen: boolean;
  editDialogOpen: boolean;

  usersForm: UsersForm;
  usersFormError: FieldErrors;
}

export const defaultState: UsersReducerType = {
  usersList: [],
  addDialogOpen: false,
  editDialogOpen: false,

  usersForm: defaultUsersForm,
  usersFormError: {},
}

export const usersReducer = createReducer<UsersReducerType>(defaultState, {
  [ActionType.USERS_GET_LIST_SUCCESS]: getUsersListSuccessReducer,
  [ActionType.USERS_GET_LIST_FAILURE]: getUsersListFailureReducer,

  [ActionType.USERS_SET_FORM_FIELD]: usersSetFormFieldReducer,
  [ActionType.USERS_SET_FORM_FIELD_ERROR]: usersSetFormFieldErrorReducer,
  [ActionType.USERS_CLEAR_FORM_FIELD]: usersClearFormFieldReducer,
  [ActionType.USERS_POPULATE_FORM_FIELD]: populateUsersFormReducer,

  [ActionType.USERS_SUBMIT_FORM_SUCCESS]: submitUsersFormSuccessReducer,
  [ActionType.USERS_SUBMIT_FORM_FAILURE]: submitUsersFormFailureReducer,

  [ActionType.USERS_UPDATE_SUCCESS]: updateUserSuccessReducer,
  [ActionType.USERS_UPDATE_FAILURE]: updateUserFailureReducer,

  [ActionType.USERS_REMOVE_SUCCESS]: removeUserSuccessReducer,
  [ActionType.USERS_REMOVE_FAILURE]: removeUserFailureReducer,

  [ActionType.USER_SET_ADD_DIALOG_OPEN_STATUS]: setUserAddDialogOpenStatusReducer,
  [ActionType.USER_SET_EDIT_DIALOG_OPEN_STATUS]: setUserEditDialogOpenStatusReducer,
});
