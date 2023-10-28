import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import ProfileBg from '../../../../public/profile_bg.png';
import ProfileIcon from '../../../../public/profile_default.png';
import RightArrow from '../../../../public/Arrow.svg';
import LogoutIcon from '../../../../public/logout.svg';
import PasswordIcon from '../../../../public/change_password.svg';
import { Avatar, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { useUser } from '../../../store/UserContext';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { DoneOutlined, EditOutlined, Visibility } from '@material-ui/icons';
import { authCookieName, UsersService } from '../../../apis/rest.app';
import { useConfirm } from '../../Confirm';
import { useRouter } from 'next/router';
import InputAdornment from '@material-ui/core/InputAdornment';
import useHandleError from '../../../hooks/useHandleError';
import DialogTitle from '../../DialogTitle';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import EditProfileImageDialog from '../../../page-components/EditProfileImageDialog';

const useStyles = makeStyles((theme) => ({
  alignPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    width: 300,
    padding: theme.spacing(0, 0, 1, 0),
    borderRadius: 1,
    boxShadow: '0px 8px 71px -14px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileBg: {
    width: '100%',
    height: 'auto',
  },
  editProfileImageIcon: {
    width: 15,
    height: 15,
  },
  profileIcon: {
    width: 90,
    height: 90,
    marginTop: '-45px',
    border: '1px solid white',
  },
  divider: {
    width: '100%',
    border: '1px solid #E5E5E5',
  },
  editButton: {
    width: 25,
    height: 25,
  },
  buttonIcons: {
    height: 18,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  clientName: {
    fontSize: 15,
    fontWeight: 400,
    margin: theme.spacing(1, 0),
  },
  profileText: {
    fontSize: 15,
    fontWeight: 400,
    marginBottom: theme.spacing(1.4),
  },
  nameText: {
    fontSize: 15,
    fontWeight: 400,
  },

  buttonText: {
    fontWeight: 400,
    marginLeft: theme.spacing(1.2),
    marginTop: 1,
  },
  buttonBody: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));

export default function MegaMenu({ handleCloseMenu }) {
  const [user, setUser] = useUser();
  const [client, setClient] = useState(user);
  const classes = useStyles();
  const handleError = useHandleError();
  const { enqueueSnackbar } = useSnackbar();
  const Confirm = useConfirm();
  const Router = useRouter();
  const [name, setName] = useState(user.name);
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openProfileImageDialog, setOpenProfileImageDialog] = React.useState(false);

  const validate = () => {
    if (name.trim() === '') {
      setNameError('Name must not be empty');
      return false;
    } else {
      setNameError('');
    }
    return true;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    Confirm('Are you sure?', 'Do you really want to log out ?', 'Yes, Sure')
      .then(() => {
        localStorage.removeItem(authCookieName);
        Router.reload();
        handleCloseMenu();
      })
      .catch(() => {});
  };

  const handleSave = () => {
    if (validate())
      UsersService.patch(user._id, {
        name,
      })
        .then((res) => {
          setUser(res);
          enqueueSnackbar('Name changed successfully.', {
            variant: 'success',
          });
          setEdit(false);
        })
        .catch((error) => {
          handleError()(error);
        });
  };

  const handleChangePassword = () => {
    if (password === confirmPassword) {
      setLoading(true);
      UsersService.patch(user._id, {
        password,
      })
        .then(() => {
          enqueueSnackbar('Password changed successfully.', {
            variant: 'success',
          });
          setOpen(false);
        })
        .catch((error) => {
          handleError()(error);
        })
        .finally(() => {
          setPassword('');
          setConfirmPassword('');
          setLoading(false);
        });
    } else {
      enqueueSnackbar('Both passwords must match.', {
        variant: 'error',
      });
    }
  };

  return (
    <div className={classes.alignPaper}>
      <Paper>
        <div className={classes.root}>
          <img src={ProfileBg} className={classes.profileBg} />
          <Box display={'flex'} alignItems={'center'}>
            <Avatar src={client.avatar} className={classes.profileIcon} />
            <Box
              width={25}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              height={25}
              bgcolor={'#fff'}
              borderRadius={'50%'}
              zIndex={1}
              mt={-12}
              ml={-3}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpenProfileImageDialog(true)}
            >
              <EditIcon className={classes.editProfileImageIcon} />
            </Box>
          </Box>

          <Typography className={classes.clientName}>{user.name}</Typography>
          <Box display={'flex'} flexDirection={'column'} alignItems={'start'} width={'100%'} p={2}>
            <Typography color={'primary'} className={classes.profileText}>
              Profile
            </Typography>
            {edit ? (
              <>
                <Box mt={1} />
                <TextField
                  id="name-edit-megamenu"
                  value={name}
                  error={!!nameError}
                  helperText={nameError}
                  fullWidth
                  label={'Name'}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError('');
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="done-button" onClick={handleSave} edge="end">
                          <DoneOutlined />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            ) : (
              <>
                <Box display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'flex-end'}>
                  <Box display={'flex'} flexDirection={'column'}>
                    <Typography variant={'caption'} color={'textSecondary'}>
                      Name
                    </Typography>
                    <Typography className={classes.nameText}>{user.name}</Typography>
                  </Box>
                  <IconButton size={'small'} className={classes.editButton} onClick={() => setEdit(true)}>
                    <EditOutlined className={classes.editIcon} />
                  </IconButton>
                </Box>
                <div className={classes.divider} />
              </>
            )}
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'flex-end'} mt={1}>
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant={'caption'} color={'textSecondary'}>
                  Email
                </Typography>
                <Typography className={classes.nameText}>{user.email}</Typography>
              </Box>
              {/*<IconButton size={'small'} className={classes.editButton}>*/}
              {/*    <EditOutlined className={classes.editIcon}/>*/}
              {/*</IconButton>*/}
            </Box>
            <div className={classes.divider} />
            <Box className={classes.buttonBody} mt={2} mb={1} onClick={handleClickOpen}>
              <img src={PasswordIcon} className={classes.buttonIcons} />
              <Typography className={classes.buttonText}>Change Password</Typography>
              <Box flexGrow={1} />
              <img src={RightArrow} className={classes.buttonIcons} />
            </Box>
            <Box className={classes.buttonBody} mt={1} onClick={handleLogout}>
              <img src={LogoutIcon} className={classes.buttonIcons} />
              <Typography className={classes.buttonText}>Logout</Typography>
              <Box flexGrow={1} />
              <img src={RightArrow} className={classes.buttonIcons} />
            </Box>
          </Box>
        </div>
      </Paper>
      <EditProfileImageDialog
        openProfileImageDialog={openProfileImageDialog}
        setOpenProfileImageDialog={setOpenProfileImageDialog}
        client={client}
        setClient={setClient}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant={'outlined'}
            margin="dense"
            id="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="New Password"
            type="password"
            fullWidth
          />
          <TextField
            variant={'outlined'}
            margin="dense"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirm-password"
            label="Confirm Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="primary" disabled={loading} variant={'contained'}>
            {loading ? <CircularProgress color="inherit" size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
