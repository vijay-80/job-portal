import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const GetCompany = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/v1/company/get",
                    { withCredentials: true }
                );
                setCompanies(response.data.companies);
            } catch (err) {
                setError("Error fetching companies");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Registered Companies</h1>
                    <Button
                        variant="contained"
                        color="success"
                        className="self-center"
                        onClick={() => navigate("/registercompany")}
                    >
                        Create Company
                    </Button>
                </div>

                {companies.length === 0 ? (
                    <p>No companies registered yet.</p>
                ) : (
                    <ul>
                        {companies.map((company) => (
                            <li
                                key={company._id}
                                className="relative mb-4 p-4 border rounded-lg shadow-lg flex items-center"
                                style={styles.companyItem}
                            >
                                {/* Display company logo */}
                                {company.logo && (
                                    <img
                                        src={company.logo}
                                        alt={`${company.name} Logo`}
                                        className="w-16 h-16 mr-4 rounded-full object-cover"
                                    />
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {company.name}
                                    </h2>
                                    <p>{company.description || "No description available"}</p>
                                    <p>Location: {company.location || "Not provided"}</p>
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="absolute top-2 right-2"
                                    onClick={() => navigate(`${company._id}`)}
                                >
                                    Edit
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: "280vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with an actual image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
    },
    content: {
        backgroundColor: "rgba(255, 255, 255, 0.66)", // Semi-transparent background for readability
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        width: "90%",
        maxWidth: "800px",
    },
    loading: {
        color: "white",
        fontSize: "20px",
        textAlign: "center",
    },
    error: {
        color: "red",
        fontSize: "18px",
        textAlign: "center",
    },
    companyItem: {
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
};

export default GetCompany;
