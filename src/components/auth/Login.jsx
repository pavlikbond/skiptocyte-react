import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import GoogleButton from "../buttons/GoogleButton.jsx";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login, signInWithGoogle, signInWithGoogleRedirect } = useAuth();
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

    const handleGoogleSignIn = async () => {
        try {
            setError("");
            setLoading(true);
            //if mobile browser, use redirect, otherwise use popup
            if (window.innerWidth <= 500) {
                await signInWithGoogleRedirect();
            } else {
                await signInWithGoogle();
            }
            navigate("/authDetails");
        } catch (error) {
            console.log(error);
            setError("Failed to login");
        }
    };
    return (
        <div className="font-bold border-2 border-slate-300 rounded shadow-md p-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl">Log In</h2>
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
                <div className="float-right">
                    <Link className="text-sm" to="/forgot-password">
                        Forgot Password?
                    </Link>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button onClick={handleLogin} className="bg-slate-400" type="submit">
                    Login
                </button>
                <GoogleButton type="Log In" onClick={handleGoogleSignIn} className="my-2"></GoogleButton>
                <div>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
