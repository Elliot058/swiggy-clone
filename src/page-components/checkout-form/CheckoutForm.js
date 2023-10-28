import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Paper, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Logo from '../../../public/Logo.svg';

const useStyles = makeStyles(() => ({
  input: {
    '&::placeholder': {
      color: '#30313d',
    },
  },
}));

const CheckoutForm = ({ clientId, subscriptionPlanId, transactionId, price }) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');

  const [state, setState] = useState('');
  const [stateError, setStateError] = useState('');

  const [line1, setLine1] = useState('');
  const [line1Error, setLine1Error] = useState('');

  const [line2, setLine2] = useState('');
  const [line2Error, setLine2Error] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const validate = () => {
    if (email.trim() === '') {
      setEmailError('Email is empty');
      return false;
    } else {
      setEmailError('');
    }
    if (name.trim() === '') {
      setNameError('Name is empty');
      return false;
    } else {
      setNameError('');
    }
    if (line1.trim() === '') {
      setLine1Error('Line1 is empty');
      return false;
    } else {
      setLine1Error('');
    }
    if (state.trim() === '') {
      setStateError('State is empty');
      return false;
    } else {
      setStateError('');
    }
    if (city.trim() === '') {
      setCityError('City is empty');
      return false;
    } else {
      setCityError('');
    }
    return true;
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    if (validate()) {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url:
            'http://localhost:3000/payment-successful?status=success&clientId=' +
            clientId +
            '&subscriptionPlanId=' +
            subscriptionPlanId +
            '&transactionId=' +
            transactionId,
          payment_method_data: {
            billing_details: {
              name,
              email,
              address: {
                city,
                state,
                line1,
                line2,
              },
            },
          },
        },
      });

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (e.g., payment
        // details incomplete)
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6} sm={6} xs={12}>
        <Box height={'100%'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <Paper
            style={{
              height: '90vh',
              width: '600px',
              padding: 20,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            elevation={0}
          >
            <Typography variant={'h2'}>{'SR' + price}</Typography>
            <Box mt={2} />
            <img src={Logo} alt={'Athr Logo'} style={{ width: 300, height: 300 }} />
          </Paper>
        </Box>
      </Grid>
      <Grid item md={6} sm={6} xs={12}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'flex-end'}
          height={'100%'}
          width={'100%'}
          p={2}
        >
          <Box
            style={{
              height: '90vh',
              width: '600px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box width={'90%'} border={'100%'} height={'80%'}>
              <Typography style={{ fontWeight: 300 }}>Email*</Typography>
              <Box mt={1} />
              <TextField
                size="small"
                fullWidth
                label=""
                type="text"
                value={email}
                error={!!emailError}
                helperText={emailError}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                InputLabelProps={{
                  shrink: false,
                }}
                InputProps={{
                  classes: { input: classes.input },
                }}
                variant="outlined"
              />
              <Box mt={1} />
              <PaymentElement />
              <Box mt={1} />
              <Typography style={{ fontWeight: 300 }}>Name on Card*</Typography>
              <Box mt={1} />
              <TextField
                size="small"
                fullWidth
                label=""
                type="text"
                error={!!nameError}
                helperText={nameError}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                InputLabelProps={{
                  shrink: false,
                }}
                InputProps={{
                  classes: { input: classes.input },
                }}
                variant="outlined"
              />
              <Box mt={1} />
              <Typography style={{ fontWeight: 300 }}>Address Line 1*</Typography>
              <Box mt={1} />
              <TextField
                size="small"
                fullWidth
                label=""
                type="text"
                error={!!line1Error}
                helperText={line1Error}
                value={line1}
                onChange={(e) => {
                  setLine1(e.target.value);
                  setLine1Error('');
                }}
                InputLabelProps={{
                  shrink: false,
                }}
                InputProps={{
                  classes: { input: classes.input },
                }}
                variant="outlined"
              />
              <Box mt={1} />
              <Typography style={{ fontWeight: 300 }}>Address Line 2</Typography>
              <Box mt={1} />
              <TextField
                size="small"
                fullWidth
                label=""
                type="text"
                error={!!line2Error}
                helperText={line2Error}
                value={line2}
                onChange={(e) => {
                  setLine2(e.target.value);
                  setLine2Error('');
                }}
                InputLabelProps={{
                  shrink: false,
                }}
                InputProps={{
                  classes: { input: classes.input },
                }}
                variant="outlined"
              />
              <Box mt={1} display={'flex'} justifyContent={'space-between'} width={'100%'}>
                <TextField
                  size="small"
                  fullWidth
                  label="State*"
                  type="text"
                  error={!!stateError}
                  helperText={stateError}
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setStateError('');
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    classes: { input: classes.input },
                  }}
                  variant="outlined"
                />
                <TextField
                  size="small"
                  fullWidth
                  label="City*"
                  type="text"
                  error={!!cityError}
                  helperText={cityError}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setCityError('');
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    classes: { input: classes.input },
                  }}
                  variant="outlined"
                />
              </Box>
              <Box mt={3}>
                <Button
                  fullWidth
                  style={{ borderRadius: 10 }}
                  disabled={!stripe}
                  variant={'contained'}
                  color={'primary'}
                  onClick={handleSubmit}
                >
                  Pay
                </Button>
              </Box>
              {/* Show error message to your customers */}
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

CheckoutForm.propTypes = {
  clientId: PropTypes.string,
  subscriptionPlanId: PropTypes.string,
  transactionId: PropTypes.string,
};

export default CheckoutForm;
