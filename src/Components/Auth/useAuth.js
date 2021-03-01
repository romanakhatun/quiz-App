import React, { useState, createContext, useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = props => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={
                ({ location }) => auth.user ? (children) : (<Redirect to={{ pathname: "/auth/entry", state: { from: location } }} />)
            }
        />
    );
}

const getUser = user => {
    const { displayName, email, photoURL, password, phone } = user;
    return { name: displayName, email, photo: photoURL, password, phone }
}

const Auth = () => {
    const [ user, setUser ] = useState(null);
    const [ error, setError ] = useState('');

    // Create User With Email
    const createUserWithEmail = (name, email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
            res.user.updateProfile({
                displayName: name,
            });
            setUser(getUser(res.user));
            return res.user;
        }).catch(err => {
            setError(err.message);
            return err.message;
        });
    }


    // Sign In With Email
    const signInWithEmail = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            setUser(getUser(res.user));
            return res.user;
        }).catch(err => {
            setError(err.message);
            return err.message;
        });
    }

    // Sign In With Google
    const signInWithGoogle = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(googleProvider).then(res => {
            setUser(getUser(res.user));
            return res.user;
        }).catch(err => {
            setError(err.message);
            return err.message;
        });
    }

    // Sign In With Facebook
    const signInWithFacebook = () => {
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(facebookProvider).then(res => {
            setUser(getUser(res.user));
            return res.user;
        }).catch(err => {
            setError(err.message);
            return err.message;
        });
    }

    // Sign In With Github
    const signInWithGithub = () => {
        const githubProvider = new firebase.auth.GithubAuthProvider();
        return firebase.auth().signInWithPopup(githubProvider).then(res => {
            setUser(getUser(res.user));
            return res.user;
        }).catch(err => {
            setError(err.message);
            return err.message;
        });
    }

    // Sign In With Yahoo
    const signInWithYahoo = () => {
        const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
        return firebase.auth().signInWithPopup(yahooProvider).then(res => {
            setUser(getUser(res.user));
            return res.user;
        }).catch(err => {
            setError(err.message);
            return err.message;
        });
    }


    // Sign Out
    const signOut = () => {
        return firebase.auth().signOut().then(res => {
            setUser(null);
        }).catch(err => {
            setError(err.message);
            return err.message;
        });
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(getUser(user));
            } else {
                console.log("No user is signed in.");
            }
        });
    }, []);

    return { user, error, createUserWithEmail, signInWithEmail, signInWithGoogle, signInWithFacebook, signInWithGithub, signInWithYahoo, signOut }
}
export default Auth;