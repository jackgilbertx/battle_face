import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Alert,
  Button,
  TextField,
  Box,
  CircularProgress,
  Avatar,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/actions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (loading) {
    return (
      <Box sx={{ mt: 16, display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>

        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box>
            <Typography variant='caption' display='block'>
              Valid username & pass can be found in Readme
            </Typography>
          </Box>
          {error && (
            <Box style={{ marginTop: 16 }}>
              <Alert severity='error'>Server Error!</Alert>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
