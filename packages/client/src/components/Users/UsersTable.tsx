import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  
} from '@material-ui/core';
import { Delete, Edit, Add } from '@material-ui/icons';
import moment from 'moment';

// redux
import { RootState } from 'types';
import { selectCurrentUser } from 'store/auth/authSelector';
import { User } from '@shared/types';
import { UserAddModal, UserEditModal } from 'components';
import { selectUsersList, selectUsersError, selectUserAddDialogOpenStatus, selectUserEditDialogOpenStatus } from 'store/users/usersSelector';
import { populateUsersForm, updateUser, removeUser, setUserAddDialogOpenStatus, setUserEditDialogOpenStatus } from 'store/users/actions';
import { theme } from 'utils';

// eslint-disable-next-line
const useStyles = makeStyles({
  container: {
  },
  table: {
  },
  tableHeader: {
    background: `rgba(0, 0, 0, 0.15)`,
  },
  tableHeaderRow: {
    height: 60,
  },
  tableHeaderCell: {
    fontSize: 15,
  },
  tableBodyFont: {
  },
  button: {
    marginTop: theme.spacing.unit,
    fontSize: 18,
    fontWeight: 700,
  },
  descCol: {
    width: '20%',
  },
  addButtonContainer: {
    marginTop: theme.spacing.unit,
  }
});

interface StateFromProps {
  list: ReturnType<typeof selectUsersList>;
  error: ReturnType<typeof selectUsersError>;
  currentUser: ReturnType<typeof selectCurrentUser>;
  addDialogOpenStatus: ReturnType<typeof selectUserAddDialogOpenStatus>;
  editDialogOpenStatus: ReturnType<typeof selectUserEditDialogOpenStatus>;
}
interface DispatchFromProps {
  prepoulateForm: typeof populateUsersForm;
  updateUser: typeof updateUser;
  removeUser: typeof removeUser;
  setAddDialogOpenStatus: typeof setUserAddDialogOpenStatus;
  setEditDialogOpenStatus: typeof setUserEditDialogOpenStatus;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const UsersTable = ({
  list,
  error,
  currentUser,
  prepoulateForm,
  updateUser,
  removeUser,
  addDialogOpenStatus,
  editDialogOpenStatus,
  setAddDialogOpenStatus,
  setEditDialogOpenStatus
}: Props) => {
  const classes = useStyles();
  return (
    <div>
      <div>
        <Paper>
          <TableContainer className={classes.container}>
            <Table className={classes.table}>
              <TableHead className={classes.tableHeader}>
                <TableRow className={classes.tableHeaderRow}>
                  <TableCell className={classes.tableHeaderCell}>{`Name`}</TableCell>
                  <TableCell className={classes.tableHeaderCell}>{`Email`}</TableCell>
                  <TableCell className={classes.tableHeaderCell}>{`Created`}</TableCell>
                  <TableCell className={classes.tableHeaderCell}>{`User Role`}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {!error && list && list.length ? list.map((item, index) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell className={classes.tableBodyFont}>{item.name}</TableCell>
                      <TableCell className={classes.tableBodyFont}>{item.email}</TableCell>
                      <TableCell className={classes.tableBodyFont}>{moment(item.created).format('YYYY-MM-DD')}</TableCell>
                      <TableCell className={classes.tableBodyFont}>{item.role}</TableCell>
                      <TableCell align='right'>
                        <IconButton color='secondary' onClick={() => {
                          prepoulateForm(item);
                          setEditDialogOpenStatus(true);
                        }}>
                          <Edit />
                        </IconButton>
                        <IconButton color='secondary' onClick={() => removeUser(item._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                }): null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>  
      </div>
      <Grid className={classes.addButtonContainer}>
        <Button
          variant='contained'
          style={{ textTransform: "none", width: "100%" }}
          startIcon={<Add />}
          className={classes.button}
          onClick={() => setAddDialogOpenStatus(true)}
        >
          Add New User
        </Button>
      </Grid>
      <UserAddModal
        open={addDialogOpenStatus}
        onClose={() => setAddDialogOpenStatus(false)}
      />
      <UserEditModal
        open={editDialogOpenStatus}
        onClose={() => setEditDialogOpenStatus(false)}
      />
    </div>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    list: selectUsersList(state),
    error: selectUsersError(state),
    currentUser: selectCurrentUser(state),
    addDialogOpenStatus: selectUserAddDialogOpenStatus(state),
    editDialogOpenStatus: selectUserEditDialogOpenStatus(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    prepoulateForm: (payload: User) => dispatch(populateUsersForm(payload)),
    updateUser: () => dispatch(updateUser()),
    removeUser: (payload: string) => dispatch(removeUser(payload)),
    setAddDialogOpenStatus: (payload: boolean) => dispatch(setUserAddDialogOpenStatus(payload)),
    setEditDialogOpenStatus: (payload: boolean) => dispatch(setUserEditDialogOpenStatus(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersTable);
