import React from 'react';
import { AppBar, Avatar, Toolbar, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useParams();

  // Correctly define the updateHandle function
  const updateHandle = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ backgroundColor: '#2c3e50' }}> {/* Change navbar background color */}
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, color: 'white' }}> {/* Change text color */}
            DreamDesk
          </Typography>
          {/* Avatar with click event */}
          <Avatar
            sx={{ bgcolor: deepOrange[500], cursor: 'pointer' }} // Custom avatar color
            onClick={updateHandle}
          >
            {user?.charAt(0) || 'A'}
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
