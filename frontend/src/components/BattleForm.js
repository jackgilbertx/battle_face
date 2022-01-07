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
  const [numTravelers, setNumTravelers] = useState(2);

  const dispatch = useDispatch();
  // const { user, loading, success } = useSelector((state) => state.user);

  useEffect(() => {}, []);

  const handleSubmit = () => {
    console.log('sub');
  };

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
            onChange={(e) => console.log(e.target.value)}
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
          {Array.from(Array(numTravelers + 1).keys())
            .slice(1)
            .map((traveler) => (
              <Box
                sx={{
                  display: 'flex',
                  // alignItems: 'center',
                }}
              >
                <TextField
                  InputProps={{ inputProps: { min: 0, max: 200 } }}
                  sx={{ mb: 4 }}
                  required
                  fullWidth
                  onChange={(e) => console.log(e.target.value)}
                  id='outlined-number'
                  label={`Traveler #${traveler} Age`}
                  type='number'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <CloseIcon />
              </Box>
            ))}
          <Button
            onClick={() => setNumTravelers(numTravelers + 1)}
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
