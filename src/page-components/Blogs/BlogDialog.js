import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import {Chip, CircularProgress, DialogActions, DialogTitle, Grid, TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { BlogService } from '../../apis/rest.app';
import Box from '@material-ui/core/Box';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CropperDialog from '../../components/cropper/CropperDialog';
import theme from '../../theme';
import QuillEditor from '../../components/QuillComponents/QuillEditor';
import { uploadFile } from '../../apis/rest.app';

const useStyles = makeStyles({
  division: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  User: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px',
    hover: { color: 'blue' },
  },
  Details: {
    display: 'flex',
    marginRight: '5px',
    marginTop: '5px',
  },
  dropImage: {
    height: 200,
    width: 220,
  },
});

const descriptionDialog = ({ open, setOpen, data, blogList, setBlogList }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [title, setTitle] = useState(data ? data.title : '');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState(data ? data.description : '');
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState(['yes', 'no']);
  const [image, setImage] = useState(data ? data.attachments[0] : null);
  const [imageFile, setImageFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [show, setShow] = useState(false);
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(data ? data.title : '');
    setImage(data ? data.attachments[0] : null);
    setDescription(data ? data.description : '');
    // setTagList(data && data.tags ? data.tags.map((each) => each) : []);
  }, [data]);

  const dataURLtoFile = (dataurl, filetitle) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr?.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filetitle, { type: mime });
  };

  function checkTags(str, message = 'Field should not be empty', errorMessage = 'Field should not be empty') {
    if (str === null || str === '') {
      enqueueSnackbar(`${message}`, { variant: 'error' });
      return true;
    } else {
      str = str.toString();
      let data = str.replace(/(<([^>]+)>)/gi, '');
      if (data.trim() === '') {
        enqueueSnackbar(`${errorMessage}`, { variant: 'error' });
        return true;
      } else {
        return false;
      }
    }
  }
  const validate = () => {
    if (image === null) {
      enqueueSnackbar('Image must not be empty', {
        variant: 'error',
      });
      return false;
    }
    if (title.trim() === '') {
      setTitleError('Title must not be empty');
      return false;
    } else {
      setTitleError('');
    }
    if (checkTags(description, 'Please write a description', "Description shouldn't be empty")) {
      return false;
    }
    return true;
  };

  const handleBlog = async () => {
    if (validate()) {
      setClick(true);
      if (data) {
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
              setLoading(false);
            });
        }
        await BlogService.patch(
          data._id,
          {
            title: title,
            attachments: [_image],
            description: description,
          },
          {
            query: {},
          },
        )
          .then((res) => {
            let _blogList = blogList;
            _blogList[blogList.indexOf(data)] = res;
            setBlogList([..._blogList]);
            setOpen(false);
            enqueueSnackbar('Blog edited Successfully', {
              variant: 'success',
            });
            setClick(false);
            setLoading(false);
          })
          .catch((err) => {
            enqueueSnackbar(err.message, {
              variant: 'error',
            });
            setLoading(false);
          });
      } else {
        setLoading(true);
        let _image = image;
        if (image !== '') {
          await uploadFile(imageFile)
            .then((response) => {
              _image = response.files[0];
            })
            .catch((error) => {
              enqueueSnackbar(error.message, {
                variant: 'error',
              });
              setLoading(false);
            });
        }
        BlogService.create(
          {
            title: title,
            attachments: [_image],
            description: description,
          },
          {
            query: {},
          },
        )
          .then((res) => {
            let _blogList = blogList;
            setBlogList([res, ..._blogList]);
            setOpen(false);
            enqueueSnackbar('Blog added Successfully', {
              variant: 'success',
            });
            setClick(false);
            setLoading(false);
            setImage(null);
            setImageFile('');
            setTitle('');
          })
          .catch((e) => {
            enqueueSnackbar(e.message, {
              variant: 'error',
            });
            setLoading(false);
          });
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={() => {
          setOpen(false);
          setClick(false);
          setImageFile(null);
          setImage(data && data.attachments[0]);
          setSrc(null);
          setTitle(data && data.title);
          setDescription(data && data.description);
        }}
        open={open}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title">{data ? 'Edit Blog' : 'Add Blog'}</DialogTitle>
        <DialogContent dividers>
          {image ? (
            <>
              <Box display={'flex'} justifyContent={'flex-end'}>
                <Chip
                  size="small"
                  label="Clear"
                  clickable
                  onDelete={() => {
                    setImageFile(null);
                    setImage(null);
                    setSrc(null);
                  }}
                  color="primary"
                />
              </Box>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <img src={image} width={'500px'} height={'auto'} alt={'Profile Image'} />
              </Box>
            </>
          ) : (
            <Box display={'flex'} justifyContent={'center'}>
              <Box
                width={'400px'}
                height={'250px'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                classtitle={classes.dropImage}
                onClick={() => setShow(true)}
                border={`2px dashed #EE1B34`}
                p={1}
                borderRadius={5}
              >
                <AddAPhotoIcon />
                <Box mt={1} p={2} display={'flex'} justifyContent={'center'}>
                  <Typography variant={'subtitle2'} component={Box} textAlign={'center'}>
                    {'Select an image for your Blog'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          <TextField
            margin="dense"
            id="title"
            error={titleError}
            helperText={titleError}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            label="Enter title"
            type="text"
            fullWidth
          />
          <Box mt={2} />
          <QuillEditor
            onChange={(value) => {
              setDescription(value);
            }}
            value={description}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setClick(false);
              setImageFile(null);
              setImage(data && data.attachments[0]);
              setSrc(null);
              setTitle(data && data.title);
              setDescription(data && data.description);
            }}
            color="primary"
            // classtitle={classes.division}
            fullWidth
            style={{ marginTop: 5, marginRight: 5 }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            color="primary"
            variant="contained"
            classtitle={classes.division}
            fullWidth
            onClick={() => {
              handleBlog();
            }}
          >
            {loading ? <CircularProgress size={28} style={{ marginRight: -30 }} /> : data ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <CropperDialog
        aspectRatio={18 / 9}
        cancel={() => {
          if (src) setSrc(null);
          else setShow(false);
        }}
        cancelLabel={src ? 'Clear Image' : 'Cancel'}
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
    </React.Fragment>
  );
};

descriptionDialog.propTypes = {
  position: PropTypes.number,
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  data: PropTypes.object,
  blogList: PropTypes.array,
  setBlogList: PropTypes.func,
  handleClose: PropTypes.func,
  editCategory: PropTypes.any,
};

export default descriptionDialog;
