import { ActionType, ApartmentFormFieldPayload, ApartmentFilterFieldPayload } from 'types';
import { Apartment } from '@shared/types';

export const getApartmentList = () => {
  return {
    type: ActionType.APARTMENT_GET_LIST_REQUEST,
  }
}

export const getApartmentListSuccess = (payload: Array<Apartment>) => {
  return {
    type: ActionType.APARTMENT_GET_LIST_SUCCESS,
    payload,
  }
}

export const getApartmentListFailure = (payload: string) => {
  return {
    type: ActionType.APARTMENT_GET_LIST_FAILURE,
    payload,
  }
}


export const setApartmentFormField = (payload: ApartmentFormFieldPayload) => {
  return {
    type: ActionType.APARTMENT_SET_FORM_FIELD,
    payload,
  }
}

export const setApartmentFormFieldError = (payload: ApartmentFormFieldPayload) => {
  return {
    type: ActionType.APARTMENT_SET_FORM_FIELD_ERROR,
    payload,
  }
}

export const clearApartmentFormField = () => {
  return {
    type: ActionType.APARTMENT_CLEAR_FORM_FIELD,
  }
}

export const populateApartmentForm = (payload: Apartment) => {
  return {
    type: ActionType.APARTMENT_POPULATE_FORM_FIELD,
    payload,
  }
}

export const submitApartmentForm = () => {
  return {
    type: ActionType.APARTMENT_SUBMIT_FORM_REQUEST,
  }
}

export const submitApartmentFormSuccess = (payload: Apartment) => {
  return {
    type: ActionType.APARTMENT_SUBMIT_FORM_SUCCESS,
    payload,
  }
}

export const submitApartmentFormFailure = (payload: string) => {
  return {
    type: ActionType.APARTMENT_SUBMIT_FORM_FAILURE,
    payload,
  }
}

export const updateApartment = () => {
  return {
    type: ActionType.APARTMENT_UPDATE_REQUEST,
  }
}

export const updateApartmentSuccess = (payload: Apartment) => {
  return {
    type: ActionType.APARTMENT_UPDATE_SUCCESS,
    payload,
  }
}

export const updateApartmentFailure = (payload: string) => {
  return {
    type: ActionType.APARTMENT_UPDATE_FAILURE,
    payload,
  }
}

export const removeApartment = (payload: string) => {
  return {
    type: ActionType.APARTMENT_REMOVE_REQUEST,
    payload,
  }
}

export const removeApartmentSuccess = (payload: string) => {
  return {
    type: ActionType.APARTMENT_REMOVE_SUCCESS,
    payload,
  }
}

export const removeApartmentFailure = (payload: string) => {
  return {
    type: ActionType.APARTMENT_REMOVE_FAILURE,
    payload,
  }
}

export const setApartmentFilter = (payload: ApartmentFilterFieldPayload) => {
  return {
    type: ActionType.APARTMENT_SET_FILTER,
    payload,
  }
}

export const setDialogOpenStatus = (payload: boolean) => {
  return {
    type: ActionType.APARTMENT_SET_DIALOG_OPEN_STATUS,
    payload,
  }
}
