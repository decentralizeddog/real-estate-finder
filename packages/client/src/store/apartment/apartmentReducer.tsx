import {
  ActionType, ApartmentForm, FieldErrors, defaultApartmentForm, ApartmentFilter, defaultApartmentFilter,
} from 'types';
import createReducer from 'store/config/createReducer';
import { Apartment } from '@shared/types';
import { getApartmentListSuccessReducer, getApartmentListFailureReducer, apartmentSetFormFieldReducer, apartmentSetFormFieldErrorReducer, submitApartmentFormSuccessReducer, submitApartmentFormFailureReducer, apartmentClearFormFieldReducer, populateApartmentFormReducer, updateApartmentSuccessReducer, updateApartmentFailureReducer, removeApartmentSuccessReducer, removeApartmentFailureReducer, setApartmentFilterReducer, setDialogOpenStatusReducer } from './reducers';

export interface ApartmentReducerType {
  apartmentList: Array<Apartment>;
  error?: any;
  dialogOpen: boolean;

  apartmentForm: ApartmentForm;
  apartmentFormError: FieldErrors;

  filter: ApartmentFilter;
}

export const defaultState: ApartmentReducerType = {
  apartmentList: [],
  error: undefined,
  dialogOpen: false,

  apartmentForm: defaultApartmentForm,
  apartmentFormError: {},

  filter: defaultApartmentFilter,
}

export const apartmentReducer = createReducer<ApartmentReducerType>(defaultState, {
  [ActionType.APARTMENT_GET_LIST_SUCCESS]: getApartmentListSuccessReducer,
  [ActionType.APARTMENT_GET_LIST_FAILURE]: getApartmentListFailureReducer,

  [ActionType.APARTMENT_SET_FORM_FIELD]: apartmentSetFormFieldReducer,
  [ActionType.APARTMENT_SET_FORM_FIELD_ERROR]: apartmentSetFormFieldErrorReducer,
  [ActionType.APARTMENT_CLEAR_FORM_FIELD]: apartmentClearFormFieldReducer,
  [ActionType.APARTMENT_POPULATE_FORM_FIELD]: populateApartmentFormReducer,

  [ActionType.APARTMENT_SUBMIT_FORM_SUCCESS]: submitApartmentFormSuccessReducer,
  [ActionType.APARTMENT_SUBMIT_FORM_FAILURE]: submitApartmentFormFailureReducer,

  [ActionType.APARTMENT_UPDATE_SUCCESS]: updateApartmentSuccessReducer,
  [ActionType.APARTMENT_UPDATE_FAILURE]: updateApartmentFailureReducer,

  [ActionType.APARTMENT_REMOVE_SUCCESS]: removeApartmentSuccessReducer,
  [ActionType.APARTMENT_REMOVE_FAILURE]: removeApartmentFailureReducer,

  [ActionType.APARTMENT_SET_FILTER]: setApartmentFilterReducer,
  [ActionType.APARTMENT_SET_DIALOG_OPEN_STATUS]: setDialogOpenStatusReducer,
});
