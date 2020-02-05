import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Paper,
} from '@material-ui/core';
import {
  Face,
  Fingerprint,
} from '@material-ui/icons';

// redux
import { RootState, LoginFormFieldPayload, LoginFormKeys } from 'types';
import { theme } from 'utils';
import { selectLoginForm, selectLoginFormError, selectIsLoggedin } from 'store/auth/authSelector';
import { setLoginFormField, userLogin } from 'store/auth/actions';

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
  form: ReturnType<typeof selectLoginForm>;
  error: ReturnType<typeof selectLoginFormError>;
  loggedIn: ReturnType<typeof selectIsLoggedin>;
}
interface DispatchFromProps {
  setLoginFormField: typeof setLoginFormField;
  userLogin: typeof userLogin;
}
interface OwnProps {}
interface StyleProps {
  classes: any,
}

type Props = StateFromProps & DispatchFromProps & OwnProps & StyleProps;

export const LoginForm = ({
  classes,
  form,
  error,
  setLoginFormField,
  userLogin,
  loggedIn,
}: Props) => {
  if (loggedIn) {
    return <Redirect to='/private' />
  }
  return (
    <Paper className={classes.container}>
      <div className={classes.margin}>
          <Grid>
            
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                  <Face />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    autoFocus
                    required
                    onChange={(event) => {
                      const { value } = event.target;
                      setLoginFormField({
                        key: LoginFormKeys.email,
                        value: value,
                      });
                    }}
                    value={form[LoginFormKeys.email]}
                    error={!!error[LoginFormKeys.email]}
                  />
              </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                  <Fingerprint />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    onChange={(event) => {
                      const { value } = event.target;
                      setLoginFormField({
                        key: LoginFormKeys.password,
                        value: value,
                      });
                    }}
                    value={form[LoginFormKeys.password]}
                    error={!!error[LoginFormKeys.password]}
                  />
              </Grid>
          </Grid>
          <Grid container alignItems="center" justify="space-between">
              <Grid item>
                  <FormControlLabel control={
                      <Checkbox
                          color="primary"
                      />
                  } label="Remember me" />
              </Grid>
              <Grid item>
                  <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
              </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ textTransform: "none", width: "100px" }}
                onClick={userLogin}
              >
                Login
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
    form: selectLoginForm(state),
    error: selectLoginFormError(state),
    loggedIn: selectIsLoggedin(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    setLoginFormField: (payload: LoginFormFieldPayload) => dispatch(setLoginFormField(payload)),
    userLogin: () => dispatch(userLogin()),
  }
}

LoginForm.prototype = {
  classes: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(useStyles)(LoginForm))
