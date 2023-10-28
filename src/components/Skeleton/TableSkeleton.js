import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: '2',
    marginTop: theme.spacing(2),
  },
}));

const TableSkeleton = () => {
  const classes = useStyle();

  const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }];

  return (
    <Grid container>
      {data.map((each) => (
        <Grid item key={each.id} md={12} sm={12} xs={12}>
          <Skeleton animation={'wave'} className={classes.root} height={50} variant="rect" width={'100%'} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TableSkeleton;
