import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// components
import { LoginForm } from 'components';
// redux
import { RootState } from 'types';

import bgImage from 'assets/img/apartment.jpg';

// eslint-disable-next-line
const useStyles = makeStyles({
  container: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    minWidth: 680,
  }
});

interface StateFromProps {
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const LoginComposition = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <LoginForm />
    </div>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComposition)
