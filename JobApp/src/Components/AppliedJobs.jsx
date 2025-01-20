import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/application/jobs/applied", {
          withCredentials: true, // Include cookies if required
        });
        setApplications(response.data.application);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter out applications where job title or company name is missing
  const validApplications = applications.filter(
    (application) => application.job?.title && application.job?.company?.name
  );

  return (
    <div className="overflow-x-auto bg-gray-50 p-6 rounded-lg shadow-xl">
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Applied Jobs
      </Typography>
      <TableContainer component={Paper}>
        <Table className="min-w-full table-auto text-gray-700">
          <caption className="text-xl font-semibold text-gray-600">
            A list of your applied jobs
          </caption>
          <TableHead>
            <TableRow className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-400 transition-all duration-300">
              <TableCell className="py-2 px-4 text-left">Date</TableCell>
              <TableCell className="py-2 px-4 text-left">Job Role</TableCell>
              <TableCell className="py-2 px-4 text-left">Company</TableCell>
              <TableCell className="py-2 px-4 text-right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validApplications.length <= 0 ? (
              <TableRow>
                <TableCell colSpan="4" className="py-2 text-center text-gray-500">
                  You haven't applied to any jobs yet.
                </TableCell>
              </TableRow>
            ) : (
              validApplications.map((application) => (
                <TableRow
                  key={application._id}
                  className="hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                >
                  <TableCell className="py-2 px-4">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-2 px-4">{application.job?.title}</TableCell>
                  <TableCell className="py-2 px-4">{application.job?.company?.name}</TableCell>
                  <TableCell className="py-2 px-4 text-right">
                    <span
                      className={`${
                        application.status?.toLowerCase() === "accepted"
                          ? "bg-green-400 text-white"
                          : application.status?.toLowerCase() === "rejected"
                          ? "bg-red-400 text-white"
                          : "bg-yellow-400 text-black" // Use black for better visibility on yellow
                      } py-1 px-3 rounded-full transition-all duration-300 transform hover:scale-110`}
                    >
                      {application.status ? application.status.toUpperCase() : "PENDING"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AppliedJobs;
