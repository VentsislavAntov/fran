import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ onSignOut }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button color="inherit" onClick={onSignOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
