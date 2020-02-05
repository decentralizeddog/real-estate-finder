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
import { selectApartmentFormField, selectApartmentFormFieldError, selectApartmentError } from 'store/apartment/apartmentSelector';
import { setApartmentFormField, submitApartmentForm, clearApartmentFormField } from 'store/apartment/actions';
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
  formError: ReturnType<typeof selectApartmentFormFieldError>;
  error: ReturnType<typeof selectApartmentError>;
}
interface DispatchFromProps {
  setApartmentFormField: typeof setApartmentFormField;
  submitApartmentForm: typeof submitApartmentForm;
  clearForm: typeof clearApartmentFormField;
}
interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const ApartmentAddModal = ({
  open,
  onClose,
  form,
  formError,
  setApartmentFormField,
  submitApartmentForm,
  clearForm,
  error,
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
      <DialogTitle>{`Add New Apartment`}</DialogTitle>
      <DialogContent className={classes.container}>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label={formError[ApartmentFormKeys.name] ? formError[ApartmentFormKeys.name] : "Name"}
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
            error={!!formError[ApartmentFormKeys.name]}
          />
        </Grid>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label={formError[ApartmentFormKeys.description] ? formError[ApartmentFormKeys.description] : "Description"}
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
            error={!!formError[ApartmentFormKeys.description]}
          />
        </Grid>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label={formError[ApartmentFormKeys.address] ? formError[ApartmentFormKeys.address] : "Address"}
            type="text"
            fullWidth
            onChange={(event) => {
              const { value } = event.target;
              console.log(value, form[ApartmentFormKeys.address]);
              setApartmentFormField({
                key: ApartmentFormKeys.address,
                value: value,
              });
            }}
            value={form[ApartmentFormKeys.address] || ''}
            error={!!formError[ApartmentFormKeys.address]}
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
              error={!!formError[ApartmentFormKeys.coordinates]}
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
              error={!!formError[ApartmentFormKeys.coordinates]}
            />
          </Grid>
        </Grid>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label={formError[ApartmentFormKeys.size] ? formError[ApartmentFormKeys.size] : "Floor Area Size"}
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
            error={!!formError[ApartmentFormKeys.size]}
          />
        </Grid>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label={formError[ApartmentFormKeys.price] ? formError[ApartmentFormKeys.price] : "Price per month"}
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
            error={!!formError[ApartmentFormKeys.price]}
          />
        </Grid>
        <Grid item md={true} sm={true} xs={true} className={classes.rowContainer}>
          <TextField
            label={formError[ApartmentFormKeys.roomNums] ? formError[ApartmentFormKeys.roomNums] : "Number of rooms"}
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
            error={!!formError[ApartmentFormKeys.roomNums]}
          />
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
          submitApartmentForm();
        }}>
          Add
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
    formError: selectApartmentFormFieldError(state),
    error: selectApartmentError(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    setApartmentFormField: (payload: ApartmentFormFieldPayload) => dispatch(setApartmentFormField(payload)),
    submitApartmentForm: () => dispatch(submitApartmentForm()),
    clearForm: () => dispatch(clearApartmentFormField()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApartmentAddModal);
