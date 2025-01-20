import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/login',
        { email, password, role },
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate(role === 'student' ? '/user-dashboard' : '/admin-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1677194562330-2210f33e2576?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Replace with your desired background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.41)', // Semi-transparent background to improve readability
          padding: '30px',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom style={{ color: '#fff' }}>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            style={{ backgroundColor: '#fff' }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            style={{ backgroundColor: '#fff' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl style={{ width: '150px' }}>
              <InputLabel style={{ color: '#fff' }}>Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} style={{ backgroundColor: '#fff' }}>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="recruiter">Recruiter</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
