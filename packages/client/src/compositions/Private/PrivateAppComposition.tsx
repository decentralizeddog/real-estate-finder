import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// components
import { ApartmentsTable, AppHeader, ApartmentAddModal, ApartmentsFilterForm, ApartmentsMap, UsersTable } from 'components';
// redux
import { RootState } from 'types';

import { CheckLoggedInFlow } from 'flows';
import { theme } from 'utils';
import {
  Grid,
  Button,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { selectCurrentUser } from 'store/auth/authSelector';
import { UserRole } from '@shared/types';
import { selectDialogOpenStatus } from 'store/apartment/apartmentSelector';
import { setDialogOpenStatus } from 'store/apartment/actions';

// eslint-disable-next-line
const useStyles = (window: any) => ({
  container: {
    backgroundColor: theme.palette.primary[0],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  topContainer: {
    width: '70%',
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    [window.breakpoints.down('md')]: {
      width: '100%',
    }
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  bottomWrapper: {
    width: '70%',
    [window.breakpoints.down('md')]: {
      width: '100%',
    }
  },
  button: {
    marginTop: theme.spacing.unit,
    fontSize: 18,
    fontWeight: 700,
  },
  filterContainer: {
    marginBottom: theme.spacing.unit
  },
  usersTableContainer: {
    marginTop: theme.spacing.unit * 2,
  }
});

interface StateFromProps {
  currentUser: ReturnType<typeof selectCurrentUser>;
  dialogOpenStatus: ReturnType<typeof selectDialogOpenStatus>;
}
interface DispatchFromProps {
  setDialogOpenStatus: typeof setDialogOpenStatus;
}
interface OwnProps {}
interface StyleProps {
  classes: any,
}

type Props = StateFromProps & DispatchFromProps & OwnProps & StyleProps;

export const PrivateAppComposition = ({
  currentUser,
  classes,
  dialogOpenStatus,
  setDialogOpenStatus
}: Props) => {

  return (
    <CheckLoggedInFlow>
      <div>
        <AppHeader />
        <div className={classes.container}>
          <div className={classes.topContainer}>
            <ApartmentsMap />
          </div>
          <div className={classes.bottomContainer}>
            <div className={classes.bottomWrapper}>
              <Grid className={classes.filterContainer}>
              <ApartmentsFilterForm />
              </Grid>
              <Grid>
                <ApartmentsTable />
              </Grid>
              {currentUser && currentUser.role !== UserRole.Client && <Grid>
                <Button
                  variant='contained'
                  style={{ textTransform: "none", width: "100%" }}
                  startIcon={<Add />}
                  className={classes.button}
                  onClick={() => setDialogOpenStatus(true)}
                >
                  Add New Apartment
                </Button>
              </Grid>}
              {currentUser && currentUser.role === UserRole.Admin && (
                <Grid className={classes.usersTableContainer}>
                  <UsersTable />
                </Grid>
              )}
            </div>
          </div>
        </div>
        <ApartmentAddModal
          open={dialogOpenStatus}
          onClose={() => setDialogOpenStatus(false)}
        />
      </div>
    </CheckLoggedInFlow>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    currentUser: selectCurrentUser(state),
    dialogOpenStatus: selectDialogOpenStatus(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    setDialogOpenStatus: (payload: boolean) => dispatch(setDialogOpenStatus(payload)),
  }
}

PrivateAppComposition.prototype = {
  classes: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(useStyles)(PrivateAppComposition))
