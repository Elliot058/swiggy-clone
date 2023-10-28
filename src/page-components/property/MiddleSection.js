import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import propTypes from 'prop-types';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
  paper: {
    width: '100%',
    padding: '10px',
  },
  card: {
    padding: '10px',
  },
  address: {
    maxWidth: '70%',
    wordBreak: 'keep-all',
  },
  button: {
    height: 40,
  },
  viewButton: {
    color: 'blue',
  },
  chip: {
    marginRight: 5,
  },
});

const MiddleSection = ({ propertyData }) => {
  // console.log('businessData....2', businessData);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Grid container spacing={2}>
      {propertyData && (
        <Grid item lg={5} md={6} sm={12} xs={12}>
          {/*<Paper className={classes.paper}>*/}
          <Box display="flex" flexDirection="column" className={classes.card}>
            <Box mt={1} />
            <Box display={'flex'}>
              <Box mr={30}>
                <Typography variant="caption">Property Name</Typography>
                <Typography variant="body1">{propertyData?.name || 'N/A'}</Typography>
              </Box>
              {/*<Box color={'blue'}>*/}
              {/*    <Typography variant="caption">Transaction</Typography>*/}
              {/*    <Button className={classes.viewButton} onClick={handleClickOpen}>*/}
              {/*        View*/}
              {/*    </Button>*/}
              {/*</Box>*/}
            </Box>

            <Box mt={1} />
            <Typography variant="caption">Email</Typography>
            <Typography variant="body1">{propertyData?.contactEmail || 'N/A'}</Typography>
            <Box mt={1} />
            <Typography variant="caption">Phone</Typography>
            <Typography variant="body1">{propertyData?.contactPhone || 'N/A'}</Typography>
            <Box mt={1} />
            <Typography variant="caption">Address</Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" className={classes.address}>
                {`${propertyData?.address?.addressLine1}, ${propertyData?.address?.city?.name}, ${propertyData?.address?.state?.name}, ${propertyData?.address?.pinCode}`}
              </Typography>
              {propertyData.mapLink && (
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  size="small"
                  target="_blank"
                  component={Link}
                  href={propertyData?.mapLink}
                >
                  View Location
                </Button>
              )}
            </Box>
            <Box mt={1} />
            <Typography variant="caption">Owner</Typography>
            <Box display="flex" justifyContent="space-between">
              {propertyData?.owner?.name ? propertyData.owner.name : 'N/A'}
            </Box>
            <Box mt={1} />
            <Typography variant="caption">Owner email</Typography>
            <Box display="flex" justifyContent="space-between" alignItems={'center'}>
              <Typography>{propertyData ? propertyData?.owner?.email : 'N/A'}</Typography>
            </Box>
          </Box>
          {/*</Paper>*/}
        </Grid>
      )}
      {/*{businessData && (*/}
      {/*    <Grid item lg={7} md={6} sm={12} xs={12}>*/}
      {/*        <Paper className={classes.paper}>*/}
      {/*            <Box display="flex" flexDirection="column" className={classes.card}>*/}
      {/*                {businessData.owner && (*/}
      {/*                    <>*/}
      {/*                        <Typography variant="button">Opening Hours</Typography>*/}
      {/*                        <Box mt={1}>*/}
      {/*                            {days.map((each, index) => {*/}
      {/*                                let _open = businessData.openingHours ? businessData.openingHours : [];*/}
      {/*                                let current = _open.filter((e) => e.day === index + 1)[0];*/}
      {/*                                return (*/}
      {/*                                    <Box mb={0.5} display="flex" alignItems="center" key={each?._id}>*/}
      {/*                                        <Box pr={6} flex={1}>*/}
      {/*                                            {each}*/}
      {/*                                        </Box>*/}
      {/*                                        {current ? (*/}
      {/*                                            <Box flex={2}>*/}
      {/*                                                {moment(current.startsAt).format('hh:mm A') +*/}
      {/*                                                    ' - ' +*/}
      {/*                                                    moment(current.endsAt).format('hh:mm A')}*/}
      {/*                                            </Box>*/}
      {/*                                        ) : (*/}
      {/*                                            <Box flex={2}>Closed</Box>*/}
      {/*                                        )}*/}
      {/*                                    </Box>*/}
      {/*                                );*/}
      {/*                            })}*/}
      {/*                        </Box>*/}
      {/*                        /!*<Box mt={1} />*!/*/}
      {/*                        /!*<Box display={'flex'}>*!/*/}
      {/*                        /!*    <Box pr={22}>*!/*/}
      {/*                        /!*        <Typography variant="caption">Pincode :</Typography>*!/*/}
      {/*                        /!*        <Box ml={0.5} />*!/*/}
      {/*                        /!*        {businessData && businessData.pinCodes*!/*/}
      {/*                        /!*            ? businessData.pinCodes.map((each) => (*!/*/}
      {/*                        /!*                  <>*!/*/}
      {/*                        /!*                      <Chip size="small" label={each} className={classes.chip} />*!/*/}
      {/*                        /!*                  </>*!/*/}
      {/*                        /!*              ))*!/*/}
      {/*                        /!*            : 'N/A'}*!/*/}
      {/*                        /!*        <Box mt={1} />*!/*/}
      {/*                        /!*    </Box>*!/*/}
      {/*                        /!*</Box>*!/*/}
      {/*                    </>*/}
      {/*                )}*/}
      {/*            </Box>*/}
      {/*        </Paper>*/}
      {/*    </Grid>*/}
      {/*)}*/}
    </Grid>
  );
};
MiddleSection.propTypes = {
  propertyData: propTypes.object.isRequired,
};
export default MiddleSection;
