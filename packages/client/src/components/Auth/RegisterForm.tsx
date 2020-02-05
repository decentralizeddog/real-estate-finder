import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Select,
  TextField,
  Paper,
} from '@material-ui/core';

// redux
import { RootState, RegisterFormFieldPayload, RegisterFormKeys } from 'types';
import { theme } from 'utils';
import { selectRegisterForm, selectRegisterFormError, selectIsLoggedin } from 'store/auth/authSelector';
import { setRegisterFormField, userRegister } from 'store/auth/actions/register';
import { UserRole } from '@shared/types';

// eslint-disable-next-line
const useStyles = () => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  container: {
    padding: theme.spacing.unit,
    maxWidth: 600,
    minWidth: 480,
  }
});

interface StateFromProps {
  form: ReturnType<typeof selectRegisterForm>;
  error: ReturnType<typeof selectRegisterFormError>;
  loggedIn: ReturnType<typeof selectIsLoggedin>;
}
interface DispatchFromProps {
  setRegisterFormField: typeof setRegisterFormField;
  userRegister: typeof userRegister;
}
interface OwnProps {}
interface StyleProps {
  classes: any,
}

type Props = StateFromProps & DispatchFromProps & OwnProps & StyleProps;

export const AuthRegisterForm = ({
  classes,
  form,
  error,
  setRegisterFormField,
  userRegister,
  loggedIn,
}: Props) => {
  if (loggedIn) {
    return <Redirect to='/private' />
  }
  return (
    <Paper className={classes.container}>
      <div className={classes.margin}>
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
                    setRegisterFormField({
                      key: RegisterFormKeys.name,
                      value: value,
                    });
                  }}
                  value={form[RegisterFormKeys.name]}
                  error={!!error[RegisterFormKeys.name]}
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
                  setRegisterFormField({
                    key: RegisterFormKeys.email,
                    value: value,
                  });
                }}
                value={form[RegisterFormKeys.email]}
                error={!!error[RegisterFormKeys.email]}
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
                    setRegisterFormField({
                      key: RegisterFormKeys.password,
                      value: value,
                    });
                  }}
                  value={form[RegisterFormKeys.password]}
                  error={!!error[RegisterFormKeys.password]}
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
                  setRegisterFormField({
                    key: RegisterFormKeys.role,
                    value: value,
                  });
                }}
                value={form[RegisterFormKeys.role]}
                error={!!error[RegisterFormKeys.role]}
              >
                <option value={UserRole.Client}>Client</option>
                <option value={UserRole.Realtor}>Realtor</option>
                <option value={UserRole.Admin}>Admin</option>
              </Select>
            </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '30px' }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ textTransform: "none", width: "100px" }}
              onClick={() => {
                userRegister();
              }}
            >
              Register
            </Button>
        </Grid>
      </div>
  </Paper>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    form: selectRegisterForm(state),
    error: selectRegisterFormError(state),
    loggedIn: selectIsLoggedin(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    setRegisterFormField: (payload: RegisterFormFieldPayload) => dispatch(setRegisterFormField(payload)),
    userRegister: () => dispatch(userRegister()),
  }
}

AuthRegisterForm.prototype = {
  classes: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(useStyles)(AuthRegisterForm))
