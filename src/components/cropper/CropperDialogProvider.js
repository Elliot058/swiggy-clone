import React from 'react';
import CropperDialog from "./CropperDialog";

const CropperDialogContext = React.createContext({});

export const CropperDialogProvider = ({children}) => {

    const [dialogOpen,setDialogOpen] = React.useState(false);
    const [dialogConfig,setDialogConfig] = React.useState({});


    const openDialog = ({
                            cancelLabel = 'Cancel',
                            okLabel = 'Save',
                            src,
                            callBack
    }) => {
        setDialogOpen(true);
        setDialogConfig({cancelLabel,okLabel,src,callBack});
    };

    const resetDialog = () => {
        setDialogOpen(false);
        setDialogConfig({});
    };

    const onCropped = (src) => {
        resetDialog();
        dialogConfig.callBack({
            status: 'CROPPED',src
        });
    };

    const onSelected = (src) => {
        setDialogConfig({
            ...dialogConfig,src
        })
    };

    const onDismiss = () => {
        resetDialog();
        if(dialogConfig.src){
            dialogConfig.callBack({
                status: 'SELECTED',src: dialogConfig.src
            });
        } else {
            dialogConfig.callBack({
                status: 'CANCELED'
            });
        }

    };



    return(
        <CropperDialogContext.Provider value={{openDialog}}>
            <CropperDialog
                show={dialogOpen}
                dismiss={onDismiss}
                cancel={onDismiss}
                onCropped={onCropped}
                onSelected={onSelected}
                src={dialogConfig.src}
                aspectRatio={dialogConfig.aspectRatio}
            />
            {children}
        </CropperDialogContext.Provider>
    )
}

export const useCropperDialog = () => {
    const {openDialog} = React.useContext(CropperDialogContext);


    const getCroppedImage = ({...options}) => new Promise((res)=>{
        openDialog({callBack: res,...options});
    });
    return {
        getCroppedImage
    }
}

export const withCropper = (Component) => (props) => {

    return (
        <CropperDialogProvider>
            <Component {...props}/>
        </CropperDialogProvider>
    )
}