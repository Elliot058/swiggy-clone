import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Dialog, DialogContent, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '../../components/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { PlacesInCityService } from '../../apis/rest.app';
import useHandleError from '../../hooks/useHandleError';

const useStyle = makeStyles((theme) => ({
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  captionText: {
    color: '#323232',
    fontSize: 14,
    margin: theme.spacing(0.8, 0),
  },
  input: {
    backgroundColor: '#F0F2F5',
    borderRadius: '10px',
  },
  button: {
    borderRadius: '10px',
  },
}));

const AddEditPlaceDialog = ({ open, setOpen, eachPlace, allPlaces, setAllPlaces }) => {
  const Router = useRouter();
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useHandleError();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const { id: cityId } = Router.query;

  useEffect(() => {
    if (eachPlace) {
      setName(eachPlace.name ? eachPlace.name : '');
    } else {
      setName('');
    }
  }, [eachPlace]);

  const handleClose = () => {
    if (eachPlace) {
      setName(eachPlace.name);
    } else {
      setName('');
    }
    setOpen(false);
  };

  const validate = (edit = false) => {
    if (name.trim() === '') {
      enqueueSnackbar('Name is required.', { variant: 'warning' });
      return false;
    }
    return true;
  };

  const savePlace = async () => {
    if (eachPlace) {
      if (validate()) {
        setLoading(true);
        await PlacesInCityService.patch(
          eachPlace?._id,
          {
            name: name,
          },
          {
            query: {
              $populate: 'city',
            },
          },
        )
          .then((res) => {
            let _allPlaces = allPlaces;
            _allPlaces[_allPlaces.indexOf(eachPlace)] = res;
            setAllPlaces([..._allPlaces]);
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
        await PlacesInCityService.create(
          {
            name: name,
            city: cityId,
          },
          {
            query: {
              $populate: 'city',
            },
          },
        )
          .then((res) => {
            setAllPlaces([res, ...allPlaces]);
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
          {eachPlace ? 'Edit place' : 'Add new place'}
        </DialogTitle>
        <DialogContent className={classes.mainContent}>
          <Typography className={classes.captionText} variant={'h6'}>
            Place Name
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            type={'text'}
            size={'small'}
            value={name}
            placeholder={'Enter place name'}
            onChange={(e) => setName(e.target.value)}
            // inputProps={{
            //   className: classes.input,
            // }}
          />
          <Box mt={2} />
          <Button
            onClick={savePlace}
            color="primary"
            variant={'contained'}
            size={'large'}
            disabled={loading}
            className={classes.button}
          >
            {loading ? <CircularProgress size={28} /> : eachPlace ? 'Update' : 'Create'}
          </Button>
          <Box mt={2} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditPlaceDialog;
