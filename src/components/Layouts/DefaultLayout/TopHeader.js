import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import ProfileLogo from '../../../assets/Ellipse.svg';
import { useUser } from '../../../store/UserContext';
import { authCookieName } from '../../../apis/rest.app';
import { useConfirm } from '../../Confirm';
import { useRouter } from 'next/router';
import MegaMenu from './MegaMenu';
import SearchIcon from '../../../../public/Search icon.svg';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { Avatar, InputBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '55px',
    padding: '5px',
    alignItems: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  searchIcon: {
    marginTop: 5,
  },
  inputInput: {
    fontSize: '12px',
    padding: theme.spacing(1.3, 0, 1.4, 0),
    backgroundColor: theme.palette.background.other,
    paddingLeft: `calc(1em + ${theme.spacing(0.1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '350px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '230px',
    },
  },
  color: {
    backgroundColor: theme.palette.background.other,
  },
  menuList: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  dropDown: {
    fontSize: '15px',
    paddingLeft: '15px',
    backgroundColor: theme.palette.background.other,
    '&:hover': {
      boxShadow: 'none',
    },
  },
  profile: {
    background: theme.palette.background.other,
    borderRadius: '6px',
    height: '33px',
    paddingRight: '40px',
    paddingLeft: '15px',
    marginRight: '-25px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '13px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logo: {
    width: 45,
    height: 45,
  },
  profileButton: {
    '&:hover': {
      background: theme.palette.common.white,
    },
  },
  buttonGroup: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

export default function TopHeader() {
  const classes = useStyles();
  const [user] = useUser();
  const Confirm = useConfirm();
  const Router = useRouter();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCloseMenu = (event) => {
    // if (user.role === 1) setAnchorEl(null);
    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleLogout = () => {
    Confirm('Are you sure?', 'Do you really want to log out ?', 'Yes, Sure')
      .then(() => {
        localStorage.removeItem(authCookieName);
        Router.reload();
        handleCloseMenu();
      })
      .catch(() => {});
  };

  return (
    <div className={classes.root}>
      <div className={classes.grow} />
      <Button
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        className={classes.profileButton}
        onClick={handleToggle}
        ref={anchorRef}
      >
        <div className={classes.profile}>{user.name}</div>
        <Avatar alt="Profile Logo" className={classes.logo} src={user?.avatar} />
      </Button>
      <Popper anchorEl={anchorRef.current} disablePortal open={open} role={undefined} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                <MegaMenu handleCloseMenu={handleCloseMenu} />
              </MenuList>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
