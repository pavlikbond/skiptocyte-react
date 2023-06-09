import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import "./App.css";
import AuthDetails from "./components/AuthDetails";
import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./components/auth/ForgotPassword";
import UpdateProfile from "./components/auth/UpdateProfile";
function App() {
    return (
        <div className="App flex flex-col gap-4">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/authDetails" element={<AuthDetails />}></Route>
                    <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                    <Route path="/update-profile" element={<UpdateProfile />}></Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
