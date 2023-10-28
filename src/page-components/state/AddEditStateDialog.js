import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Dialog, DialogContent, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '../../components/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { StateService } from '../../apis/rest.app';
import useHandleError from '../../hooks/useHandleError';

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

const AddEditStateDialog = ({ open, setOpen, eachState, allStates, setAllStates }) => {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useHandleError();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (eachState) {
      setName(eachState.name ? eachState.name : '');
    } else {
      setName('');
    }
  }, [eachState]);

  const handleClose = () => {
    if (eachState) {
      setName(eachState.name);
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

  const saveState = async () => {
    if (eachState) {
      if (validate()) {
        setLoading(true);
        await StateService.patch(eachState?._id, {
          name: name,
        })
          .then((res) => {
            let _allStates = allStates;
            _allStates[_allStates.indexOf(eachState)] = res;
            setAllStates([..._allStates]);
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
        await StateService.create({
          name: name,
        })
          .then((res) => {
            setAllStates([res, ...allStates]);
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
          {eachState ? 'Edit state' : 'Add new state'}
        </DialogTitle>
        <DialogContent className={classes.mainContent}>
          <Typography className={classes.captionText} variant={'h6'}>
            State Name
          </Typography>
          <TextField
            id="admin-add-name"
            variant="outlined"
            size={'small'}
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={'Enter state name'}
            // inputProps={{
            //   className: classes.input,
            // }}
          />
          <Box mt={2} />
          <Button
            onClick={saveState}
            color="primary"
            variant={'contained'}
            size={'large'}
            disabled={loading}
            className={classes.button}
          >
            {loading ? <CircularProgress size={28} /> : eachState ? 'Update' : 'Create'}
          </Button>
          <Box mt={2} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditStateDialog;
