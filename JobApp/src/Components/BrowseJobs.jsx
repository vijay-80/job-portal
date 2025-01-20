import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Badge,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BrowseJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]); // Store job listings
  const [error, setError] = useState(''); // Store error messages
  const [applyStatus, setApplyStatus] = useState({}); // Track apply status for each job

  // Function to calculate how many days ago a job was posted
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/job/get', {
          withCredentials: true, // Send cookies with the request
        });
        if (response.data.success) {
          setJobs(response.data.jobs);
        } else {
          setError('Failed to fetch jobs.');
        }
      } catch (err) {
        setError('Error fetching jobs. Please try again later.');
      }
    };

    fetchJobs();
  }, []);

  // Function to apply for a job
  const applyForJob = async (jobId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/application/jobs/apply/${jobId}`,
        {}, // Send any additional data here if needed
        { withCredentials: true } // Send cookies with the request
      );

      if (response.data.success) {
        setApplyStatus((prev) => ({ ...prev, [jobId]: 'success' }));
        alert('Application submitted successfully!');
      } else {
        setApplyStatus((prev) => ({ ...prev, [jobId]: 'failed' }));
        alert(response.data.message || 'Failed to apply for the job.');
      }
    } catch (err) {
      setApplyStatus((prev) => ({ ...prev, [jobId]: 'failed' }));
      alert('Error applying for the job. Please try again later.');
    }
  };

  return (
    <div className="p-5 rounded-md bg-white border border-gray-100 flex flex-wrap gap-4">
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : jobs && jobs.length > 0 ? (
        jobs.map((job) => (
          <Card
            key={job._id}
            className="my-4 p-5 rounded-lg shadow-md bg-white w-[300px] transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <Typography variant="body2" color="textSecondary">
                  {daysAgoFunction(job?.createdAt) === 0
                    ? 'Today'
                    : `${daysAgoFunction(job?.createdAt)} days ago`}
                </Typography>
              </div>

              <div className="flex items-center gap-2 my-2">
                <Typography variant="h6" className="font-medium">
                  {job?.company?.name || 'Company Name'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job?.location || 'Location'}
                </Typography>
              </div>

              <div>
                <Typography variant="h5" className="font-bold my-2">
                  {job?.title || 'Job Title'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job?.description || 'Job description goes here.'}
                </Typography>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold">
                  {job?.position || 0} Positions
                </Badge> &nbsp;
                <Badge className="text-[#F83002] font-bold">
                  {job?.jobType || 'Job Type'}
                </Badge> &nbsp;
                <Badge className="text-[#7209b7] font-bold">
                  {job?.salary || 0} LPA
                </Badge>
              </div>

              <div className="flex items-center gap-4 mt-4">

                <Button
                  variant="contained"
                  color="primary"
                  className="bg-[#7209b7] hover:bg-[#5a1d97] transition-colors"
                  onClick={() => applyForJob(job._id)}
                  disabled={applyStatus[job._id] === 'success'}
                >
                  {applyStatus[job._id] === 'success'
                    ? 'Applied'
                    : applyStatus[job._id] === 'failed'
                    ? 'Try Again'
                    : 'Apply'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No job opportunities available. Please check back later!</Typography>
      )}
    </div>
  );
};

export default BrowseJobs;
