import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/job/get", {
        withCredentials: true,
      });

      if (response.data.success) {
        setJobs(response.data.jobs);
      } else {
        alert(response.data.message || "Failed to fetch jobs.");
      }
    } catch (error) {
      alert("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        alert("Job deleted successfully.");
      } else {
        alert(response.data.message || "Failed to delete job.");
      }
    } catch (error) {
      alert("An error occurred while deleting the job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Replace with your background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "#fff", // Adjust text color for visibility on the background
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.75)", // Semi-transparent background for better readability
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <div className="text-right mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/registerjob")}
          >
            New Job
          </Button>
        </div>

        <h1 className="font-bold text-2xl mb-4">Job Listings</h1>
        <div className="overflow-x-auto">
          <table
            className="table-auto w-full border-collapse"
            style={{ color: "#fff" }}
          >
            <thead>
              <tr>
                <th className="px-4 py-2 border">Company</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="px-4 py-2 border">{job.company.name}</td>
                    <td className="px-4 py-2 border">{job.title}</td>
                    <td className="px-4 py-2 border">{formatDate(job.createdAt)}</td>
                    <td className="px-4 py-2 border text-right">
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate(`/applicants/${job._id}`)}
                        style={{ marginRight: "10px" }}
                      >
                        Applicants
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteJob(job._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No jobs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobTable;
