import { useSnackbar } from 'notistack';

const useHandleError = () => {
    const { enqueueSnackbar } = useSnackbar();
    return (defaultMessage = 'Something went wrong ! Try again later.') => (error) => {
        enqueueSnackbar(error.message ? error.message : defaultMessage, { variant: 'error' });
    };
};

export default useHandleError;
