import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Chip, CircularProgress, Dialog, DialogContent, IconButton, TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '../../components/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { AmenityService, uploadFile } from '../../apis/rest.app';
import useHandleError from '../../hooks/useHandleError';
import CancelIcon from '@material-ui/icons/Cancel';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import CropperDialog from '../../components/cropper/CropperDialog';
import { useUser } from '../../store/UserContext';

const useStyle = makeStyles((theme) => ({
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  captionText: {
    // color: '#32',
    fontSize: 14,
    margin: theme.spacing(0.8, 0),
  },
  imageDiv: {
    height: '240px',
    width: 'auto',
    borderRadius: '50%',
    border: '1px dashed black',
  },
  input: {
    backgroundColor: '#F0F2F5',
    borderRadius: '10px',
  },
  button: {
    borderRadius: '10px',
  },
}));

const AddEditAmenityDialog = ({ open, setOpen, eachAmenity, allAmenities, setAllAmenities }) => {
  const classes = useStyle();
  const [user] = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useHandleError();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('NA');
  const [imageFile, setImageFile] = useState('');
  const [src, setSrc] = useState();
  const [show, setShow] = useState(false);

  const dataURLtoFile = (dataUrl, filename) => {
    let arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    if (eachAmenity) {
      setImage(eachAmenity?.icon ? eachAmenity?.icon : 'NA');
      setName(eachAmenity.name ? eachAmenity.name : '');
    } else {
      setImage('NA');
      setName('');
    }
  }, [eachAmenity]);

  const handleClose = () => {
    if (eachAmenity) {
      setName(eachAmenity.name);
      setImage(eachAmenity.icon);
    } else {
      setName('');
      setImage('NA');
    }
    setOpen(false);
  };

  const validate = (edit = false) => {
    if (image === 'NA') {
      enqueueSnackbar('Icon is required.', { variant: 'warning' });
      return false;
    }
    if (name.trim() === '') {
      enqueueSnackbar('Name is required.', { variant: 'warning' });
      return false;
    }
    return true;
  };

  const saveAmenity = async () => {
    if (eachAmenity) {
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
        await AmenityService.patch(eachAmenity?._id, {
          name: name,
          icon: _image,
        })
          .then((res) => {
            let _allAmenities = allAmenities;
            _allAmenities[_allAmenities.indexOf(eachAmenity)] = res;
            setAllAmenities([..._allAmenities]);
            setOpen(false);
          })
          .catch((error) => {
            handleError()(error);
          })
          .finally(() => setLoading(false));
      }
    } else {
      if (validate()) {
        setLoading(true);
        let _image = null;
        await uploadFile(imageFile)
          .then((response) => {
            _image = response.files[0];
          })
          .catch((err) => {
            enqueueSnackbar(err.message, {
              variant: 'error',
            });
          });
        await AmenityService.create({
          name: name,
          icon: _image,
        })
          .then((res) => {
            setAllAmenities([res, ...allAmenities]);
            enqueueSnackbar('Created successfully', {
              variant: 'success',
            });
            setOpen(false);
          })
          .catch((error) => {
            handleError()(error);
          })
          .finally(() => setLoading(false));
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        maxWidth={'xs'}
        fullWidth
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" onClose={handleClose}>
          {eachAmenity ? 'Edit amenity' : 'Add new amenity'}
        </DialogTitle>
        <DialogContent className={classes.mainContent}>
          {image !== 'NA' ? (
            <>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                <Box display={'flex'} onClick={() => setShow(true)} borderRadius={'50%'} border={'1px dashed black'}>
                  <img alt={'image'} className={classes.imageDiv} src={image} />
                  <Box ml={-5}>
                    <IconButton>
                      <CancelIcon
                        color={'secondary'}
                        onClick={() => {
                          setImage('NA');
                          setSrc('');
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
              <Box
                display={'flex'}
                onClick={() => setShow(true)}
                p={4}
                borderRadius={'50%'}
                border={'1px dashed black'}
                bgcolor={'#F5F5F5'}
              >
                <CropOriginalIcon style={{ height: 40, width: 40 }} />
              </Box>
              <Typography variant={'body2'} color={'primary'} component={Box} mt={1.5}>
                {'Click here to Upload'}
              </Typography>
            </Box>
          )}
          <Typography className={classes.captionText} variant={'h6'}>
            Amenity Name
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={'Enter amenity name'}
            // inputProps={{
            //   className: classes.input,
            // }}
          />
          <Box mt={2} />
          <Button
            onClick={saveAmenity}
            color="primary"
            variant={'contained'}
            size={'large'}
            disabled={loading}
            className={classes.button}
          >
            {loading ? <CircularProgress size={28} /> : eachAmenity ? 'Update' : 'Create'}
          </Button>
          <Box mt={2} />
        </DialogContent>
      </Dialog>
      <CropperDialog
        aspectRatio={9 / 9}
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
          setImageFile(dataURLtoFile(data, `${Date.now()}.png`));
        }}
        onSelected={(s) => {
          setSrc(s);
        }}
        show={show}
        src={src}
      />
    </>
  );
};

export default AddEditAmenityDialog;
