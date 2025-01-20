import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Details from "./Details";

const UserDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear authentication tokens (localStorage, cookies, etc.)
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div style={styles.dashboard}>
      {/* Sidebar Section */}
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarHeader}>User Menu</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/browser" style={styles.navLink}>
              Browse Jobs
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/applied-job" style={styles.navLink}>
              View Applied Jobs
            </Link>
          </li>
          {/* Uncomment if needed */}
          {/* 
          <li style={styles.navItem}>
            <Link to="/update-profile" style={styles.navLink}>
              Update Profile
            </Link>
          </li> 
          */}
          <li style={{ ...styles.navItem, color: "#e74c3c" }}>
            <span onClick={() => setShowPopup(true)} style={styles.navLink}>
              Log Out
            </span>
          </li>
        </ul>
      </aside>

      {/* Main Content Section */}
      <Details />

      {/* Logout Confirmation Popup */}
      {showPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout} style={styles.popupButton}>
              Yes
            </button>
            <button
              onClick={() => setShowPopup(false)}
              style={styles.popupButton}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  dashboard: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Arial', sans-serif",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#34495e",
    color: "#ecf0f1",
    padding: "20px",
  },
  sidebarHeader: {
    marginBottom: "20px",
    fontSize: "18px",
    textAlign: "center",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
  },
  navItem: {
    padding: "10px 0",
    cursor: "pointer",
    textDecoration: "none",
  },
  navLink: {
    color: "#ecf0f1",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  mainContent: {
    width: "80%",
    padding: "20px",
    boxSizing: "border-box",
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    background: "white",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
  },
  popupButton: {
    margin: "10px",
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UserDashboard;
