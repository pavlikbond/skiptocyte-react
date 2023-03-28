import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";
import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithRedirect,
} from "firebase/auth";
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const updateUserPassword = (password) => {
        return updatePassword(auth.currentUser, password);
    };

    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    };

    const signInWithGoogleRedirect = () => {
        return signInWithRedirect(auth, provider);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        resetPassword,
        updateUserPassword,
        signInWithGoogle,
        signInWithGoogleRedirect,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
