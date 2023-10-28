import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { RoomTypeService, ShortStayBookingService } from '../../apis/rest.app';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import RoomRow from './RoomRow';
import * as PropTypes from 'prop-types';
import MiddleSection from './MiddleSection';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import AboutVendorComponent from './AboutVendorComponent';
import ReturnPolicyComponent from './ReturnPolicyComponent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import BookingTableRow from './BookingTableRow';

const useStyle = makeStyles(() => ({
  divider: {
    borderBottom: '1.8px solid #c5c5c5',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BottomSection({ propertyData }) {
  const classes = useStyle();
  const [roomList, setRoomList] = useState([]);
  const [shortStayBookingList, setShortStayBookingList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [transactionList, setTransactionList] = useState([]);
  const Router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const LoadRooms = () => {
    RoomTypeService.find({
      query: {
        // $skip: roomList.length,
        $limit: 5,
        property: propertyData?._id,
        $populate: 'facilities',
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((response) => {
        // console.log('Product ress-->',response);
        const { data, total } = response;
        let _roomList = roomList;
        _roomList = [..._roomList, ...data];
        setRoomList([..._roomList]);
        setHasMore(_roomList.length < total);
      })
      .catch((e) => {
        setError(e);
        enqueueSnackbar(e.message, {
          variant: 'error',
        });
      });
  };

  const LoadShortStayBookings = () => {
    ShortStayBookingService.find({
      query: {
        $populate: ['roomType', 'customer'],
        // $skip: shortStayBookingList.length,
        $limit: 5,
        property: propertyData?._id,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((response) => {
        // console.log('response......', response);
        const { data, total } = response;
        let _bookingList = shortStayBookingList;
        _bookingList = [..._bookingList, ...data];
        setShortStayBookingList([..._bookingList]);
        setHasMore(_bookingList < total);
      })
      .catch((e) => {
        enqueueSnackbar(e.message, {
          variant: 'error',
        });
      });
  };

  const LoadTransaction = () => {
    ReedemRequestService.find({
      query: { $populate: ['business'], status: 2, $skip: transactionList.length, business: propertyData?._id },
    })
      .then((response) => {
        const { data, total } = response;
        let _transactionList = transactionList;
        _transactionList = [..._transactionList, ...data];
        setTransactionList([..._transactionList]);
        setHasMore(_transactionList < total);
        // console.log('response', response);
      })
      .catch((e) => {
        enqueueSnackbar(e.message, {
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    if (propertyData?._id) {
      LoadRooms();
      LoadShortStayBookings();
      // LoadTransaction();
    }
  }, [propertyData]);

  return (
    <>
      {propertyData && (
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12}>
            <Paper elevation={0} style={{ height: 500 }}>
              <Tabs
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
                indicatorColor={'primary'}
                value={value}
                onChange={handleChange}
              >
                <Tab
                  style={{
                    width: '50%',
                  }}
                  color={'primary'}
                  label="Basic Details"
                  {...a11yProps(0)}
                />
                <Divider orientation={'vertical'} className={classes.divider} light />
                <Tab
                  style={{
                    width: '50%',
                  }}
                  label="Policy"
                  {...a11yProps(2)}
                />
                <Divider orientation={'vertical'} className={classes.divider} light />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Box mt={3} />
                <MiddleSection propertyData={propertyData} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ReturnPolicyComponent propertyData={propertyData} />
              </TabPanel>
            </Paper>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Typography variant="h5">Rooms</Typography>
            <Box mt={1} />
            <Paper style={{ overflowY: 'scroll' }}>
              {roomList.length ? (
                <Table>
                  <TableHead>
                    <TableCell style={{ fontWeight: 'bold' }}>{'Name'}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{'Category'}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{'Status'}</TableCell>
                    <TableCell align={'center'} style={{ fontWeight: 'bold' }}>
                      {'View'}
                    </TableCell>
                  </TableHead>
                  <TableBody>
                    {roomList &&
                      roomList.map((each, index) => (
                        <RoomRow
                          each={each}
                          position={index}
                          key={each?._id}
                          productList={roomList}
                          setProductList={setRoomList}
                        />
                      ))}
                  </TableBody>
                </Table>
              ) : error ? (
                <Typography variant="body2" align="center">
                  {error.message}
                </Typography>
              ) : !hasMore ? (
                <Typography variant="body2" align="center">
                  {'No Rooms found'}
                </Typography>
              ) : (
                ''
              )}
              {!(roomList < 1) && (
                <Button
                  color="primary"
                  fullWidth
                  onClick={() => {
                    Router.push(`/properties/all-rooms?property=${propertyData?._id}`);
                  }}
                >
                  View All Rooms
                </Button>
              )}
            </Paper>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Typography variant="h5">Bookings</Typography>
            <Box mt={1} />
            <Paper style={{ overflowY: 'scroll' }}>
              {shortStayBookingList.length ? (
                <Table>
                  <TableHead>
                    {/*<TableCell>{'SL No.'}</TableCell>*/}
                    <TableCell style={{ fontWeight: 'bold' }}>{'Name'}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{'Date'}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{'Type'}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>{'Price'}</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align={'center'}>
                      {'View'}
                    </TableCell>
                  </TableHead>
                  <TableBody>
                    {shortStayBookingList &&
                      shortStayBookingList.map((each, index) => (
                        <BookingTableRow
                          each={each}
                          position={index}
                          key={each?._id}
                          orderList={shortStayBookingList}
                          setOrderList={setShortStayBookingList}
                        />
                      ))}
                  </TableBody>
                </Table>
              ) : error ? (
                <Typography variant="body2" align="center">
                  {error.message}
                </Typography>
              ) : !hasMore ? (
                <Typography variant="body2" align="center">
                  {'No Bookings found'}
                </Typography>
              ) : (
                ''
              )}
              {!(shortStayBookingList < 6) && (
                <Button
                  color="primary"
                  fullWidth
                  onClick={() => {
                    Router.push(`/properties/all-bookings?property=${propertyData?._id}`);
                  }}
                >
                  View All Bookings
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}
BottomSection.propTypes = {
  propertyData: PropTypes.object.isRequired,
};
export default BottomSection;
