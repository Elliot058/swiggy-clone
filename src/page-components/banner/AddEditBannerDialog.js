import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, CircularProgress, Dialog, DialogContent, IconButton, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '../../components/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { BannerService, uploadFile } from '../../apis/rest.app';
import useHandleError from '../../hooks/useHandleError';
import CancelIcon from '@material-ui/icons/Cancel';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import CropperDialog from '../../components/cropper/CropperDialog';
import { useUser } from '../../store/UserContext';
import PropTypes from 'prop-types';

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
  uploadPhoto: {
    // maxWidth: 388,
    maxHeight: 242,
    cursor: 'pointer',
  },
}));

const AddEditBannerDialog = ({ open, setOpen, eachBanner, allBanners, setAllBanners }) => {
  const classes = useStyle();
  const [user] = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useHandleError();
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [attachment, setAttachment] = useState('NA');
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
    if (eachBanner) {
      setAttachment(eachBanner?.attachment ? eachBanner?.attachment : 'NA');
      setLink(eachBanner?.link ? eachBanner?.link : '');
    } else {
      setAttachment('NA');
      setLink('');
    }
  }, [eachBanner]);

  const handleClose = () => {
    if (eachBanner) {
      setLink(eachBanner?.link);
      setAttachment(eachBanner?.attachment);
    } else {
      setLink('');
      setAttachment('NA');
    }
    setOpen(false);
  };

  const validate = (edit = false) => {
    if (attachment === 'NA') {
      enqueueSnackbar('Attachment is required.', { variant: 'warning' });
      return false;
    }
    // if (link.trim() === '') {
    //   enqueueSnackbar('Name is required.', { variant: 'warning' });
    //   return false;
    // }
    return true;
  };

  const saveBanner = async () => {
    if (eachBanner) {
      if (validate()) {
        setLoading(true);
        let _image = attachment;
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
        await BannerService.patch(eachBanner?._id, {
          // name: link,
          attachment: _image,
        })
          .then((res) => {
            let _allBanners = allBanners;
            _allBanners[_allBanners.indexOf(eachBanner)] = res;
            setAllBanners([..._allBanners]);
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
        await BannerService.create({
          // name: link,
          attachment: _image,
        })
          .then((res) => {
            setAllBanners([res, ...allBanners]);
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
          {eachBanner ? 'Edit Banner' : 'Add new banner'}
        </DialogTitle>
        <DialogContent className={classes.mainContent}>
          {attachment !== 'NA' ? (
            <>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                onClick={() => {
                  setImageFile('');
                  setAttachment('');
                  setSrc('');
                }}
              >
                <Chip
                  size="small"
                  label="Clear"
                  clickable
                  onDelete={() => {
                    setImageFile('');
                    setAttachment('NA');
                    setSrc('');
                  }}
                  color="primary"
                />
              </Box>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <img src={attachment} width={'250px'} height={150} alt={'Attachment Image'} />
              </Box>
            </>
          ) : (
            <>
              <Box
                className={classes.uploadPhoto}
                display={'flex'}
                fullWidth
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                border={`2px dashed #EE1B34`}
                borderRadius={10}
                mb={1}
                p={8}
                onClick={() => setShow(true)}
              >
                <Box width={180} textAlign={'center'} mt={2}>
                  Click here to Upload
                </Box>
              </Box>
            </>
          )}
          {/*<Typography className={classes.captionText} variant={'h6'}>*/}
          {/*  Amenity Name*/}
          {/*</Typography>*/}
          {/*<TextField*/}
          {/*  id="admin-add-name"*/}
          {/*  variant="outlined"*/}
          {/*  size={'small'}*/}
          {/*  type={'text'}*/}
          {/*  value={link}*/}
          {/*  onChange={(e) => setLink(e.target.value)}*/}
          {/*  placeholder={'Enter amenity link'}*/}
          {/*  // inputProps={{*/}
          {/*  //   className: classes.input,*/}
          {/*  // }}*/}
          {/*/>*/}
          <Box mt={2} />
          <Button
            onClick={saveBanner}
            color="primary"
            variant={'contained'}
            size={'large'}
            disabled={loading}
            className={classes.button}
          >
            {loading ? <CircularProgress size={28} /> : eachBanner ? 'Update' : 'Create'}
          </Button>
          <Box mt={2} />
        </DialogContent>
      </Dialog>
      <CropperDialog
        aspectRatio={18 / 9}
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
          setAttachment(data);
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

AddEditBannerDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  eachBanner: PropTypes.object,
  allBanners: PropTypes.array,
  setAllBanners: PropTypes.func,
};

export default AddEditBannerDialog;
