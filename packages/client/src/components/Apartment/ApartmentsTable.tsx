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
import { Delete, Edit } from '@material-ui/icons';
import moment from 'moment';

// redux
import { RootState } from 'types';
import { selectApartmentList, selectApartmentError } from 'store/apartment/apartmentSelector';
import { selectCurrentUser } from 'store/auth/authSelector';
import { UserRole, Apartment } from '@shared/types';
import { populateApartmentForm, updateApartment, removeApartment } from 'store/apartment/actions';
import { ApartmentEditModal } from 'components';

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
    fontSize: 12,
  },
  descCol: {
    width: '20%',
  }
});

interface StateFromProps {
  list: ReturnType<typeof selectApartmentList>;
  error: ReturnType<typeof selectApartmentError>;
  currentUser: ReturnType<typeof selectCurrentUser>;
}
interface DispatchFromProps {
  prepoulateForm: typeof populateApartmentForm;
  updateApartment: typeof updateApartment;
  removeApartment: typeof removeApartment;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const ApartmentsTable = ({
  list,
  error,
  currentUser,
  prepoulateForm,
  updateApartment,
  removeApartment,
}: Props) => {
  const [openEditModal, setOpenEditModal] = React.useState<boolean>(false);
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <TableContainer className={classes.container}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHeader}>
              <TableRow className={classes.tableHeaderRow}>
                <TableCell className={classes.tableHeaderCell}>{`Name`}</TableCell>
                <TableCell className={classes.tableHeaderCell}>{`Description`}</TableCell>
                <TableCell className={classes.tableHeaderCell}>{`Floor Area Size`}</TableCell>
                <TableCell className={classes.tableHeaderCell}>{`Price per month`}</TableCell>
                <TableCell className={classes.tableHeaderCell}>{`RoomCount`}</TableCell>
                <TableCell className={classes.tableHeaderCell}>{`Coordinates`}</TableCell>
                <TableCell className={classes.tableHeaderCell}>{`Created`}</TableCell>
                <TableCell className={classes.tableHeaderCell}>{`Realtor`}</TableCell>
                {currentUser && currentUser.role !== UserRole.Client ? (
                  <>
                    <TableCell className={classes.tableHeaderCell}>{`Rented/Available`}</TableCell>
                    <TableCell />
                  </>
                ): null}
              </TableRow>
            </TableHead>
            <TableBody>
              {!error && list && list.length ? list.map((item, index) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell className={classes.tableBodyFont}>{item.name}</TableCell>
                    <TableCell className={classes.descCol}>{item.description}</TableCell>
                    <TableCell className={classes.tableBodyFont}>{item.size} sqft</TableCell>
                    <TableCell className={classes.tableBodyFont}>$ {item.price}</TableCell>
                    <TableCell className={classes.tableBodyFont}>{item.roomNums}</TableCell>
                    <TableCell className={classes.tableBodyFont}>
                      {item.coordinates ? (
                        <>
                          <Grid>{`Lat : ${item.coordinates[0].toFixed(4)}`}</Grid>
                          <Grid>{`Lon : ${item.coordinates[1].toFixed(4)}`}</Grid>
                        </>
                      ) : `Invalid coordinates`}
                    </TableCell>
                    <TableCell className={classes.tableBodyFont}>{moment(item.created).format('YYYY-MM-DD')}</TableCell>
                    <TableCell className={classes.tableBodyFont}>{item.realtor ? item.realtor.name : ''}</TableCell>
                    {currentUser && currentUser.role !== UserRole.Client ? (
                      <>
                        <TableCell>
                          <Button color={item.rented ? 'primary' : 'secondary'} className={classes.button} onClick={() => {
                            prepoulateForm({
                              ...item,
                              rented: !item.rented
                            });
                            updateApartment();
                          }}>
                            {item.rented ? 'Set Available' : 'Set Rented'}
                          </Button>
                        </TableCell>
                        <TableCell align='right'>
                          <IconButton color='secondary' onClick={() => {
                            prepoulateForm(item);
                            setOpenEditModal(true);
                          }}>
                            <Edit />
                          </IconButton>
                          <IconButton color='secondary' onClick={() => removeApartment(item._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </>
                    ): null}
                  </TableRow>
                )
              }): null}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ApartmentEditModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </div>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    list: selectApartmentList(state),
    error: selectApartmentError(state),
    currentUser: selectCurrentUser(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    prepoulateForm: (payload: Apartment) => dispatch(populateApartmentForm(payload)),
    updateApartment: () => dispatch(updateApartment()),
    removeApartment: (payload: string) => dispatch(removeApartment(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApartmentsTable)
