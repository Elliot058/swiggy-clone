import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  chipStyle: {
    maxWidth: 60,
  },
  heading: {
    color: '#91777A',
    fontWeight: 'bold',
  },
  styleScrollbar: {
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(27, 20, 100, 0.2)',
    },
  },
}));

const RoomDetailsDialog = ({ detailsOpen, setDetailsOpen, each, setEach }) => {
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={detailsOpen}
        maxWidth={'sm'}
        fullWidth
        onClose={() => {
          setDetailsOpen(false);
          if (setEach) {
            setEach(null);
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold' }}>
          {'Room Type Details'}
        </DialogTitle>
        <DialogContent>
          <Box mb={1}>
            <Box
              display={'flex'}
              style={{ overflowX: 'scroll', overflowY: 'hidden' }}
              className={classes.styleScrollbar}
              pt={1}
              pb={1}
            >
              {each?.attachments?.length > 0 ? (
                each?.attachments?.map((each, index) => (
                  <Box key={index} ml={index > 0 && 2}>
                    <Avatar variant={'square'} style={{ width: 100, height: 100 }} src={each} />
                  </Box>
                ))
              ) : (
                <Avatar variant="square" className={classes.AvatarPic} src={''} />
              )}
            </Box>
            <Box mt={1}>
              {each?.status === 1 ? (
                <Chip
                  icon={<CheckCircleOutlineIcon />}
                  label="Active"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
              ) : (
                <Chip icon={<NotInterestedIcon />} label="Inactive" variant="outlined" color="secondary" size="small" />
              )}
            </Box>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} sm={6} xs={12}>
              <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                <Typography variant="caption" className={classes.heading}>
                  Name:
                </Typography>
                <Typography style={{ fontSize: 13, fontWeight: 400 }}>{each?.name ? each.name : 'N/A'}</Typography>
              </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                <Typography variant="caption" className={classes.heading}>
                  Rating:
                </Typography>
                <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                  {each?.averageRating ? `${each.averageRating}★` : '0.0★'}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                <Typography variant="caption" className={classes.heading}>
                  Category:
                </Typography>
                <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                  {each?.roomCategory === 1 ? 'Short Stay' : 'ResFe'}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                <Typography variant="caption" className={classes.heading}>
                  Room Type:
                </Typography>
                <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                  {each?.roomType === 1 ? 'Normal' : 'Premium'}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant={'body2'}>Room Prices:</Typography>
              {each?.prices?.length > 0 ? (
                each?.prices?.map((each) => (
                  <Grid key={each?._id} container spacing={1}>
                    <Grid item md={4} sm={4} xs={12}>
                      <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                        <Typography variant="caption" className={classes.heading}>
                          Hour:
                        </Typography>
                        <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                          {each?.hour ? each?.hour : 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12}>
                      <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                        <Typography variant="caption" className={classes.heading}>
                          MRP(Rs.):
                        </Typography>
                        <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                          {each?.mrp ? each?.mrp : 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12}>
                      <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                        <Typography variant="caption" className={classes.heading}>
                          Price(Rs.):
                        </Typography>
                        <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                          {each?.price ? each?.price : 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid container spacing={2}>
                  <Grid item md={12} sm={12} xs={12}>
                    <Box display={'flex'} alignItems={'center'}>
                      {'No Prices found'}
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <Box>
                <Typography variant="caption" className={classes.heading}>
                  Description:
                </Typography>
                <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                  {each?.description ? each.description : 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <Box>
                <Typography variant="caption" className={classes.heading}>
                  Room Numbers:
                </Typography>
                <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                  {each?.roomNumbers ? each.roomNumbers.toString() : 'N/A'}
                </Typography>
              </Box>
            </Grid>
            {each?.roomCategory === 2 ? (
              <Grid item md={12} sm={12} xs={12}>
                <Box>
                  <Typography variant="caption" className={classes.heading}>
                    Food Order:
                  </Typography>
                  <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                    {each?.foodOrderEnabled ? 'Enabled' : 'Disabled'}
                  </Typography>
                </Box>
              </Grid>
            ) : (
              ''
            )}
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant={'caption'} className={classes.heading}>
                Room Amenities:
              </Typography>
              {each?.facilities?.length > 0 ? (
                each?.facilities?.map((each) => (
                  <Grid key={each?._id} container spacing={1}>
                    <Grid item md={6} sm={6} xs={12}>
                      <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                        <Avatar alt="Icon" src={each.icon} />
                      </Box>
                      <Box mt={1} />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                      <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                        <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                          {each?.name ? each?.name : 'N/A'}
                        </Typography>
                      </Box>
                      <Box mt={1} />
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid container spacing={2}>
                  <Grid item md={12} sm={12} xs={12}>
                    <Box display={'flex'} alignItems={'center'}>
                      {'No Amenities'}
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

RoomDetailsDialog.propTypes = {
  detailsOpen: propTypes.bool.isRequired,
  setDetailsOpen: propTypes.func.isRequired,
  each: propTypes.object.isRequired,
  setEach: propTypes.func,
};

export default RoomDetailsDialog;
