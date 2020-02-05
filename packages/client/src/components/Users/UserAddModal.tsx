import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { RootState, UsersFormFieldPayload, UsersFormKeys } from 'types';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Select
} from '@material-ui/core';
import { theme } from 'utils';
import {
  selectUsersFormField,
  selectUsersFormFieldError,
  selectUsersError
} from 'store/users/usersSelector';
import { setUsersFormField, submitUsersForm, clearUsersFormField } from 'store/users/actions';
import { UserRole } from '@shared/types';

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
  form: ReturnType<typeof selectUsersFormField>;
  formError: ReturnType<typeof selectUsersFormFieldError>;
  error: ReturnType<typeof selectUsersError>;
}
interface DispatchFromProps {
  setUsersFormField: typeof setUsersFormField;
  submitUsersForm: typeof submitUsersForm;
  clearForm: typeof clearUsersFormField;
}
interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const UserAddModal = ({
  open,
  onClose,
  form,
  formError,
  setUsersFormField,
  submitUsersForm,
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
      <DialogTitle>{`Add New User`}</DialogTitle>
      <DialogContent className={classes.container}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              label="Name"
              type="text"
              fullWidth
              autoFocus
              required
              onChange={(event) => {
                const { value } = event.target;
                setUsersFormField({
                  key: UsersFormKeys.name,
                  value: value,
                });
              }}
              value={form[UsersFormKeys.name]}
              error={!!formError[UsersFormKeys.name]}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField
            label="Email"
            type="email"
            fullWidth
            autoFocus
            required
            onChange={(event) => {
              const { value } = event.target;
              setUsersFormField({
                key: UsersFormKeys.email,
                value: value,
              });
            }}
            value={form[UsersFormKeys.email]}
            error={!!formError[UsersFormKeys.email]}
          />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              onChange={(event) => {
                const { value } = event.target;
                setUsersFormField({
                  key: UsersFormKeys.password,
                  value: value,
                });
              }}
              value={form[UsersFormKeys.password]}
              error={!!formError[UsersFormKeys.password]}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <Select
              placeholder={`Select User Role`}
              name={`user_role`}
              fullWidth
              native
              required
              onChange={(event) => {
                const { value } = event.target;
                setUsersFormField({
                  key: UsersFormKeys.role,
                  value: value,
                });
              }}
              value={form[UsersFormKeys.role]}
              error={!!formError[UsersFormKeys.role]}
            >
              <option value={UserRole.Client}>Client</option>
              <option value={UserRole.Realtor}>Realtor</option>
              <option value={UserRole.Admin}>Admin</option>
            </Select>
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
          submitUsersForm();
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
    form: selectUsersFormField(state),
    formError: selectUsersFormFieldError(state),
    error: selectUsersError(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    setUsersFormField: (payload: UsersFormFieldPayload) => dispatch(setUsersFormField(payload)),
    submitUsersForm: () => dispatch(submitUsersForm()),
    clearForm: () => dispatch(clearUsersFormField()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAddModal);
