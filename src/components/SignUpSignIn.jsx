import React, { useState } from 'react';

const SignUpSignIn = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and sign-in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = () => {
    if (email && password) {
      // Save credentials in localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
      setMessage('Sign up successful! Please sign in.');
      setIsSignUp(false); // Redirect to sign-in form
    } else {
      setMessage('Please provide valid credentials');
    }
  };

  const handleSignIn = () => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
      onLogin(true); // Log in successful
    } else {
      setMessage('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <p>{message}</p>
        <div>
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <span className="toggle" onClick={() => setIsSignUp(false)}>
                Sign In
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span className="toggle" onClick={() => setIsSignUp(true)}>
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpSignIn;
