import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const AuthDetails = () => {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setError("");
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error);
            setError("Failed to logout");
        }
    };
    return (
        <div className="border-2 border-slate-600 rounded shadow-md p-4">
            <h2 className="text-2xl">Profile</h2>
            <p className="text-xl">Email: {currentUser && currentUser.email}</p>
            {error && <p className="text-red-500">{error}</p>}
            <Link to="/update-profile">
                <button className="bg-slate-400">Update Profile</button>
            </Link>
            <button className="bg-slate-400" onClick={handleLogout}>
                Sign Out
            </button>
        </div>
    );
};

export default AuthDetails;
