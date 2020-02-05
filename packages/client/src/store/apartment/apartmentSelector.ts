import { RootState } from 'types';
import { ApartmentReducerType } from './apartmentReducer';
import { createSelector } from 'reselect';

export const selectApartmentState = (state: RootState, props?: any): ApartmentReducerType => {
  return state.apartment;
};

export const selectApartmentList = createSelector(
  [ selectApartmentState ],
  (apartmentState) => apartmentState.apartmentList,
);

export const selectApartmentError = createSelector(
  [ selectApartmentState ],
  (apartmentState) => apartmentState.error,
);

export const selectApartmentFormField = createSelector(
  [ selectApartmentState ],
  (apartmentState) => apartmentState.apartmentForm,
);

export const selectApartmentFormFieldError = createSelector(
  [ selectApartmentState ],
  (apartmentState) => apartmentState.apartmentFormError,
);

export const selectApartmentFilter = createSelector(
  [ selectApartmentState ],
  (apartmentState) => apartmentState.filter,
);

export const selectDialogOpenStatus = createSelector(
  [ selectApartmentState ],
  (apartmentState) => apartmentState.dialogOpen,
);
