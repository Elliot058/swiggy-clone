import React, { useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CircularProgress, TableCell } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ShortStayBookingService } from '../../apis/rest.app';
import { useSnackbar } from 'notistack';
import Box from '@material-ui/core/Box';
import InfiniteScroll from '../../components/InfiniteScroll';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from '../../components/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  tableRowCell: {
    fontSize: 14,
    lineHeight: '21px',
    fontWeight: 'bold',
    letterSpacing: '0.2px',
    color: '#868686',
  },
  tableBodyCell: {
    fontSize: 14,
    lineHeight: '21px',
    fontWeight: 400,
    letterSpacing: '0.2px',
    color: '#333333',
  },
  transactionWrapper: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    },
    // '&::-webkit-scrollbar-track': {
    //   boxShadow: '#E7DFF7',
    //   webkitBoxShadow: '#E7DFF7',
    //   background: '#E7DFF7',
    // },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#C4C4C4',
    },
  },
}));

const BookingComponent = ({ id, type }) => {
  const classes = useStyles();
  const [bookingList, setBookingList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const statusValues = {
    1: {
      value: 'Pending',
      color: 'blue',
    },
    2: {
      value: 'Booked',
      color: '#FBBC05',
    },
    3: {
      value: 'Rejected',
      color: 'red',
    },
    4: {
      value: 'Visited',
      color: 'green',
    },
    5: {
      value: 'Checked Out',
      color: 'green',
    },
    6: {
      value: 'Cancelled',
      color: 'red',
    },
  };

  const loadShortStayBookings = () => {
    ShortStayBookingService.find({
      query: {
        customer: id,
        type,
        $populate: 'property',
        $sort: {
          createdAt: -1,
        },
        $skip: bookingList.length,
      },
    })
      .then((res) => {
        // console.log(res);
        setBookingList([...bookingList, ...res.data]);
        setHasMore(bookingList.length < res.total);
      })
      .catch((e) => {
        enqueueSnackbar(e ? e.message : 'Something went wrong', {
          variant: 'error',
        });
      });
  };

  return (
    <Box height={503} className={classes.transactionWrapper}>
      <InfiniteScroll
        hasMore={hasMore}
        loader={
          <Box align={'center'} p={1} key={'all transaction loader'}>
            <CircularProgress size={28} />
          </Box>
        }
        loadMore={loadShortStayBookings}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.tableRowCell}>
                  Booking Id
                </TableCell>
                <TableCell align="center" className={classes.tableRowCell}>
                  Property
                </TableCell>
                <TableCell align="center" className={classes.tableRowCell}>
                  Status
                </TableCell>
                <TableCell align="center" className={classes.tableRowCell}>
                  Price(Rs.)
                </TableCell>
                <TableCell align="center" className={classes.tableRowCell}>
                  Date
                </TableCell>
                <TableCell align={'center'} className={classes.tableRowCell}>
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingList.length > 0 ? (
                bookingList?.map((each) => (
                  <TableRow key={each?._id}>
                    <TableCell component="th" scope="row" align="center" className={classes.tableBodyCell}>
                      {each?.bookingId}
                    </TableCell>
                    <TableCell align="center" className={classes.tableBodyCell}>
                      {each?.property?.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableBodyCell}
                      style={{ color: statusValues[each.status].color, fontWeight: 'bold' }}
                    >
                      {statusValues[each.status].value}
                    </TableCell>
                    <TableCell align="center" className={classes.tableBodyCell}>
                      {each.price}
                    </TableCell>
                    <TableCell align="center" className={classes.tableBodyCell}>
                      {moment(each?.createdAt).format('DD/MM/YYYY, h:mm a')}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={
                          each?.type === 1 ? `/bookings/all-short-stay/${each._id}` : `/bookings/all-resfe/${each._id}`
                        }
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ color: '#fff', borderRadius: '10px' }}
                        >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : !hasMore ? (
                <Box textAlign={'center'} mt={1} mb={1}>
                  {'No Bookings found'}
                </Box>
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </Box>
  );
};
BookingComponent.propTypes = {
  id: PropTypes.number,
  type: PropTypes.number,
};

export default BookingComponent;
