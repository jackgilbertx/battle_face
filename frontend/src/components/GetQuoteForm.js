import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, getQuote } from '../redux/actions/actions';
import {
  TextField,
  Button,
  Avatar,
  MenuItem,
  Box,
  IconButton,
  Alert,
  CircularProgress,
  Typography,
  Container,
} from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const GetQuoteForm = () => {
  const navigate = useNavigate();
  const [currencyType, setCurrencyType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ages, setAges] = useState([null]);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { quote, loading, error } = useSelector((state) => state.quote);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  // Maintain correct values for remaining travelers
  const removeTraveler = (travelerId) => {
    const newAges = ages;
    newAges.splice(travelerId, 1);
    setAges(() => [...newAges]);
  };

  const addTravelerAge = (id, age) => {
    setAges((prevAges) => {
      let newAges = prevAges;
      newAges[id] = age;
      return [...newAges];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      currencyType,
      startDate,
      endDate,
      ages,
    };
    dispatch(getQuote(payload));
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'BTC':
        return '฿';
      default:
        return '';
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          textAlign: 'right',
        }}
      >
        <Button
          color='error'
          variant='outlined'
          onClick={() => dispatch(logout())}
        >
          Log out
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <AirplanemodeActiveIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Get Quote
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 4 }}
            required
            id='currencyType'
            fullWidth
            select
            label='Select'
            value={currencyType}
            placeholder='Select...'
            onChange={(e) => {
              setCurrencyType(e.target.value);
            }}
            helperText='Please select your currency type'
          >
            {[
              {
                value: 'USD',
                label: '$',
              },
              {
                value: 'EUR',
                label: '€',
              },
              {
                value: 'BTC',
                label: '฿',
              },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            onChange={(e) => {
              setStartDate(e.target.value);
              setEndDate('');
            }}
            id='startDate'
            value={startDate}
            required
            // prevent manual input for now
            onKeyDown={(e) => e.preventDefault()}
            label='Start Date'
            InputProps={{
              inputProps: {
                min: new Date(Date.now()).toISOString().split('T')[0],
              },
            }}
            type='date'
            sx={{ mb: 4 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id='endDate'
            value={endDate}
            required
            // prevent manual input for now
            onKeyDown={(e) => e.preventDefault()}
            label='End Date'
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            InputProps={{
              inputProps: {
                // min date at least 1 day after start date or 1 day after today
                min: startDate
                  ? new Date(new Date(startDate).getTime() + 3600 * 1000 * 24)
                      .toISOString()
                      .split('T')[0]
                  : new Date(Date.now() + 3600 * 1000 * 24)
                      .toISOString()
                      .split('T')[0],
              },
            }}
            type='date'
            sx={{ mb: 4 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {ages.map((age, travelerId) => (
            <Box
              key={travelerId}
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                InputProps={{ inputProps: { min: 18, max: 200 } }}
                required
                fullWidth
                value={age}
                id={`Traveler#${travelerId + 1}`}
                onChange={(e) => addTravelerAge(travelerId, +e.target.value)}
                label={`Traveler #${travelerId + 1} Age`}
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {travelerId !== 0 && (
                <IconButton
                  onClick={() => removeTraveler(travelerId)}
                  color='primary'
                  aria-label='remove traveler'
                  component='span'
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button
            onClick={() => {
              setAges((prev) => [...ages, null]);
            }}
            variant='outlined'
            endIcon={<AddIcon />}
          >
            Add traveler
          </Button>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            id='submit'
            sx={{ mt: 3, mb: 2 }}
          >
            Get Quote!
          </Button>
          <Box mb={4} sm={{ display: 'flex', justifyContent: 'center' }}>
            {loading && (
              <Box sx={{ mt: 16, display: 'flex' }}>
                <CircularProgress />
              </Box>
            )}
            {quote && (
              <Typography component='h1' variant='h2'>
                {getCurrencySymbol(quote.currencyType)}
                {quote.quote}
              </Typography>
            )}
            {error && (
              <Alert variant='filled' severity='error'>
                Server Error!
              </Alert>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default GetQuoteForm;
