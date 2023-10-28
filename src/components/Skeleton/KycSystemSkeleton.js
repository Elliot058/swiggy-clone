/**
 *
 * @createdBy Akash Mohapatra
 * @email mohapatra.akash99@gmail.com
 * @description Institute Skeleton Component
 * @createdOn 23/03/21 4:24 PM
 */

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyle = makeStyles(() => ({
  // main: {
  //   margin: '0px 0px',
  // },
  root: {
    borderRadius: '2px',
  },
}));

const KycSystemSkeleton = () => {
  const classes = useStyle();

  return (
    <>
      <Box mb={3}>
        <Skeleton animation={'wave'} className={classes.root} height={80} variant="rect" width={'98%'} />
      </Box>
      <Container maxWidth={'lg'}>
        <Grid container spacing={2}>
          <Grid item md={8} sm={6} xs={6}>
            <Skeleton animation={'wave'} className={classes.root} height={500} variant="rect" width={'96%'} />
          </Grid>
          <Grid item md={4} sm={6} xs={6}>
            <Skeleton animation={'wave'} className={classes.root} height={500} variant="rect" width={'96%'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default KycSystemSkeleton;
