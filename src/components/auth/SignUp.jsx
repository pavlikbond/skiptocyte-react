import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../buttons/GoogleButton.jsx";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signUp, signInWithGoogle, signInWithGoogleRedirect } = useAuth();
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        try {
            setError("");
            setLoading(true);
            await signUp(email, password);
            navigate("/");
        } catch (error) {
            console.log(error);
            setError("Failed to create an account");
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        try {
            setError("");
            setLoading(true);
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2>Sign Up</h2>
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
                <input
                    className="border-2 border-black p-2"
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
                <button disabled={loading} type="submit" className="bg-slate-400">
                    Sign Up
                </button>
            </form>
            <GoogleButton type="Sign Up" onClick={handleGoogleSignIn} className="my-2"></GoogleButton>
            <div>
                Already have an account? <Link to="/login">Log in</Link>
            </div>
        </div>
    );
};

export default SignUp;
