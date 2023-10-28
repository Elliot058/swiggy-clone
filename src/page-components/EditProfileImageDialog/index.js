import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import DialogTitle from '../../components/DialogTitle';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CropperDialog from '../../components/cropper/CropperDialog';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { uploadFile, UsersService } from '../../apis/rest.app';
import { useSnackbar } from 'notistack';
import { useUser } from '../../store/UserContext';
import useHandleError from '../../hooks/useHandleError';

const useStyle = makeStyles(() => ({
  imageDiv: {
    height: '240px',
    width: 'auto',
    borderRadius: '50%',
    border: '1px dashed black',
  },
}));

const EditProfileImageDialog = ({ openProfileImageDialog, setOpenProfileImageDialog, setClient, client }) => {
  const classes = useStyle();
  const [user, setUser] = useUser();
  const handleError = useHandleError();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState(client?.avatar ? client?.avatar : 'NA');
  const [imageFile, setImageFile] = useState('');
  const [src, setSrc] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const validate = () => {
    if (image === 'NA') {
      enqueueSnackbar('Image is required.', { variant: 'warning' });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (validate()) {
      setLoading(true);
      let _image = image;
      if (imageFile) {
        await uploadFile(imageFile)
          .then((response) => {
            _image = response.files[0];
          })
          .catch((err) => {
            enqueueSnackbar(err.message, {
              variant: 'error',
            });
          });
      }
      if (client) {
        await UsersService.patch(client._id, {
          avatar: _image,
        })
          .then((res) => {
            let _user = {
              ...user,
            };
            setUser(_user);
            setClient(res);
            setOpenProfileImageDialog(false);
          })
          .catch((error) => {
            handleError()(error);
          })
          .finally(() => setLoading(false));
      }
    }
  };

  return (
    <Dialog
      open={openProfileImageDialog}
      onClose={() => {
        setOpenProfileImageDialog(false);
        setImage(client?.avatar ? client?.avatar : 'NA');
      }}
      maxWidth={'xs'}
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Change Avatar</DialogTitle>
      <DialogContent>
        {image !== 'NA' ? (
          <>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
              <Box display={'flex'} borderRadius={'50%'} border={'1px dashed black'}>
                <img alt={'image'} className={classes.imageDiv} src={image} />
                <Box ml={-5}>
                  <IconButton>
                    <CancelIcon
                      color={'secondary'}
                      onClick={() => {
                        setImage('NA');
                        setImageFile('');
                        setSrc('');
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
            onClick={() => setShow(true)}
            style={{ cursor: 'pointer' }}
          >
            <Box display={'flex'} p={4} borderRadius={'50%'} border={'1px dashed black'} bgcolor={'#E5E9FF'}>
              <CropOriginalIcon color={'primary'} style={{ height: 40, width: 40 }} />
            </Box>
            <Typography variant={'body2'} color={'primary'} component={Box} mt={1.5}>
              {'Click here to Upload'}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpenProfileImageDialog(false);
            setImage(client?.avatar ? client?.avatar : 'NA');
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={() => handleSave()} color="primary" disabled={loading} variant={'contained'}>
          {loading ? <CircularProgress color="inherit" size={20} /> : 'Save'}
        </Button>
        <CropperDialog
          aspectRatio={1}
          cancel={() => {
            setShow(false);
            setSrc(null);
          }}
          cancelLabel={'Cancel'}
          dismiss={() => {
            setShow(false);
          }}
          okLabel={'Save'}
          onCropped={(data) => {
            setShow(false);
            setImage(data);
            setImageFile(dataURLtoFile(data, 'imageToUpload.png'));
          }}
          onSelected={(s) => {
            setSrc(s);
          }}
          show={show}
          src={src}
        />
      </DialogActions>
    </Dialog>
  );
};

EditProfileImageDialog.propTypes = {
  openProfileImageDialog: PropTypes.bool,
  setOpenProfileImageDialog: PropTypes.func,
  setClient: PropTypes.func,
  client: PropTypes.object,
};

export default EditProfileImageDialog;
