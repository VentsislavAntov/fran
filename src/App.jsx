import React, { useState, useEffect } from 'react';
import SignUpSignIn from './components/SignUpSignIn.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem('isAuthenticated', status ? 'true' : 'false');
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <SignUpSignIn onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
