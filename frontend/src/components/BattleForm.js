import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  CssBaseline,
  Button,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  Grid,
  Box,
  IconButton,
} from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const BattleForm = () => {
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [numTravelers, setNumTravelers] = useState(1);
  const [ages, setAges] = useState([null]);
  const dispatch = useDispatch();
  // const { user, loading, success } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

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

  const handleSubmit = () => {};

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
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
            id='outlined-select-currency'
            fullWidth
            select
            label='Select'
            value={currency}
            onChange={(e) => {}}
            helperText='Please select your currency'
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
            id='date'
            value={startDate}
            // prevent manual input for now
            onKeyDown={(e) => e.preventDefault()}
            label='Start Date'
            disablePast
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
            id='date'
            value={endDate}
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
                InputProps={{ inputProps: { min: 0, max: 200 } }}
                required
                fullWidth
                value={age}
                onChange={(e) => addTravelerAge(travelerId, +e.target.value)}
                id='outlined-number'
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
            sx={{ mt: 3, mb: 2 }}
          >
            Get Quote!
          </Button>
          <Grid container>
            <Grid item xs>
              Use any email / pass, they will not be persisted in any dbs
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default BattleForm;

/*
const date1 = new Date('2022-01-11');
const date2 = new Date('2022-01-11');
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log(diffTime + " milliseconds");
console.log(diffDays + " days");

new Date((new Date('2022-01-09')).now() + 3600 * 1000 * 24)
                      .toISOString()
                      .split('T')[0]
*/
