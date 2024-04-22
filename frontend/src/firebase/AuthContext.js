import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../../firebase/firebase.config'
import { doc, getDoc, writeBatch, increment } from 'firebase/firestore';
import { db } from "../../firebase/firebase.config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const googleSignIn =async () => {
        const provider = new GoogleAuthProvider();
       console.log("Hello");
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            // Handle the error, e.g., show a message to the user
            console.error("Google Sign In Error:", error);
        }
    }

    const passwordSignUp = (email, password) => {
        setIsAuthenticated(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const passwordSignIn = (email, password) => {
        setIsAuthenticated(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const logout = () => {
        signOut(auth)
        localStorage.clear();
        setIsAuthenticated(false);
       
    }

    const isDocumentPresent = async (user) => {

        console.log('I m here');

        // user.uid
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
console.log(docSnap)
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            // Do nothing
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // Add doc and update the count
            const batch = writeBatch(db);

            const userCountRef = doc(db, "generalInfo", "users");
            batch.update(userCountRef, {
                count: increment(1)
            })

            const userRef = doc(db, "users", user.uid);
            batch.set(userRef, {
                authId: user.uid,
                type: 'user'
            })

            await batch.commit();
        }

    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser !== null) {
                if (currentUser.displayName !== null) {
                    // Google Authentication
                    console.log('Google Authentication');
                    // setIsAuthenticated(true);
                    isDocumentPresent(currentUser);
                    const userDetails = {
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        emailVerified: currentUser.emailVerified,
                        photoURL: currentUser.photoURL,
                        uid: currentUser.uid,
                        // Add other relevant details as needed
                      };
                      

                      localStorage.setItem('userDetails', JSON.stringify(userDetails));
                }
            }
           
              
           
            
            
        })

        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, googleSignIn, user, logout, passwordSignIn, passwordSignUp, forgotPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext);
}