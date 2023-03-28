import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const { currentUser, updateUserPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setEmail(currentUser?.email || "");
    }, [currentUser]);

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        try {
            setError("");
            setLoading(true);
            await updateUserPassword(password);
            navigate("/authDetails");
        } catch (error) {
            console.log(error);
            setError("Failed to update password");
        }
        setLoading(false);
    };

    return (
        <>
            <div className="font-bold border-2 border-slate-300 rounded shadow-md p-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h2 className="text-2xl">Change Password</h2>
                    <p>{email}</p>
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
                        Update
                    </button>
                </form>
                <div className="mt-4">
                    <Link to="/authDetails">Cancel</Link>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
