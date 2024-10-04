import React, { Suspense, useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

// A way to simulate slow loading if needed
// const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// const Dashboard = React.lazy(() => simulateDelay(2000).then(() => import('./components/Dashboard')));
// const SignUpSignIn = React.lazy(() => simulateDelay(2000).then(() => import('./components/SignUpSignIn')));


// Lazy loading
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));
const SignUpSignIn = React.lazy(() => import('./components/SignUpSignIn'));

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

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  return (
    <div className="app-container">
      <Suspense
        fallback={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        {isAuthenticated ? (
          <Dashboard onSignOut={handleSignOut} />
        ) : (
          <SignUpSignIn onLogin={handleLogin} />
        )}
      </Suspense>
    </div>
  );
};

export default App;
