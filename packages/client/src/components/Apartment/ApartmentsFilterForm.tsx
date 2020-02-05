import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Select,
  Grid,
  FormControl,
  InputLabel,
} from '@material-ui/core';

// redux
import { RootState, ApartmentFilterFieldPayload, ApartmentFilterKeys } from 'types';
import { selectApartmentFilter } from 'store/apartment/apartmentSelector';
import { setApartmentFilter, getApartmentList } from 'store/apartment/actions';

// eslint-disable-next-line
const useStyles = makeStyles({
  container: {
    display: 'flex',
    padding: 20,
  },
  itemContainer: {
    dispay: 'flex',
  }
});

interface StateFromProps {
  filter: ReturnType<typeof selectApartmentFilter>;
}
interface DispatchFromProps {
  setApartmentFilter: typeof setApartmentFilter;
  getApartmentList: typeof getApartmentList;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const ApartmentsFilterForm = ({
  filter,
  setApartmentFilter,
  getApartmentList,
}: Props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={4} className={classes.itemContainer}>
          <FormControl fullWidth>
            <InputLabel>Floor area size</InputLabel>
            <Select
              fullWidth
              native
              onChange={(event) => {
                const { value } = event.target;
                setApartmentFilter({
                  key: ApartmentFilterKeys.bySize,
                  value: value === 'Any' ? undefined : value,
                });
                getApartmentList();
              }}
              value={filter[ApartmentFilterKeys.bySize]}
            >
              <option value={undefined}>Any</option>
              <option value={500}>500+ sqft</option>
              <option value={1000}>1000+ sqft</option>
              <option value={2000}>2000+ sqft</option>
              <option value={3000}>3000+ sqft</option>
              <option value={4000}>4000+ sqft</option>
              <option value={5000}>5000+ sqft</option>
              <option value={6000}>6000+ sqft</option>
              <option value={7000}>7000+ sqft</option>
              <option value={8000}>8000+ sqft</option>
              <option value={9000}>9000+ sqft</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Price per month</InputLabel>
            <Select
              fullWidth
              native
              onChange={(event) => {
                const { value } = event.target;
                setApartmentFilter({
                  key: ApartmentFilterKeys.byPrice,
                  value: value === 'Any' ? undefined : value,
                });
                getApartmentList();
              }}
              value={filter[ApartmentFilterKeys.byPrice]}
            >
              <option value={undefined}>Any</option>
              <option value={500}>$ 500+</option>
              <option value={1000}>$ 1000+</option>
              <option value={2000}>$ 2000+</option>
              <option value={3000}>$ 3000+</option>
              <option value={4000}>$ 4000+</option>
              <option value={5000}>$ 5000+</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Number of rooms</InputLabel>
            <Select
              fullWidth
              native
              onChange={(event) => {
                const { value } = event.target;
                setApartmentFilter({
                  key: ApartmentFilterKeys.byRooms,
                  value: value === 'Any' ? undefined : value,
                });
                getApartmentList();
              }}
              value={filter[ApartmentFilterKeys.byRooms]}
            >
              <option value={undefined}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={5}>5+</option>
              <option value={6}>6+</option>
              <option value={7}>7+</option>
              <option value={8}>8+</option>
              <option value={9}>9+</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    filter: selectApartmentFilter(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    setApartmentFilter: (payload: ApartmentFilterFieldPayload) => dispatch(setApartmentFilter(payload)),
    getApartmentList: () => dispatch(getApartmentList()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApartmentsFilterForm)
