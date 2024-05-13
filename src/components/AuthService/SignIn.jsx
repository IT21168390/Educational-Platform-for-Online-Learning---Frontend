import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/v1/auth/signin', {
        email,
        password
      });
      // Handle successful sign in, maybe store token in localStorage and redirect
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('role', response.data.userRole);
      console.log('User signed in:', response.data);
    } catch (error) {
      setError(error.response.data); // Assuming the backend returns error messages
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && <Typography variant="subtitle1" color="error">{error}</Typography>}
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;