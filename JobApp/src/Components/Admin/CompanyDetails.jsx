import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, CircularProgress } from '@mui/material';

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/company/get/${id}`, { withCredentials: true });
        setCompany(response.data.company);
        setFormData({
          name: response.data.company.name || '',
          description: response.data.company.description || '',
          location: response.data.company.location || '',
        });
      } catch (error) {
        alert('Error fetching company details');
      }
    };
    fetchCompanyDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/company/update/${id}`,
        formData,
        { withCredentials: true }
      );
      alert(response.data.message);
      setLoading(false);
      navigate(-1); // Go back after successful update
    } catch (error) {
      console.error('Error updating company details', error);
      setLoading(false);
    }
  };

  if (!company) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-lg">
      <Button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 text-white py-2 px-4 rounded hover:opacity-90"
      >
        Back
      </Button>
      <h2 className="text-3xl font-semibold text-center mb-4">Update Company Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <TextField
            label="Company Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
          />
        </div>
        <div className="mb-6">
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div className="mt-10 text-center">
          {/* Added mt-10 for a bigger gap */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} className="mr-2" /> : 'Update Company'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;
