import React, { useEffect, useState } from 'react';
import property from '../../../public/Hotel_background2.png';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Confirm from '../../components/Confirm';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { PropertyService, WalletService } from '../../apis/rest.app';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ContentLayout from '../../components/ContentLayout';
import InfiniteScroll from '../../components/InfiniteScroll';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
// import AllTransactionRow from '../TransactionComponent/AllTransactionRow';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import propTypes from 'prop-types';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EditPropertyDialog from './EditPropertyDialog';

const useStyles = makeStyles((theme) => ({
  Shop: {
    height: 160,
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: 110,
    },
  },
  AvatarPic: {
    height: '130px',
    width: '130px',
    margin: '-65px 10px 0px 10px',
    border: '2px solid white',
    [theme.breakpoints.down('sm')]: {
      height: '90px',
      width: '90px',
      margin: '-45px 10px 0px 10px',
    },
  },
}));

function TopSection({ propertyData, setPropertyData }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [wallet, setWallet] = useState();
  const [open, setOpen] = React.useState(false);
  const [requestList, setRequestList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const Router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = Router.query;

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);

  useEffect(() => {
    if (propertyData?.owner?._id)
      WalletService.find({
        query: {
          property: propertyData?._id,
        },
      })
        .then((res) => {
          setWallet(res.data?.find((element) => element.amount !== 0));
        })
        .catch((e) => {
          enqueueSnackbar(e ? e.message : 'Something went wrong', {
            variant: 'error',
          });
        });
  }, []);

  const blockProperty = () => {
    setLoading(true);
    Confirm('Are you sure ?', 'Do you really want to Block This Property?', 'Block', '')
      .then(() => {
        PropertyService.patch(id, { status: 2 })
          .then(() => {
            setPropertyData({
              ...propertyData,
              status: 2,
            });
            enqueueSnackbar('Blocked successfully!', { variant: 'success' });
          })
          .catch((error) => {
            enqueueSnackbar(error.message ? error.message : 'Something went wrong!', { variant: 'error' });
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch({});
  };

  const unblockProperty = () => {
    setLoading(true);
    Confirm('Are you sure ?', 'Do you really want to Un-Block This Property?', 'Un-Block', '')
      .then(() => {
        PropertyService.patch(id, { status: 1 })
          .then(() => {
            setPropertyData({
              ...propertyData,
              status: 1,
            });
            // console.log('business unblock=======>', response);
          })
          .catch((error) => {
            setError(error);
            enqueueSnackbar(error.message ? error.message : 'Something went wrong!', { variant: 'error' });
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch({});
  };

  return (
    <>
      {propertyData && (
        <Box>
          <img className={classes.Shop} src={property} alt={'Shop Image'} />
          <Box display="flex" justifyContent="space-between">
            <Box display="flex">
              <Avatar variant="square" className={classes.AvatarPic} src={propertyData && propertyData.avatar} />
              <Box ml={2} mt={1} display={'flex'}>
                <Box mr={4}>
                  <Box display={'flex'} alignItems={'center'}>
                    <AccountBalanceWalletIcon style={{ marginRight: 10 }} />
                    <Typography variant="button">Wallet</Typography>
                  </Box>
                  <Typography style={{ fontSize: 25 }}>{`Rs. ${wallet?.amount ? wallet.amount : 0}`}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'}>
                  <Typography variant="button" style={{ marginBottom: 4 }}>
                    Short Stay Rating
                  </Typography>
                  <Box display={'flex'}>
                    <Typography variant={'h3'}>
                      {`${propertyData.averageShortStayRating ? propertyData.averageShortStayRating : 0}★`}
                    </Typography>
                    <Button
                      color={'primary'}
                      onClick={() => {
                        Router.push(`/properties/all-rating?property=${propertyData?._id}&bookingType=1`);
                      }}
                    >
                      View Rating
                    </Button>
                  </Box>
                </Box>
                <Box mx={1} />
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'}>
                  <Typography variant="button" style={{ marginBottom: 4 }}>
                    ResFe Rating
                  </Typography>
                  <Box display={'flex'}>
                    <Typography variant={'h3'}>
                      {`${propertyData.averageResFeRating ? propertyData.averageResFeRating : 0}★`}
                    </Typography>
                    <Button
                      color={'primary'}
                      onClick={() => {
                        Router.push(`/properties/all-rating?property=${propertyData?._id}&bookingType=2`);
                      }}
                    >
                      View Rating
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box display={'flex'}>
              <Box mr={2}>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
              </Box>
              <Box mr={2}>
                <Button
                  variant={'contained'}
                  fullWidth
                  color="primary"
                  onClick={() => Router.push(`/properties/all-transactions?property=${propertyData._id}`)}
                >
                  Transactions
                </Button>
              </Box>
              <Box>
                {propertyData.status === 1 && (
                  <Button variant="contained" color="primary" fullWidth onClick={blockProperty}>
                    Block
                  </Button>
                )}
                {propertyData.status === 2 && (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      unblockProperty();
                    }}
                  >
                    Un-Block
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Box mt={1} />
        </Box>
      )}
      <EditPropertyDialog open={open} setOpen={setOpen} propertyData={propertyData} setPropertyData={setPropertyData} />
    </>
  );
}
TopSection.propTypes = {
  propertyData: propTypes.object.isRequired,
  setPropertyData: propTypes.any,
};

export default TopSection;
