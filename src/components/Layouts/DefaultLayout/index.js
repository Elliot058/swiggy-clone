import React, { useEffect } from 'react';
import TopHeader from './TopHeader';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MenuList from './MenuList';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
import { useRouter } from 'next/router';
import DropDownMenuList from './DropDownMenuList';
import MenuIcon from '../../../assets/MenuIcon.svg';
import { useUser } from '../../../store/UserContext';
import TransactionSelected from '../../../assets/img/menu-icons/TransactionSelected.svg';
import TransactionUnselected from '../../../assets/img/menu-icons/TransactionUnselected.svg';

import DashboardIcon from '../../../../public/icons/dashboard_normal.svg';
import DashboardSelectedIcon from '../../../../public/icons/dashboard_filled.svg';
import UserIcon from '../../../../public/icons/users_normal.svg';
import UserSelectedIcon from '../../../../public/icons/users_filled.svg';
import BlockedUserIcon from '../../../../public/icons/blockedUsers_normal.svg';
import BlockedUserSelectedIcon from '../../../../public/icons/blockedUsers_filled.svg';
import PropertiesIcon from '../../../../public/icons/properties_normal.svg';
import PropertiesSelectedIcon from '../../../../public/icons/properties_filled.svg';
import BlockedPropertiesIcon from '../../../../public/icons/blockedProperties_normal.svg';
import BlockedPropertiesSelectedIcon from '../../../../public/icons/blockedProperties_filled.svg';
import ShortStayIcon from '../../../../public/icons/shortStay_normal.svg';
import ShortStaySelectedIcon from '../../../../public/icons/shortStay_filled.svg';
import StateIcon from '../../../../public/icons/state_normal.svg';
import StateSelectedIcon from '../../../../public/icons/state_filled.svg';
import AmenitiesIcon from '../../../../public/icons/amenities_normal.svg';
import AmenitiesSelectedIcon from '../../../../public/icons/amenities_filled.svg';
import CustomerIcon from '../../../../public/icons/customer_normal.svg';
import CustomerSelectedIcon from '../../../../public/icons/customer_filled.svg';
import PogIcon from '../../../../public/icons/pog_normal.svg';
import PogSelectedIcon from '../../../../public/icons/pog_filled.svg';
import BlogIcon from '../../../../public/icons/blog_normal.svg';
import BlogSelectedIcon from '../../../../public/icons/blog_filled.svg';
import MasterIcon from '../../../../public/icons/master_normal.svg';
import MasterTableSelectedIcon from '../../../../public/icons/master_filled.svg';

import JupionLogo from '../../../../public/Logo.svg';

const drawerWidth = 240;
const appbarHeight = 55;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: theme.palette.background.secondary,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxShadow: '3px 9px 20px 0px rgba(0, 0, 0, 0.1)',
    height: '100vh',
  },
  drawerOpen: {
    width: drawerWidth,
    paddingLeft: theme.spacing(1.2),
    paddingRight: theme.spacing(0.8),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    height: appbarHeight,
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listIconImage: {
    margin: theme.spacing(0.5),
  },
  listIconImage1: {
    margin: theme.spacing(0.5),
    height: 15,
    width: 15,
  },
  image: {
    height: 30,
    width: 'auto',
  },
  image2: {
    height: 30,
    width: 'auto',
  },
}));

const DefaultLayout = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [menuCat, setMenuCat] = React.useState([]);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const [mobOpen, setMobOpen] = React.useState(false);

  const handleMobDrawer = () => {
    setMobOpen(!mobOpen);
  };

  //change menuLocation to see change
  const menuLocation = 'appbar';

  useEffect(() => {
    setMenuCat(createMenu(user.clientPermissions));
    if (window.innerWidth <= 800) {
      setOpen(false);
    } else if (menuLocation !== 'appbar') {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  const Router = useRouter();

  const [user] = useUser();

  const categories = [
    {
      id: 'Dashboard',
      children: [
        {
          id: 'Dashboard',
          icon: <img alt={'dashboard'} className={classes.listIconImage} src={DashboardIcon} />,
          selectedIcon: <img alt={'dashboard'} className={classes.listIconImage} src={DashboardSelectedIcon} />,
          href: '/',
          hrefId: '/',
        },
      ],
    },
    {
      id: 'Users',
      children: [
        {
          id: 'All Users',
          icon: <img alt={'dashboard'} className={classes.listIconImage} src={UserIcon} />,
          selectedIcon: <img alt={'dashboard'} className={classes.listIconImage} src={UserSelectedIcon} />,
          href: '/users/all-users',
          hrefId: '/users/all-users/[id]',
        },
        {
          id: 'Blocked Users',
          icon: <img alt={'dashboard'} className={classes.listIconImage} src={BlockedUserIcon} />,
          selectedIcon: <img alt={'dashboard'} className={classes.listIconImage} src={BlockedUserSelectedIcon} />,
          href: '/users/blocked-users',
          hrefId: '/users/blocked-users/[id]',
        },
      ],
    },
    {
      id: 'Properties',
      children: [
        {
          id: 'All Properties',
          icon: <img alt={'dashboard'} className={classes.listIconImage} src={PropertiesIcon} />,
          selectedIcon: <img alt={'dashboard'} className={classes.listIconImage} src={PropertiesSelectedIcon} />,
          href: '/properties/all-properties',
          hrefId: '/properties/all-properties/[id]',
        },
        {
          id: 'Blocked Properties',
          icon: <img alt={'dashboard'} className={classes.listIconImage} src={BlockedPropertiesIcon} />,
          selectedIcon: <img alt={'dashboard'} className={classes.listIconImage} src={BlockedPropertiesSelectedIcon} />,
          href: '/properties/blocked-properties',
          hrefId: '/properties/blocked-properties/[id]',
        },
      ],
    },
    {
      id: 'Bookings',
      children: [
        {
          id: 'Short Stay',
          icon: <img alt={'dashboard'} className={classes.listIconImage} src={ShortStayIcon} />,
          selectedIcon: <img alt={'dashboard'} className={classes.listIconImage} src={ShortStaySelectedIcon} />,
          href: '/bookings/all-short-stay',
          hrefId: '/bookings/all-short-stay/[id]',
        },
        {
          id: 'ResFe',
          icon: <img alt={'dashboard'} className={classes.listIconImage} src={ShortStayIcon} />,
          selectedIcon: <img alt={'dashboard'} className={classes.listIconImage} src={ShortStaySelectedIcon} />,
          href: '/bookings/all-resfe',
          hrefId: '/bookings/all-resfe/[id]',
        },
      ],
    },
    {
      id: 'Reports',
      children: [
        {
          id: 'Reports',
          icon: <img alt={'dashboard'} className={classes.listIconImage} src={ShortStayIcon} />,
          selectedIcon: <img alt={'dashboard'} className={classes.listIconImage} src={ShortStaySelectedIcon} />,
          href: '/reports',
        },
      ],
    },
    // {
    //   id: 'Transactions',
    //   children: [
    //     {
    //       id: 'Transactions',
    //       icon: <img alt={'transactions'} className={classes.listIconImage} src={TransactionUnselected} />,
    //       selectedIcon: <img alt={'transactions'} className={classes.listIconImage} src={TransactionSelected} />,
    //       href: '/transaction',
    //       hrefId: '/transaction',
    //     },
    //   ],
    // },
    {
      id: 'Master Data',
      children: [
        {
          id: 'States',
          icon: <img alt={'states'} className={classes.listIconImage} src={StateIcon} />,
          selectedIcon: <img alt={'states'} className={classes.listIconImage} src={StateSelectedIcon} />,
          href: '/states',
          hrefId: '/states/[id]',
        },
        {
          id: 'Amenities',
          icon: <img alt={'amenities'} className={classes.listIconImage} src={AmenitiesIcon} />,
          selectedIcon: <img alt={'amenities'} className={classes.listIconImage} src={AmenitiesSelectedIcon} />,
          href: '/amenities',
          hrefId: '/amenities',
        },
        {
          id: 'Blogs',
          icon: <img alt={'blogs'} className={classes.listIconImage} src={BlogIcon} />,
          selectedIcon: <img alt={'blogs'} className={classes.listIconImage} src={BlogSelectedIcon} />,
          href: '/blogs',
        },
        {
          id: 'Banners',
          icon: <img alt={'blogs'} className={classes.listIconImage} src={BlogIcon} />,
          selectedIcon: <img alt={'blogs'} className={classes.listIconImage} src={BlogSelectedIcon} />,
          href: '/banners',
        },
        // {
        //   id: 'Master Table',
        //   icon: <img alt={'transactions'} className={classes.listIconImage} src={MasterIcon} />,
        //   selectedIcon: <img alt={'transactions'} className={classes.listIconImage} src={MasterTableSelectedIcon} />,
        //   href: '/master-table',
        //   hrefId: '/master-table',
        // },
      ],
    },
    {
      id: 'Contact Us',
      children: [
        {
          id: 'Customer Report',
          icon: <img alt={'reports'} className={classes.listIconImage} src={CustomerIcon} />,
          selectedIcon: <img alt={'reports'} className={classes.listIconImage} src={CustomerSelectedIcon} />,
          href: '/contact-us/customers',
        },
        {
          id: 'POG Report',
          icon: <img alt={'reports'} className={classes.listIconImage} src={PogIcon} />,
          selectedIcon: <img alt={'reports'} className={classes.listIconImage} src={PogSelectedIcon} />,
          href: '/contact-us/properties',
        },
        // {
        //   id: 'Master Table',
        //   icon: <img alt={'transactions'} className={classes.listIconImage} src={MasterIcon} />,
        //   selectedIcon: <img alt={'transactions'} className={classes.listIconImage} src={MasterTableSelectedIcon} />,
        //   href: '/master-table',
        //   hrefId: '/master-table',
        // },
      ],
    },
  ];

  const createMenu = (permission) => {
    let _permission = permission;
    // let _permission = permission.filter(e=>e.drawer === 1).sort(function(a,b){return a.drawerOrder - b.drawerOrder});
    return categories
      .map((each) => {
        return each;
      })
      .filter((e) => e);
    // return  _permission.map(e => {
    //     let _menu = categories.filter(each => each.permission === e.metaName);
    //     if(_menu.length > 0){
    //         return _menu[0];
    //     }else
    //         return null;
    // }).filter(e=>e);
  };

  const Menu = () => (
    <svg fill="none" height="17" viewBox="0 0 14 17" width="14" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.96606H13" stroke="#003760" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M1 6.46606H6.81818" stroke="#EA4335" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M1 10.9661H13" stroke="#003760" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M1 15.4661H6.81818" stroke="#EA4335" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );

  const toDashBoard = () => {
    Router.push('/');
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar
          className={clsx(classes.appBar, {
            // [classes.appBarShift]: open,
          })}
          position="fixed"
        >
          <Toolbar>
            <Hidden xsDown>
              <IconButton className={clsx(classes.menuButton)} edge="start" onClick={handleDrawer}>
                <img alt={'Menu Icon'} src={MenuIcon} />
              </IconButton>
              <img
                alt={'Pie'}
                className={classes.image}
                onClick={toDashBoard}
                src={JupionLogo}
                style={{ cursor: 'pointer' }}
              />
            </Hidden>
            <Hidden smUp>
              <IconButton
                className={clsx(classes.menuButton, {
                  [classes.hide]: menuLocation !== 'appbar',
                })}
                edge="start"
                onClick={handleMobDrawer}
              >
                <img alt={'Menu Icon'} src={MenuIcon} />
              </IconButton>
              <img
                alt={'Athr'}
                className={classes.image2}
                onClick={toDashBoard}
                src={JupionLogo}
                style={{ cursor: 'pointer' }}
              />
            </Hidden>
            {menuLocation !== 'appbar' ? <DropDownMenuList categories={menuCat} /> : ''}
            <TopHeader />
          </Toolbar>
        </AppBar>
        <Hidden xsDown>
          <Drawer
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
              [classes.hide]: menuLocation !== 'appbar',
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                [classes.hide]: menuLocation !== 'appbar',
              }),
            }}
            variant="permanent"
          >
            <div className={classes.toolbar}>
              <IconButton className={classes.menuButton} onClick={handleDrawer}>
                <Menu />
              </IconButton>
            </div>
            <Box mt={2} />
            <MenuList categories={menuCat} open={open} />
          </Drawer>
        </Hidden>
        <Hidden smUp>
          <Drawer onClose={handleMobDrawer} open={mobOpen}>
            <Box display={'flex'} justifyContent={'space-around'}>
              <Box alignSelf={'center'} dispaly={'flex'}>
                <Typography>{'Logo'}</Typography>
              </Box>
              <IconButton onClick={handleMobDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box p={1.5}>
              <MenuList categories={menuCat} open={true} />
            </Box>
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </React.Fragment>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
