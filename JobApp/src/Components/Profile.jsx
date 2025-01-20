import React from "react";
import { Typography, Box, CircularProgress } from "@mui/material";

const Profile = ({ user }) => {
  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} boxShadow={2} borderRadius={2}>
      <Typography variant="h5" mb={2}>Profile Information</Typography>
      <Typography variant="body1">Name: {user.fullname || "N/A"}</Typography>
      <Typography variant="body1">Email: {user.email || "N/A"}</Typography>
      <Typography variant="body1">Phone: {user.phoneNumber || "N/A"}</Typography>
      <Typography variant="body1">Location: {user.profile?.location || "N/A"}</Typography>
      <Typography variant="body1">Bio: {user.profile?.bio || "N/A"}</Typography>
      <Typography variant="body1">
        Skills: {user.profile?.skills?.join(", ") || "N/A"}
      </Typography>
    </Box>
  );
};

export default Profile;
