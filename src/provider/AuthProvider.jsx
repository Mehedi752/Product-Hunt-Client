import { createContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import auth from '../../public/firebase.config'
import useAxiosPublic from '../hooks/useAxiosPublic'


// Create a context
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // Create new user
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Sign out user
    const signOutUser = () => {
        return signOut(auth)
    }

    // Update user profile
    const updateProfileUser = (updateInfo) => {
        return updateProfile(auth.currentUser, updateInfo);
    }


    // Sign in with Google
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }


    // Check if any user is logged in
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentUser => {
            console.log('Current State : ', currentUser?.email)

            if (currentUser?.email) {
                setUser(currentUser);
                setLoading(false);

                //Get token and store in local storage.
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            else {
                setUser(null);
                setLoading(false);

                //Remove token from local storage.
                localStorage.removeItem('access-token');
            }
        })

        return () => {
            unsubcribe()
        }
    }, [])


    // Auth info
    const authInfo = {
        createNewUser,
        user,
        setUser,
        signInUser,
        signOutUser,
        loading,
        setLoading,
        updateProfileUser,
        signInWithGoogle
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </div>
    )
}

export default AuthProvider;