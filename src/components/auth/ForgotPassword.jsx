import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { resetPassword } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(email);
            setMessage("Check your inbox for further instructions");
        } catch (error) {
            console.log(error);
            setError("Failed to reset password");
        }
        setLoading(false);
    };
    return (
        <div className="font-bold border-2 border-slate-300 rounded shadow-md p-4">
            <h2 className="text-2xl">Reset Password</h2>
            {!message ? (
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        className="border-2 border-black p-2"
                        type="text"
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button className="bg-slate-400" type="submit">
                        Reset Password
                    </button>
                    <div>
                        <Link to="/login">Log In</Link>
                    </div>
                </form>
            ) : (
                <div>
                    <p>{message}</p>
                    <Link to="/login">Log In</Link>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
