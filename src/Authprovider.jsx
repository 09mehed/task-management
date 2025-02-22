import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./firebase.config";
import axios from "axios";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const handleSignOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    const handleGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider).then(async (result) => {
            const loggedInUser = result.user;
            setUser(loggedInUser);

            // Store user in database
            await axios.post("http://localhost:3000/users", {
                id: loggedInUser.id,
                email: loggedInUser.email,
                displayName: loggedInUser.displayName,
            });
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        handleSignOut,
        handleGoogleLogin
    }

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider