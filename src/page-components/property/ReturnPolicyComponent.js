import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import propTypes from 'prop-types';

const useStyle = makeStyles((theme) => ({
  button: {
    height: 40,
  },
  link: {
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
}));

const ReturnPolicyComponent = ({ propertyData }) => {
  const classes = useStyle();

  return (
    <Box p={2} display={'flex'} flexDirection={'column'} width={'100%'}>
      <Box>
        <Typography variant={'h5'}>The rules and instructions applied by Property Owner.</Typography>
        {propertyData?.policy ? (
          propertyData?.policy?.map((each) => (
            <Box key={each} mt={1} p={2} bgcolor={'#F6F6F6'} borderRadius={15}>
              {each}
            </Box>
          ))
        ) : (
          <Box mt={1} p={2} bgcolor={'#F6F6F6'} borderRadius={15} />
        )}
      </Box>
    </Box>
  );
};

ReturnPolicyComponent.propTypes = {
  propertyData: propTypes.object.isRequired,
};

export default ReturnPolicyComponent;
