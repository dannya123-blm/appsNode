'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

export default function Registration() {
  // State to track visibility of different sections
  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);

  // Handlers to control what section to show
  const runShowLogin = () => {
    setShowLogin(true);
    setShowReg(false);
  };

  const runShowReg = () => {
    setShowLogin(false);
    setShowReg(true);
  };

  const handleSubmit = (event) => {
    console.log("Handling Submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get('email');
    let confirmEmail = data.get('confirmEmail');
    let password = data.get('password');
    let confirmPassword = data.get('confirmPassword');

    console.log("Sent Email: " + email);
    console.log("Confirm Email: " + confirmEmail);
    console.log("Sent Password: " + password);
    console.log("Confirm Password: " + confirmPassword);

    runDBCallAsync(`http://localhost:3000/api/register?Email=${email}&confirmEmail=${confirmEmail}&password=${password}&confirmPassword=${confirmPassword}`);
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data === "valid") {
      console.log("Registration is valid!");
    } else {
      console.log("Not valid");
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          <Button color="inherit" onClick={runShowLogin}>Login</Button>
          <Button color="inherit" onClick={runShowReg}>Register</Button>
        </Toolbar>
      </AppBar>

      {/* Register Section */}
      {showReg && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Container maxWidth="sm">
            <Box sx={{ height: '100vh' }}>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="confirmEmail"
                  label="Confirm Email Address"
                  name="confirmEmail"
                  autoComplete="confirm-email"
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
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
}
