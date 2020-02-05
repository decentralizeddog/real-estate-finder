import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { RootState, UsersFormKeys, UsersFormFieldPayload } from 'types';
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
import { selectUsersFormField, selectUsersFormFieldError } from 'store/users/usersSelector';
import { updateUser, setUsersFormField, clearUsersFormField } from 'store/users/actions';
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
  error: ReturnType<typeof selectUsersFormFieldError>;
}
interface DispatchFromProps {
  setUsersFormField: typeof setUsersFormField;
  updateUser: typeof updateUser;
  clearForm: typeof clearUsersFormField;
}
interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const UserEditModal = ({
  open,
  onClose,
  form,
  error,
  setUsersFormField,
  updateUser,
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
              error={!!error[UsersFormKeys.name]}
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
            error={!!error[UsersFormKeys.email]}
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
              error={!!error[UsersFormKeys.role]}
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
          updateUser();
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
    form: selectUsersFormField(state),
    error: selectUsersFormFieldError(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    setUsersFormField: (payload: UsersFormFieldPayload) => dispatch(setUsersFormField(payload)),
    updateUser: () => dispatch(updateUser()),
    clearForm: () => dispatch(clearUsersFormField()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserEditModal);
