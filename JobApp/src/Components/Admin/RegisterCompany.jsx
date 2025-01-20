import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Snackbar, Alert, TextField } from "@mui/material";

const RegisterCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            showSnackbar("Company name cannot be empty.", "error");
            navigate("/admin-dashboard");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/company/register",
                { companyName },
                { withCredentials: true }
            );

            if (response.data.success) {
                showSnackbar(response.data.message || "Registration completed successfully!", "success");
                setCompanyName(""); // Clear input
                navigate("/getcompany"); // Navigate after successful registration
                alert("Company Created");
            } else {
                showSnackbar(response.data.message || "Failed to register the company.", "error");
            }
        } catch (error) {
            showSnackbar(
                error.response?.data?.message ||
                "An error occurred while registering the company.",
                "error"
            );
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-500">
                        What would you like to give your company name? You can change this later.
                    </p>
                </div>

                <div className="w-1/2">
                    <TextField
                        id="companyName"
                        label="Company Name"
                        variant="outlined"
                        className="my-2 w-full"
                        placeholder="JobHunt, Microsoft, etc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center gap-2 my-10">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate("/admin-dashboard")}
                    >
                        Cancel
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={registerNewCompany}
                    >
                        Register
                    </Button>
                </div>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{ width: "100%" }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with a real image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    content: {
        backgroundColor: "rgb(255, 255, 255)", // Semi-transparent white background for the content
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        width: "50%",
        maxWidth: "600px",
    },
};

export default RegisterCompany;
