import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/register', formData);
      setMessage(response.data.message);
      setError('');
      alert("user created");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setMessage('');
    }
  };

  return (
    <Box sx={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      {message && <Typography sx={{ color: 'green', marginBottom: 2 }}>{message}</Typography>}
      {error && <Typography sx={{ color: 'red', marginBottom: 2 }}>{error}</Typography>}
      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          type="number"
          value={formData.phoneNumber}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select> <br /><br />
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
