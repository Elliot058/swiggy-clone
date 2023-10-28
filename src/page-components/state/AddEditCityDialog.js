import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Dialog, DialogContent, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '../../components/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { CityService } from '../../apis/rest.app';
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

const AddEditCityDialog = ({ open, setOpen, eachCity, allCities, setAllCities }) => {
  const Router = useRouter();
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useHandleError();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const { id: stateId } = Router.query;

  useEffect(() => {
    if (eachCity) {
      setName(eachCity.name ? eachCity.name : '');
    } else {
      setName('');
    }
  }, [eachCity]);

  const handleClose = () => {
    if (eachCity) {
      setName(eachCity.name);
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

  const saveCity = async () => {
    if (eachCity) {
      if (validate()) {
        setLoading(true);
        await CityService.patch(
          eachCity?._id,
          {
            name: name,
          },
          {
            query: {
              $populate: 'state',
            },
          },
        )
          .then((res) => {
            let _allCities = allCities;
            _allCities[_allCities.indexOf(eachCity)] = res;
            setAllCities([..._allCities]);
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
        await CityService.create(
          {
            name: name,
            state: stateId,
          },
          {
            query: {
              $populate: 'state',
            },
          },
        )
          .then((res) => {
            setAllCities([res, ...allCities]);
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
          {eachCity ? 'Edit city' : 'Add new city'}
        </DialogTitle>
        <DialogContent className={classes.mainContent}>
          <Typography className={classes.captionText} variant={'h6'}>
            City Name
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            type={'text'}
            size={'small'}
            value={name}
            placeholder={'Enter city name'}
            onChange={(e) => setName(e.target.value)}
            // inputProps={{
            //   className: classes.input,
            // }}
          />
          <Box mt={2} />
          <Button
            onClick={saveCity}
            color="primary"
            variant={'contained'}
            size={'large'}
            disabled={loading}
            className={classes.button}
          >
            {loading ? <CircularProgress size={28} /> : eachCity ? 'Update' : 'Create'}
          </Button>
          <Box mt={2} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditCityDialog;
