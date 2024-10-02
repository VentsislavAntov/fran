import React, { useState } from 'react';

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic validation
    if (email && password) {
      // Simulate successful login
      onLogin(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
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
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default SignIn;
