import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
// components
import { AppHeader } from 'components';
// redux
import { RootState } from 'types';

import bgImage from 'assets/img/background.jpg';
import { selectIsLoggedin } from 'store/auth/authSelector';

// eslint-disable-next-line
const useStyles = makeStyles({
  container: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    minWidth: 680,
  }
});

interface StateFromProps {
  loggedIn: ReturnType<typeof selectIsLoggedin>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const AppComposition = ({ loggedIn }: Props) => {
  const classes = useStyles();
  if (loggedIn) {
    return <Redirect to='/private' />
  }
  return (
    <div className={classes.container}>
      <AppHeader />
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
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComposition)
