/**
 *
 * @createdBy Akash Mohapatra
 * @email mohapatra.akash99@gmail.com
 * @description Common Frame for all without login pages
 * @createdOn 27/01/21 3:41 PM
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CoverImage from '../../assets/Login/Login_page_logo.svg';
import LeftCircle from '../../assets/Login/LeftCircle.svg';
import TopCircle from '../../assets/Login/TopCircle.svg';
import TriangleSmall from '../../assets/Login/Trianglesmall.svg';
import TriangleSmallButton from '../../assets/Login/TriangleSmallButton.svg';
import HalfSphereSmall from '../../assets/Login/HalfSphereSmall.svg';
import PropTypes from 'prop-types';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: typeof window !== 'undefined' ? window.innerHeight : '-webkit-fill-available',
    minHeight: '710px',
    display: 'flex',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '101',
  },
  leftCircle: {
    position: 'fixed',
    top: 206,
    left: 72,
  },
  topCircle: {
    position: 'fixed',
    top: 98,
    left: 673,
  },
  triangleSmall: {
    position: 'fixed',
    top: 509.89,
    left: 653,
  },
  triangleSmallButton: {
    position: 'fixed',
    top: 665,
    left: 715,
  },
  halfSphereSmall: {
    position: 'fixed',
    top: '30vh',
    right: 0,
  },
  coverImage: {
    width: '65%',
    height: 'auto',
  },
  bgImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(252,229,195,0.1)',
    backgroundSize: 'cover',
    flex: '116',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  subTitle: {
    fontSize: '19px',
  },
}));

const ImageFrame = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.bgImage}>
        <img alt={'CoverImage'} className={classes.coverImage} src={CoverImage} />
      </div>
      <div className={classes.paper}>{children}</div>
      <img className={classes.leftCircle} src={LeftCircle} />
      <img className={classes.topCircle} src={TopCircle} />
      <img className={classes.triangleSmall} src={TriangleSmall} />
      <img className={classes.triangleSmallButton} src={TriangleSmallButton} />
      <img className={classes.halfSphereSmall} src={HalfSphereSmall} />
    </div>
  );
};

ImageFrame.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ImageFrame;
