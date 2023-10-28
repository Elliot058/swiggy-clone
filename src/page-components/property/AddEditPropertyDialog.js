import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, CircularProgress, Dialog, DialogContent, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '../../components/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { CityService, PropertyService, StateService, uploadFile } from '../../apis/rest.app';
import useHandleError from '../../hooks/useHandleError';
import CropperDialog from '../../components/cropper/CropperDialog';
import { useUser } from '../../store/UserContext';
import { Autocomplete } from '@material-ui/lab';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import propTypes from 'prop-types';
import NumberFormat from 'react-number-format';

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

const AddEditPropertyDialog = ({ open, setOpen, eachProperty, allProperties, setAllProperties }) => {
  const classes = useStyle();
  const [user] = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useHandleError();
  const [loading, setLoading] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [pinCode, setPinCode] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [image, setImage] = useState('NA');
  const [imageFile, setImageFile] = useState('');
  const [src, setSrc] = useState();
  const [show, setShow] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [showPassword, setShowPassword] = React.useState(false);

  const [stateData, setStateData] = useState([]);

  const [cityData, setCityData] = useState([]);

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

  const setAttributes = (property) => {
    if (property) {
      setImage(eachProperty?.avatar ? eachProperty?.avatar : 'NA');
      setName(eachProperty.name ? eachProperty.name : '');
      setContactEmail(eachProperty.contactEmail ? eachProperty.contactEmail : '');
      setContactPhone(eachProperty.contactPhone ? eachProperty.contactPhone : '');
      setAddressLine1(eachProperty?.address.addressLine1);
      setCity(eachProperty?.address.city);
      setState(eachProperty?.address.state);
      setPinCode(eachProperty?.address.pinCode);
      setNearbyLocations(eachProperty?.address?.nearbyLocations);
      setOwnerName(eachProperty?.owner?.name);
      setOwnerEmail(eachProperty?.owner?.email);
      setOwnerPassword('');
      if (eachProperty?.coordinates && eachProperty?.coordinates.length) {
        setLatitude(eachProperty?.coordinates[1]);
        setLongitude(eachProperty?.coordinates[0]);
      }
    } else {
      setImage('NA');
      setName('');
      setContactEmail('');
      setContactPhone('');
      setAddressLine1('');
      setCity(null);
      setState(null);
      setPinCode('');
      setNearbyLocations([]);
      setOwnerName('');
      setOwnerEmail('');
      setOwnerPassword('');
    }
  };

  useEffect(() => {
    StateService.find({
      query: {
        $limit: -1,
        $select: ['name'],
      },
    })
      .then((res) => {
        setStateData(res);
        CityService.find({
          query: {
            $limit: -1,
            $select: ['name', 'state'],
          },
        }).then((cities) => {
          let states = res.map((e) => {
            return {
              ...e,
              citiesOfState: cities.filter((c) => c.state.toString() === e._id.toString()),
            };
          });
          setStateData(states);
        });
      })
      .catch((e) => {
        enqueueSnackbar(e ? e.message : 'Something went wrong', {
          variant: 'error',
        });
      });

    if (eachProperty) {
      setAttributes(eachProperty);
    } else {
      setAttributes(null);
    }
  }, [eachProperty]);

  const handleClose = () => {
    if (eachProperty) {
      setAttributes(eachProperty);
    } else {
      setAttributes(null);
    }
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = (edit = false) => {
    if (image === 'NA') {
      enqueueSnackbar('Please provide an image for the property.', { variant: 'warning' });
      return false;
    }
    if (!edit && ownerName.trim() === '') {
      enqueueSnackbar("Please input the hotel owner's name.", { variant: 'warning' });
      return false;
    }
    if (!edit && ownerEmail.trim() === '') {
      enqueueSnackbar("Please input the hotel owner's email credential.", { variant: 'warning' });
      return false;
    } else {
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          ownerEmail,
        )
      ) {
        enqueueSnackbar('Please input valid Email address of owner.', { variant: 'warning' });
        return false;
      }
    }
    if (!edit && ownerPassword.trim() === '') {
      enqueueSnackbar("Please input the hotel owner's password credential.", { variant: 'warning' });
      return false;
    } else {
      if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(ownerPassword)) {
        enqueueSnackbar('Password must be 8-16 letters and at least one number with one special character.', {
          variant: 'warning',
        });
        return false;
      }
    }
    if (name.trim() === '') {
      enqueueSnackbar('Please provide a name for the property.', { variant: 'warning' });
      return false;
    }
    if (contactEmail.trim() === '') {
      enqueueSnackbar('Please input Hotel Email address..', { variant: 'warning' });
      return false;
    } else {
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          contactEmail,
        )
      ) {
        enqueueSnackbar('Please input valid Hotel Email address..', { variant: 'warning' });
        return false;
      }
    }
    if (contactPhone.trim() === '') {
      enqueueSnackbar('Please input Hotel Contact number.', { variant: 'warning' });
      return false;
    } else {
      if (!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(contactPhone.trim())) {
        enqueueSnackbar('Please provide a valid phone number!', { variant: 'warning' });
        return false;
      }
    }
    if (addressLine1.trim() === '') {
      enqueueSnackbar('Please input the address of hotel.', { variant: 'warning' });
      return false;
    }
    if (!city) {
      enqueueSnackbar('Please input the city of hotel.', { variant: 'warning' });
      return false;
    }
    if (!state) {
      enqueueSnackbar('Please input the state of hotel.', { variant: 'warning' });
      return false;
    }
    if (pinCode.trim() === '') {
      enqueueSnackbar('Please input the pin code.', { variant: 'warning' });
      return false;
    }
    // if (mapLink.trim() === '' || (mapLink && !/(https|http):\/\/(www\.|)google\.[a-z]+\/maps/.test(mapLink))) {
    //   enqueueSnackbar('Link must be a google maps link.', {
    //     variant: 'warning',
    //   });
    //   return false;
    // }
    return true;
  };

  const saveProperty = async () => {
    if (eachProperty) {
      if (validate(true)) {
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
        await PropertyService.patch(eachProperty?._id, {
          name: name,
          avatar: _image,
          ownerName,
          ownerEmail,
          ownerPassword,
          contactEmail,
          contactPhone,
          address: {
            addressLine1,
            city: city._id,
            state: state._id,
            pinCode,
            nearbyLocations: nearbyLocations.map((e) => e.toLowerCase().trim()),
          },
          mapLink,
          coordinates: latitude && longitude ? [longitude, latitude] : undefined,
        })
          .then((res) => {
            let _allProperties = allProperties;
            _allProperties[_allProperties.indexOf(eachProperty)] = res;
            setAllProperties([..._allProperties]);
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
        await PropertyService.create({
          name: name,
          avatar: _image,
          ownerName,
          ownerEmail,
          ownerPassword,
          contactEmail,
          contactPhone,
          address: {
            addressLine1,
            city: city._id,
            state: state._id,
            pinCode,
            nearbyLocations: nearbyLocations.map((e) => e.toLowerCase().trim()),
          },
          mapLink,
          coordinates: latitude && longitude ? [longitude, latitude] : undefined,
        })
          .then((res) => {
            setAllProperties([res, ...allProperties]);
            enqueueSnackbar('Property Created successfully.', {
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
        maxWidth={'sm'}
        fullWidth
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" onClose={handleClose}>
          {eachProperty ? 'Edit property' : 'Add new property'}
        </DialogTitle>
        <DialogContent className={classes.mainContent}>
          {image !== 'NA' ? (
            <>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                onClick={() => {
                  setImageFile('');
                  setImage('');
                  setSrc('');
                }}
              >
                <Chip
                  size="small"
                  label="Clear"
                  clickable
                  onDelete={() => {
                    setImageFile('');
                    setImage('NA');
                    setSrc('');
                  }}
                  color="primary"
                />
              </Box>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <img src={image} width={'250px'} height={150} alt={'Profile Image'} />
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
          <Typography className={classes.captionText} variant={'h6'}>
            {`Property Owner's Name`}
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder={`Enter property owner's name`}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            {`Property Owner's Email`}
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            placeholder={`Enter property owner's email address`}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            {`Property Owner's Password`}
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={showPassword ? 'text' : 'password'}
            value={ownerPassword}
            onChange={(e) => setOwnerPassword(e.target.value)}
            placeholder={`Enter property owner's password credential`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            Property Name
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={'Enter property name'}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            Property Email
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder={'Enter property email address'}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            Property Contact Number
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder={'Enter property contact number'}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            Address
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder={'Enter property address'}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} style={{ fontWeight: 'bold' }} variant={'h6'}>
            {`Note: Please choose a state first to continue to add city.`}
          </Typography>
          <Box mt={1} />
          <Typography className={classes.captionText} variant={'h6'}>
            State
          </Typography>
          <Autocomplete
            filterSelectedOptions
            onChange={(event, newValue) => {
              setState(newValue);
              let statePos = stateData.findIndex((e) => e._id.toString() === newValue._id.toString());
              setCityData(stateData[statePos].citiesOfState);
            }}
            options={stateData}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" size={'small'} placeholder="Select state" />
            )}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            City
          </Typography>
          <Autocomplete
            filterSelectedOptions
            onChange={(event, newValue) => {
              setCity(newValue);
            }}
            options={cityData}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" size={'small'} placeholder="Select city" />
            )}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            Pin-Code
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder={'Enter pin code'}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            Co-ordinates
          </Typography>
          <Box display={'flex'} flexDirection={'row'}>
            <TextField
              id="admin-add-name"
              variant="outlined"
              label={'Latitude'}
              size={'small'}
              type={'number'}
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder={'Enter latitude value'}
            />
            <Box p={1} />
            <TextField
              id="admin-add-name"
              variant="outlined"
              label={'Longitude'}
              size={'small'}
              type={'number'}
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder={'Enter longitude code'}
            />
          </Box>
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            Nearby Multiple Locations
          </Typography>
          <Autocomplete
            multiple
            id="tags-filled"
            options={[]}
            value={nearbyLocations}
            onChange={(e, v) => {
              // console.log(v);
              setNearbyLocations(v);
            }}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                return <Chip variant="outlined" key={option} label={option} {...getTagProps({ index })} />;
              })
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" size={'small'} placeholder="Enter Nearby locations" />
            )}
          />
          <Box mt={2} />
          <Typography className={classes.captionText} variant={'h6'}>
            Map-Link
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
            placeholder={'Enter Google Map link'}
          />
          <Box mt={2} />
          <Button
            onClick={saveProperty}
            color="primary"
            variant={'contained'}
            size={'large'}
            disabled={loading}
            className={classes.button}
          >
            {loading ? <CircularProgress size={28} /> : eachProperty ? 'Update' : 'Create'}
          </Button>
          <Box mt={2} />
        </DialogContent>
      </Dialog>
      <CropperDialog
        aspectRatio={16 / 12}
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

AddEditPropertyDialog.propTypes = {
  open: propTypes.any,
  setOpen: propTypes.any,
  eachProperty: propTypes.any,
  allProperties: propTypes.any,
  setAllProperties: propTypes.any,
};

export default AddEditPropertyDialog;
