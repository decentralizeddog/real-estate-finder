import { put, takeLatest, select, call, all, delay } from 'redux-saga/effects';
import {
  ActionType,
  RootState,
  ApartmentFormKeys,
  Action,
  ApartmentFilterKeys,
} from 'types';
import {
  apiUrl,
  apiOptions,
  ApiMethod,
  logger,
  fieldIsEmpty,
  GeocodeApiUrl,
  GeocodeApiKey,
} from 'utils';
import {
  Apartment,
} from '@shared/types';
import { selectAuthorization } from 'store/auth/authSelector';
import { getApartmentListFailure, getApartmentListSuccess, setApartmentFormFieldError, submitApartmentFormSuccess, submitApartmentFormFailure, clearApartmentFormField, updateApartmentSuccess, updateApartmentFailure, removeApartmentSuccess, removeApartmentFailure, setDialogOpenStatus } from '../actions';
import { selectApartmentFormField, selectApartmentFilter } from '../apartmentSelector';

function* fetchApartmentWithRealtor(item: any, auth: string) {
  const realtor = yield call(() => 
    fetch(`${apiUrl}/user`, apiOptions(ApiMethod.POST, { userId: item.realtorId }, auth))
      .then(res => res.json())
      .then(res => res)
  );

  const apartment: Apartment = {
    _id: item._id,
    name: item.name,
    description: item.description,
    size: item.size,
    price: item.price,
    roomNums: item.roomNums,
    realtor: realtor,
    rented: item.rented,
    created: item.created,
    ...item,
  };
  return apartment;
}

function* getApartmentList() {
  try {
    delay(500);
    logger(`get apartment list`);
    const state: RootState = yield select();
    const authorization = selectAuthorization(state);
    const filter = selectApartmentFilter(state);
    if (!authorization) return;

    const items = yield call(() =>
      fetch(`${apiUrl}/apartment/list`, apiOptions(ApiMethod.POST, {
        sizeFilter: filter[ApartmentFilterKeys.bySize],
        priceFilter: filter[ApartmentFilterKeys.byPrice],
        roomFilter: filter[ApartmentFilterKeys.byRooms]
      }, authorization))
      .then(res => res.json())
      .then(res => res)
    );
    const list = yield all(
      items.map((item: any) => call(fetchApartmentWithRealtor, item, authorization))
    );
    yield put(getApartmentListSuccess(list));
  } catch (error) {
    yield put(getApartmentListFailure(error));
  }
}

function* validateApartmentForm() {
  const form = selectApartmentFormField(yield select());
  let hasError = false;

  if (fieldIsEmpty(form[ApartmentFormKeys.name])) {
    hasError = true;
    yield put(setApartmentFormFieldError({
      key: ApartmentFormKeys.name,
      value: 'Name: Required Field'
    }));
  }
  if (!form[ApartmentFormKeys.size]) {
    hasError = true;
    yield put(setApartmentFormFieldError({
      key: ApartmentFormKeys.size,
      value: 'Floor Area Size: Required Field'
    }));
  }
  if (!form[ApartmentFormKeys.price]) {
    hasError = true;
    yield put(setApartmentFormFieldError({
      key: ApartmentFormKeys.price,
      value: 'Price per month: Required Field'
    }));
  }
  if (!form[ApartmentFormKeys.roomNums]) {
    hasError = true;
    yield put(setApartmentFormFieldError({
      key: ApartmentFormKeys.roomNums,
      value: 'Number of Rooms: Required Field'
    }));
  }
  if (!form[ApartmentFormKeys.address] && !form[ApartmentFormKeys.coordinates]) {
    hasError = true;
    yield put(setApartmentFormFieldError({
      key: ApartmentFormKeys.address,
      value: 'You should input address or validate coordinates',
    }));
  }

  return hasError;
}

function* submitApartmentForm() {
  try {
    logger(`submit apartment form`);
    const state: RootState = yield select();
    const authorization = selectAuthorization(state);
    const form = selectApartmentFormField(state);
    if (!authorization) return;

    // validate
    const hasError = yield call(validateApartmentForm);

    // submit
    if (!hasError) {
      let coordinates: Array<number> = [];
      if (!form[ApartmentFormKeys.coordinates] && form[ApartmentFormKeys.address]) {
        yield call(() => {
          fetch(`${GeocodeApiUrl}?address=${encodeURIComponent(form[ApartmentFormKeys.address]!)}&key=${GeocodeApiKey}`, { method: ApiMethod.GET })
          .then(res => res.json())
          .then(res => {
            if (res.results.length) {
              coordinates = [ res.results[0].geometry.location.lat, res.results[0].geometry.location.lng ];
            }
          })
        });
        yield delay(1500);
      }
      else {
        coordinates = form[ApartmentFormKeys.coordinates]!;
      }
      if (!coordinates.length) {
        yield put(setApartmentFormFieldError({
          key: ApartmentFormKeys.address,
          value: 'Invalid address',
        }));
      }
      else {
        const apartment = yield call(() =>
          fetch(`${apiUrl}/apartment`, apiOptions(ApiMethod.POST, {
            name: form[ApartmentFormKeys.name],
            description: form[ApartmentFormKeys.description] || '',
            size: form[ApartmentFormKeys.size],
            price: form[ApartmentFormKeys.price],
            roomNums: form[ApartmentFormKeys.roomNums],
            coordinates: coordinates,
          }, authorization))
          .then(res => res.json())
          .then(res => res)
        );

        yield put(submitApartmentFormSuccess(apartment));
        yield put(clearApartmentFormField());
        yield put(setDialogOpenStatus(false));
      }
    }
  } catch (error) {
    yield put(submitApartmentFormFailure(error));
  }
}

function* updateApartmentForm() {
  try {
    logger(`update apartment form`);
    const state: RootState = yield select();
    const authorization = selectAuthorization(state);
    const form = selectApartmentFormField(state);
    if (!authorization) return;

    const hasError = yield call(validateApartmentForm);

    if (!hasError) {
      const updated = yield call(() =>
        fetch(`${apiUrl}/apartment/update`, apiOptions(ApiMethod.POST, form, authorization))
        .then(res => res.json())
        .then(res => res)
      );

      yield put(updateApartmentSuccess(updated));
      yield put(clearApartmentFormField());
    }
  } catch (error) {
    yield put(updateApartmentFailure(error));
  }
}

function* removeApartment({ payload }: Action<string>) {
  try {
    logger(`remove apartment`);
    const state: RootState = yield select();
    const authorization = selectAuthorization(state);
    if (!authorization) return;

    yield call(() =>
      fetch(`${apiUrl}/apartment/remove`, apiOptions(ApiMethod.POST, { id: payload }, authorization))
      .then(res => res.json())
      .then(res => res)
    );

    yield put(removeApartmentSuccess(payload));
  } catch (error) {
    yield put(removeApartmentFailure(error));
  }
}

export function* apartmentWatcher() {
  yield takeLatest(ActionType.APARTMENT_GET_LIST_REQUEST as any, getApartmentList);
  yield takeLatest(ActionType.APARTMENT_SUBMIT_FORM_REQUEST as any, submitApartmentForm);
  yield takeLatest(ActionType.APARTMENT_UPDATE_REQUEST as any, updateApartmentForm);
  yield takeLatest(ActionType.APARTMENT_REMOVE_REQUEST as any, removeApartment);
}
