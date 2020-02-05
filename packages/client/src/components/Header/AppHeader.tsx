import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// redux
import { RootState } from 'types';
import { selectIsLoggedin } from 'store/auth/authSelector';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Avatar,
} from '@material-ui/core';
import { userLogout } from 'store/auth/actions';

// eslint-disable-next-line
const useStyles = () => ({
  container: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  }
});

interface StateFromProps {
  loggedIn: ReturnType<typeof selectIsLoggedin>;
}
interface DispatchFromProps {
  userLogout: typeof userLogout;
}
interface OwnProps {}
interface StyleProps {
  classes: any,
}

type Props = StateFromProps & DispatchFromProps & OwnProps & StyleProps;

export const AppHeader = ({
  loggedIn,
  classes,
  userLogout,
}: Props) => {
  return (
    <div className={classes.container}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h6'>Appartment Rental</Typography>
          {!loggedIn ? (
            <div>
              <Button color='inherit' href='/login'>Login</Button>
              <Button color='inherit' href='/register'>Register</Button>
            </div>
          ) : (
            <div style={{display: 'flex'}}>
              <Avatar />
              <Button color='inherit' onClick={userLogout}>Logout</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    loggedIn: selectIsLoggedin(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    userLogout: () => dispatch(userLogout()),
  }
}
AppHeader.prototype = {
  classes: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(useStyles)(AppHeader))
