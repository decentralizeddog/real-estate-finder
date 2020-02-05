import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { RootState, ApartmentFormFieldPayload, ApartmentFormKeys } from 'types';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField
} from '@material-ui/core';
import { selectApartmentFormField, selectApartmentFormFieldError } from 'store/apartment/apartmentSelector';
import { setApartmentFormField, clearApartmentFormField, updateApartment } from 'store/apartment/actions';
import { theme } from 'utils';

const useStyles = makeStyles({
  container: {
    padding: '8px 40px',
  },
  rowContainer: {
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
  }
});

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
})

interface StateFromProps {
  form: ReturnType<typeof selectApartmentFormField>;
  error: ReturnType<typeof selectApartmentFormFieldError>;
}
interface DispatchFromProps {
  setApartmentFormField: typeof setApartmentFormField;
  updateApartment: typeof updateApartment;
  clearForm: typeof clearApartmentFormField;
}
interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const ApartmentEditModal = ({
  open,
  onClose,
  form,
  error,
  setApartmentFormField,
  updateApartment,
  clearForm,
}: Props) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>{`Edit Apartment`}</DialogTitle>
      <DialogContent className={classes.container}>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            autoFocus
            required
            onChange={(event) => {
              const { value } = event.target;
              setApartmentFormField({
                key: ApartmentFormKeys.name,
                value: value,
              });
            }}
            value={form[ApartmentFormKeys.name]}
            error={!!error[ApartmentFormKeys.name]}
          />
        </Grid>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label="Description"
            type="text"
            fullWidth
            onChange={(event) => {
              const { value } = event.target;
              setApartmentFormField({
                key: ApartmentFormKeys.description,
                value: value,
              });
            }}
            value={form[ApartmentFormKeys.description]}
            error={!!error[ApartmentFormKeys.description]}
          />
        </Grid>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label="Floor Area Size"
            type="number"
            fullWidth
            required
            onChange={(event) => {
              const { value } = event.target;
              setApartmentFormField({
                key: ApartmentFormKeys.size,
                value: value,
              });
            }}
            value={form[ApartmentFormKeys.size]}
            error={!!error[ApartmentFormKeys.size]}
          />
        </Grid>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label="Price per month"
            type="number"
            fullWidth
            required
            onChange={(event) => {
              const { value } = event.target;
              setApartmentFormField({
                key: ApartmentFormKeys.price,
                value: value,
              });
            }}
            value={form[ApartmentFormKeys.price]}
            error={!!error[ApartmentFormKeys.price]}
          />
        </Grid>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label="Number of rooms"
            type="number"
            fullWidth
            required
            onChange={(event) => {
              const { value } = event.target;
              setApartmentFormField({
                key: ApartmentFormKeys.roomNums,
                value: value,
              });
            }}
            value={form[ApartmentFormKeys.roomNums]}
            error={!!error[ApartmentFormKeys.roomNums]}
          />
        </Grid>
        <Grid container spacing={3} className={classes.rowContainer}>
          <Grid item xs={6}>
            <TextField
              label="Latitude"
              type="number"
              fullWidth
              onChange={(event) => {
                const { value } = event.target;
                const longitude = form[ApartmentFormKeys.coordinates] ? form[ApartmentFormKeys.coordinates]![1] : 0;
                setApartmentFormField({
                  key: ApartmentFormKeys.coordinates,
                  value: [value, longitude],
                });
              }}
              value={form[ApartmentFormKeys.coordinates] ? form[ApartmentFormKeys.coordinates]![0] : 0}
              error={!!error[ApartmentFormKeys.coordinates]}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Longitude"
              type="number"
              fullWidth
              onChange={(event) => {
                const { value } = event.target;
                const latitude = form[ApartmentFormKeys.coordinates] ? form[ApartmentFormKeys.coordinates]![0] : 0;
                setApartmentFormField({
                  key: ApartmentFormKeys.coordinates,
                  value: [latitude, value],
                });
              }}
              value={form[ApartmentFormKeys.coordinates] ? form[ApartmentFormKeys.coordinates]![1] : 0}
              error={!!error[ApartmentFormKeys.coordinates]}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={() => {
          clearForm();
          onClose();
        }}>
          Cancel
        </Button>
        <Button color='primary' onClick={() => {
          updateApartment();
          onClose();
        }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    form: selectApartmentFormField(state),
    error: selectApartmentFormFieldError(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    setApartmentFormField: (payload: ApartmentFormFieldPayload) => dispatch(setApartmentFormField(payload)),
    updateApartment: () => dispatch(updateApartment()),
    clearForm: () => dispatch(clearApartmentFormField()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApartmentEditModal);
