import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ViewApplicants = () => {
  const { id } = useParams(); // Job ID from route parameters
  const [applicants, setApplicants] = useState([]);
  const [jobName, setJobName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shortlistingStatus = ["Accepted", "Pending", "Rejected"];
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/application/${id}/applicants`, 
          { withCredentials: true }
        );
        setApplicants(response.data.job.applications || []);
        setJobName(response.data.job.name || "Unknown Job");
      } catch (err) {
        console.error('Error:', err);  // Log the full error for debugging
        setError(
          err.response?.data?.message || err.message || "Failed to fetch applicants."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [id]);
  

  const statusHandler = async (status, applicantId) => {
    try {
      const response = await axios(
        `http://localhost:8000/api/v1/jobs/status/${applicantId}`, // Matches backend route
        { status },
        { withCredentials: true }
      );
      alert(response.data.message);
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === applicantId
            ? { ...applicant, status: status.toLowerCase() }
            : applicant
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      setMenuAnchorEl(null);
    }
  };

  const handleMenuOpen = (event, applicantId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedApplicantId(applicantId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedApplicantId(null);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        Applicants for {jobName}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.length > 0 ? (
              applicants.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>{application.applicant?.name || "N/A"}</TableCell>
                  <TableCell>{application.applicant?.email || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{application.status || "Pending"}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, application._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No applicants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        {shortlistingStatus.map((status) => (
          <MenuItem
            key={status}
            onClick={() => statusHandler(status, selectedApplicantId)}
          >
            {status}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ViewApplicants;
