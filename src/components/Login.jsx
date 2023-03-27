import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/authDetails");
        } catch (error) {
            console.log(error);
            setError("Failed to login");
        }
        setLoading(false);
    };

    return (
        <div className="font-bold border-2 border-slate-300 rounded shadow-md p-4">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <h2>Log In</h2>
                <input
                    className="border-2 border-black p-2"
                    type="text"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="border-2 border-black p-2"
                    type="password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button className="bg-slate-400" type="submit">
                    Login
                </button>
            </form>
            <div>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
};

export default Login;
