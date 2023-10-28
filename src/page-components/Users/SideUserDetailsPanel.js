import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditPencil from '../../../public/EditPencilIcon.svg';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import { UsersService } from '../../apis/rest.app';
import { useSnackbar } from 'notistack';
import { FormControlLabel, Switch } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles(() => ({
  switchComponent: {
    cursor: 'pointer',
  },
}));

const AntSwitch = withStyles(() => ({
  root: {
    width: 37,
    height: 17,
    padding: 0,
    display: 'flex',
    // borderRadius: 10,
  },
  switchBase: {
    padding: 2.5,
    color: '#F8A4AE',
    '&$checked': {
      transform: 'translateX(19px)',
      color: '#fff',
      '& + $track': {
        opacity: 1,
        backgroundColor: '#EE1B34',
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `2px solid red`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: '#fff',
  },
  checked: {},
}))(Switch);

const SideUserDetailsPanel = ({ switchComponent, setSwitchComponent, userDetails, setUserDetails, userId }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [commissionData, setCommissionData] = useState();

  // useEffect(() => {
  //   WalletService.find({
  //     query: {
  //       clientId: userId,
  //     },
  //   })
  //     .then((res) => {
  //       setWallet(res.data);
  //     })
  //     .catch((e) => {
  //       enqueueSnackbar(e ? e.message : 'Something went wrong', {
  //         variant: 'error',
  //       });
  //     });
  // }, []);
  //
  // useEffect(() => {
  //   GetCommissionValueService.create({
  //     clientId: userId,
  //   })
  //     .then((res) => {
  //       setCommissionData(res);
  //     })
  //     .catch((e) => {
  //       enqueueSnackbar(e ? e.message : 'Something went wrong', {
  //         variant: 'error',
  //       });
  //     });
  // }, []);

  return (
    <>
      <Box bgcolor={'#FFFFFF'} borderRadius={'5px'} boxShadow={'0px 16px 39px rgba(0, 0, 0, 0.05)'} p={3}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} alignItems={'center'}>
            <Box fontSize={12} lineHeight={'18px'} fontWeight={500} color={'#818181'}>
              User name
            </Box>
            <Box ml={5}>
              <FormControlLabel
                control={<AntSwitch color={'primary'} />}
                label={''}
                checked={userDetails?.status === 1}
                onChange={() => {
                  setUserDetails({
                    ...userDetails,
                    status: userDetails?.status === 1 ? 2 : 1,
                  });
                  UsersService.patch(userDetails?._id, {
                    status: userDetails?.status === 1 ? 2 : 1,
                  })
                    .then((res) => {
                      setUserDetails(res);
                      if (res.status === 1) {
                        enqueueSnackbar(`${res?.name} has been UnBlocked`, {
                          variant: 'success',
                        });
                      }
                      if (res.status === 2) {
                        enqueueSnackbar(`${res?.name} has been Blocked`, {
                          variant: 'success',
                        });
                      }
                    })
                    .catch((e) => {
                      enqueueSnackbar(e ? e.message : 'Something went wrong', {
                        variant: 'error',
                      });
                    });
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box mt={1} fontWeight={500} fontSize={16} lineHeight={'24px'} color={'#333333'}>
          {userDetails?.name}
        </Box>
        <Box mt={4}>
          <Box fontSize={12} lineHeight={'18px'} fontWeight={500} color={'#818181'}>
            Email ID
          </Box>
          <Box mt={2}>{userDetails?.email}</Box>
        </Box>
        <Box mt={4}>
          <Box fontSize={12} lineHeight={'18px'} fontWeight={500} color={'#818181'}>
            Phone
          </Box>
          <Box mt={2}>{userDetails?.phone ? userDetails.phone : 'N/A'}</Box>
        </Box>
      </Box>

      <Box
        mt={4}
        bgcolor={switchComponent === 'ShortStays' ? '#F8A4AE' : '#FFFFFF'}
        borderRadius={'5px 5px 0px 0px'}
        boxShadow={'0px 16px 39px rgba(0, 0, 0, 0.05)'}
        p={3}
        className={classes.switchComponent}
        onClick={() => setSwitchComponent('ShortStays')}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box
            fontSize={14}
            lineHeight={'21px'}
            fontWeight={400}
            color={switchComponent === 'ShortStays' ? '#EE1B34' : '#333333'}
          >
            Short Stay Bookings
          </Box>
        </Box>
      </Box>
      <Box
        mt={4}
        bgcolor={switchComponent === 'ResFe' ? '#F8A4AE' : '#FFFFFF'}
        borderRadius={'5px 5px 0px 0px'}
        boxShadow={'0px 16px 39px rgba(0, 0, 0, 0.05)'}
        p={3}
        className={classes.switchComponent}
        onClick={() => setSwitchComponent('ResFe')}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box
            fontSize={14}
            lineHeight={'21px'}
            fontWeight={400}
            color={switchComponent === 'ResFe' ? '#EE1B34' : '#333333'}
          >
            ResFe
          </Box>
        </Box>
      </Box>
      {/*<Box*/}
      {/*  bgcolor={switchComponent === 'Transaction' ? '#ECDBEC' : '#FFFFFF'}*/}
      {/*  borderRadius={'0px 0px 5px 5px'}*/}
      {/*  boxShadow={'0px 16px 39px rgba(0, 0, 0, 0.05)'}*/}
      {/*  p={3}*/}
      {/*  className={classes.switchComponent}*/}
      {/*  onClick={() => setSwitchComponent('Transaction')}*/}
      {/*>*/}
      {/*  <Box display={'flex'} justifyContent={'space-between'}>*/}
      {/*    <Box*/}
      {/*      fontSize={14}*/}
      {/*      lineHeight={'21px'}*/}
      {/*      fontWeight={400}*/}
      {/*      color={switchComponent === 'Transaction' ? '#800D80' : '#333333'}*/}
      {/*    >*/}
      {/*      Transactions*/}
      {/*    </Box>*/}
      {/*    /!*<Box*!/*/}
      {/*    /!*  fontSize={16}*!/*/}
      {/*    /!*  lineHeight={'24px'}*!/*/}
      {/*    /!*  fontWeight={500}*!/*/}
      {/*    /!*  color={switchComponent === 'Transaction' ? '#800D80' : '#333333'}*!/*/}
      {/*    /!*>*!/*/}
      {/*    /!*  Rs. 12,434.00*!/*/}
      {/*    /!*</Box>*!/*/}
      {/*  </Box>*/}
      {/*</Box>*/}
    </>
  );
};

SideUserDetailsPanel.propTypes = {
  switchComponent: PropTypes.string,
  setSwitchComponent: PropTypes.func,
  userDetails: PropTypes.object,
  setUserDetails: PropTypes.func,
  userId: PropTypes.string,
};

export default SideUserDetailsPanel;
