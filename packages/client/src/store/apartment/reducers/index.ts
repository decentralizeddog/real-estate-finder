import { Action, ApartmentFormFieldPayload, defaultApartmentForm, ApartmentFormKeys, ApartmentFilterFieldPayload } from 'types';
import { ApartmentReducerType } from '../apartmentReducer';
import { Apartment } from '@shared/types';

export const getApartmentListSuccessReducer = (
  state: ApartmentReducerType,
  { payload }: Action<Array<Apartment>>,
): ApartmentReducerType => {
  return {
    ...state,
    apartmentList: payload,
    error: undefined,
  };
}

export const getApartmentListFailureReducer = (
  state: ApartmentReducerType,
  { payload }: Action<string>,
): ApartmentReducerType => {
  return {
    ...state,
    apartmentList: [],
    error: payload,
  }
}

export const apartmentSetFormFieldReducer = (
  state: ApartmentReducerType,
  { payload }: Action<ApartmentFormFieldPayload>,
): ApartmentReducerType => {
  return {
    ...state,
    apartmentForm: {
      ...state.apartmentForm,
      [payload.key]: payload.value,
    },
    apartmentFormError: {
      ...state.apartmentFormError,
      [payload.key]: '',
    }
  }
}

export const apartmentSetFormFieldErrorReducer = (
  state: ApartmentReducerType,
  { payload }: Action<ApartmentFormFieldPayload>,
): ApartmentReducerType => {
  return {
    ...state,
    apartmentFormError: {
      ...state.apartmentFormError,
      [payload.key]: payload.value,
    }
  }
}

export const apartmentClearFormFieldReducer = (
  state: ApartmentReducerType,
): ApartmentReducerType => {
  return {
    ...state,
    apartmentForm: defaultApartmentForm,
    apartmentFormError: {},
  }
}

export const populateApartmentFormReducer = (
  state: ApartmentReducerType,
  { payload }: Action<Apartment>
): ApartmentReducerType => {
  return {
    ...state,
    apartmentForm: {
      [ApartmentFormKeys.id]: payload._id,
      [ApartmentFormKeys.name]: payload.name,
      [ApartmentFormKeys.description]: payload.description,
      [ApartmentFormKeys.size]: payload.size,
      [ApartmentFormKeys.price]: payload.price,
      [ApartmentFormKeys.roomNums]: payload.roomNums,
      [ApartmentFormKeys.rented]: payload.rented,
      [ApartmentFormKeys.coordinates]: payload.coordinates || [],
    },
    apartmentFormError: {}
  }
}

export const submitApartmentFormSuccessReducer = (
  state: ApartmentReducerType,
  { payload }: Action<Apartment>,
): ApartmentReducerType => {
  return {
    ...state,
    apartmentList: [
      ...state.apartmentList,
      payload,
    ],
    error: undefined,
  }
}

export const submitApartmentFormFailureReducer = (
  state: ApartmentReducerType,
  { payload }: Action<string>,
): ApartmentReducerType => {
  return {
    ...state,
    error: payload,
  }
}

export const updateApartmentSuccessReducer = (
  state: ApartmentReducerType,
  { payload }: Action<Apartment>,
): ApartmentReducerType => {
  return {
    ...state,
    apartmentList: state.apartmentList.map((item: Apartment) => item._id !== payload._id ? item : payload),
    error: undefined
  }
}

export const updateApartmentFailureReducer = (
  state: ApartmentReducerType,
  { payload }: Action<string>,
): ApartmentReducerType => {
  return {
    ...state,
    error: payload,
  }
}

export const removeApartmentSuccessReducer = (
  state: ApartmentReducerType,
  { payload }: Action<string>,
): ApartmentReducerType => {
  return {
    ...state,
    apartmentList: state.apartmentList.filter((item: Apartment) => item._id !== payload),
    error: undefined,
  }
}

export const removeApartmentFailureReducer = (
  state: ApartmentReducerType,
  { payload }: Action<string>,
): ApartmentReducerType => {
  return {
    ...state,
    error: payload,
  }
}

export const setApartmentFilterReducer = (
  state: ApartmentReducerType,
  { payload }: Action<ApartmentFilterFieldPayload>,
): ApartmentReducerType => {
  return {
    ...state,
    filter: {
      ...state.filter,
      [payload.key]: payload.value,
    }
  }
}

export const setDialogOpenStatusReducer = (
  state: ApartmentReducerType,
  { payload }: Action<boolean>,
): ApartmentReducerType => {
  return {
    ...state,
    dialogOpen: payload
  }
}
