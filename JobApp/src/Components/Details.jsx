import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const Details = () => {
  const styles = {
    container: {
      display: "flex", // Ensure the container is a flexbox
      flexDirection: "column", // Align children in a column
      justifyContent: "center", // Centers content horizontally
      alignItems: "center", // Centers content vertically
      height: "100vh", // Full viewport height
      fontFamily: "'Arial', sans-serif",
      fontSize: "49px",
      
    },
    card: {
      maxWidth: 400, // Card width
      marginTop: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional shadow for better look
    },
    cardTitle: {
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div>Find Your Job</div>
      
      {/* Grid Container for Cards */}
      <Grid container spacing={3} justifyContent="center">
        {/* First Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" style={styles.cardTitle}>
                Job Title: Software Engineer
              </Typography>
              <Typography variant="body1">Company: XYZ Corp</Typography>
              <Typography variant="body1">Location: New York, USA</Typography>
              <Typography variant="body1">Type: Full-Time</Typography>
              <Typography variant="body1">Industry: Technology</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" style={styles.cardTitle}>
                Job Title: Data Analyst
              </Typography>
              <Typography variant="body1">Company: ABC Inc</Typography>
              <Typography variant="body1">Location: San Francisco, USA</Typography>
              <Typography variant="body1">Type: Part-Time</Typography>
              <Typography variant="body1">Industry: Finance</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Third Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" style={styles.cardTitle}>
                Job Title: Marketing Specialist
              </Typography>
              <Typography variant="body1">Company: Market Leaders</Typography>
              <Typography variant="body1">Location: Chicago, USA</Typography>
              <Typography variant="body1">Type: Full-Time</Typography>
              <Typography variant="body1">Industry: Marketing</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Fourth Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" style={styles.cardTitle}>
                Job Title: Graphic Designer
              </Typography>
              <Typography variant="body1">Company: Creative Agency</Typography>
              <Typography variant="body1">Location: Los Angeles, USA</Typography>
              <Typography variant="body1">Type: Freelance</Typography>
              <Typography variant="body1">Industry: Design</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Fifth Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" style={styles.cardTitle}>
                Job Title: Data Scientist
              </Typography>
              <Typography variant="body1">Company: Data Analytics Inc</Typography>
              <Typography variant="body1">Location: Boston, USA</Typography>
              <Typography variant="body1">Type: Full-Time</Typography>
              <Typography variant="body1">Industry: Data Science</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sixth Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card style={styles.card}>
            <CardContent>   
                
              <Typography variant="h5" style={styles.cardTitle}>
                Job Title: Project Manager
              </Typography>
              <Typography variant="body1">Company: XYZ Corp</Typography>
              <Typography variant="body1">Location: Seattle, USA</Typography>
              <Typography variant="body1">Type: Full-Time</Typography>
              <Typography variant="body1">Industry: Construction</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
    