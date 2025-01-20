import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';

const PostJobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: '',
    companyId: '',
  });
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/company/get', { withCredentials: true });
        if (response.data.success) {
          setCompanies(response.data.companies);
        }
      } catch (err) {
        setError('Failed to fetch companies.');
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/job/post', formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        setSuccess(response.data.message);
        setError('');
        setFormData({
          title: '',
          description: '',
          requirements: '',
          salary: '',
          location: '',
          jobType: '',
          experience: '',
          position: '',
          companyId: '',
        });
        alert('Job posted successfully!');
        navigate('/viewjob');
      } else {
        setError('Failed to post job, please try again.');
      }
    } catch (err) {
      setError('Failed to post job, please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Replace with your desired image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.83)', // Semi-transparent white background
          borderRadius: 2,
          padding: 4,
          maxWidth: 800,
          width: '100%',
        }}
      >
        <Button variant="outlined" onClick={() => navigate('/admin-dashboard')}>
          Back
        </Button>
        <Typography variant="h4" component="h2" gutterBottom>
          Post a New Job
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Job Type"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Experience Level"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel id="companyId-label">Company</InputLabel>
            <Select
              labelId="companyId-label"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              required
            >
              {companies.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Post Job'}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default PostJobForm;
