import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { ThemeProvider } from '@material-ui/core/styles';
import Cropper from 'react-cropper';
import DragAndDrop from './DragAndDrop';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import theme from '../../theme';

function CropperDialog({
  okLabel = 'Edit',
  cancelLabel = 'Cancel',
  show,
  dismiss,
  cancel,
  onCropped,
  onSelected,
  src,
  aspectRatio,
}) {
  const [cropper, setCropper] = useState();
  const cropImage = () => {
    if (typeof cropper.getCroppedCanvas() === 'undefined' || !cropper.getCroppedCanvas()) {
      // console.log('hiii');
      return;
    }
    onCropped(cropper.getCroppedCanvas().toDataURL());
  };

  const handleDrop = (files) => {
    const reader = new FileReader();
    reader.onload = () => {
      onSelected(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <ThemeProvider theme={theme()}>
      <Dialog fullWidth maxWidth="xs" onClose={dismiss} open={show}>
        <DialogTitle>
          <Typography color={'secondary'} variant={'h3'}>
            Upload Photo
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ width: '100%' }}>
            {!src ? (
              <DragAndDrop handleDrop={handleDrop}>
                <div style={{ height: 400, width: 400 }}></div>
              </DragAndDrop>
            ) : (
              <Cropper
                aspectRatio={aspectRatio ? aspectRatio : ''}
                guides={true}
                preview=".img-preview"
                ref={(c) => {
                  setCropper(c);
                }}
                src={src}
                style={{ height: 400, width: '100%' }}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={cancel}>
            {cancelLabel}
          </Button>
          {src ? (
            <Button color="primary" onClick={() => cropImage()} variant="contained">
              {okLabel}
            </Button>
          ) : (
            <Button color="primary" disabled variant="contained">
              {okLabel}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default CropperDialog;
