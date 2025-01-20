import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
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
        <h2 style={styles.sidebarHeader}>Admin Menu</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/registercompany" style={styles.navLink}>
              Register Company
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/getcompany" style={styles.navLink}>
              View Companies
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/registerjob" style={styles.navLink}>
              Register Job
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/viewjob" style={styles.navLink}>
              View Job
            </Link>
          </li>
          <li style={{ ...styles.navItem, color: "#e74c3c" }}>
            <span onClick={() => setShowPopup(true)} style={styles.navLink}>
              Log Out
            </span>
          </li>
        </ul>
      </aside>

      {/* Main Content Section */}
      <main style={styles.mainContent}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <img
            src="https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your tech-themed image URL
            alt="Tech Dashboard"
            style={styles.heroImage}
          />
          <div style={styles.heroText}>
            <h1>Welcome to the Admin Dashboard</h1>
            <p>
              Manage companies, jobs, and users efficiently with our
              state-of-the-art platform. Stay ahead with real-time data and
              insights.
            </p>
          </div>
        </div>

        {/* Metrics Section */}
        <div style={styles.metricsContainer}>
          <div style={styles.metricCard}>
            <h3>Registered Companies</h3>
            <p>45</p>
          </div>
          <div style={styles.metricCard}>
            <h3>Available Jobs</h3>
            <p>120</p>
          </div>
          <div style={styles.metricCard}>
            <h3>Active Users</h3>
            <p>300</p>
          </div>
        </div>
      </main>

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

const styles = {
  dashboard: { display: "flex", height: "100vh", fontFamily: "'Arial', sans-serif" },
  sidebar: {
    width: "20%",
    backgroundColor: "#34495e",
    color: "#ecf0f1",
    padding: "20px",
  },
  sidebarHeader: { marginBottom: "20px", fontSize: "18px", textAlign: "center" },
  navList: { listStyleType: "none", padding: 0 },
  navItem: { padding: "10px 0", cursor: "pointer", textDecoration: "none" },
  navLink: { color: "#ecf0f1", textDecoration: "none", transition: "color 0.3s" },

  // Main Content Styles
  mainContent: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f8f9fa",
    overflowY: "auto",
  },

  // Hero Section Styles
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#ecf0f1",
    borderRadius: "8px",
    marginBottom: "30px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  heroImage: {
    width: "50%",
    borderRadius: "8px",
    objectFit: "cover",
  },
  heroText: {
    width: "45%",
    padding: "20px",
    textAlign: "left",
  },
  heroTextH1: {
    fontSize: "28px",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  heroTextP: {
    fontSize: "16px",
    color: "#7f8c8d",
    lineHeight: "1.6",
  },

  // Metrics Section Styles
  metricsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  metricCard: {
    flex: 1,
    margin: "0 10px",
    padding: "20px",
    backgroundColor: "#ecf0f1",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontSize: "18px",
  },

  // Popup Styles
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

export default AdminDashboard;
