import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Typography, Link } from '@mui/material';

const SignUpSignIn = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and sign-in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Retrieve users from localStorage or initialize as an empty array
  const getStoredUsers = () => JSON.parse(localStorage.getItem('users')) || [];

  const handleSignUp = () => {
    if (email && password) {
      // Retrieve existing users
      const users = getStoredUsers();

      // Check if the email is already registered
      if (users.some(user => user.email === email)) {
        setMessage('Email is already registered. Please sign in.');
        return;
      }

      // Add new user to the array
      const newUser = { email, password };
      users.push(newUser);

      // Save updated users array to localStorage
      localStorage.setItem('users', JSON.stringify(users));

      setMessage('Sign up successful! Please sign in.');
      setIsSignUp(false); // Redirect to sign-in form
    } else {
      setMessage('Please provide valid credentials.');
    }
  };

  const handleSignIn = () => {
    const users = getStoredUsers();

    // Check if the entered credentials match any stored user
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      onLogin(true); // Log in successful
    } else {
      setMessage('Invalid credentials, please try again.');
    }
  };

  return (
    <Dialog open={true} onClose={() => {}} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{isSignUp ? 'Sign Up' : 'Sign In'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={isSignUp ? handleSignUp : handleSignIn}
          style={{ marginTop: '20px' }}
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
        <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
          {message}
        </Typography>
        <div style={{ marginTop: '20px' }}>
          {isSignUp ? (
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component="button" onClick={() => setIsSignUp(false)}>
                Sign In
              </Link>
            </Typography>
          ) : (
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link component="button" onClick={() => setIsSignUp(true)}>
                Sign Up
              </Link>
            </Typography>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpSignIn;
