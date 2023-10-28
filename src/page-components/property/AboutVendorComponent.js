import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
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
  tellUsInBrief: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '30px',
  },
  minWordsMaxWord: {
    fontStyle: 'italic',
    fontWeight: 400,
    marginTop: 10,
  },
  typeHere: {
    background: theme.palette.background.field,
    padding: 20,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    '&::placeholder': {
      marginLeft: 20,
    },
  },
  input: {
    fontWeight: 500,
    '&::placeholder': {
      marginLeft: 10,
      fontWeight: 400,
    },
  },
}));

const AboutVendorComponent = ({ propertyData }) => {
  const classes = useStyle();

  return (
    <Box p={2} display={'flex'} flexDirection={'column'} width={'100%'}>
      <Box mt={1} p={2} bgcolor={'#F6F6F6'} borderRadius={20}>
        {propertyData?.description}
      </Box>
    </Box>
  );
};

AboutVendorComponent.propTypes = {
  propertyData: propTypes.object.isRequired,
};

export default AboutVendorComponent;
