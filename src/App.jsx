import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';

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
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <SignIn onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
