import React, { useState } from 'react';
import Hero from '../Home/Hero';
import { WebsiteName } from '../../App';
import './Auth.css';

import { useAuth } from './useAuth';

const Entry = () => {
    document.title = "Account | " + WebsiteName;
    const auth = useAuth();

    const [ user, setUser ] = useState({ name: '', email: '', password: '', phone: '', isValid: false, error: '' });

    // Input check
    const isValidName = email => /^[a-zA-Z ]{2,30}$/.test(email);
    const isValidEmail = email => /(.+)@(.+){2,}\.(.+){2,}/.test(email);
    const isValidPassword = pass => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/.test(pass);

    // Input Change
    const inputChange = e => {
        const newUser = { ...user }

        // Validation
        let isValid = true;
        if (e.target.name === "name") {
            isValid = isValidName(e.target.value);

            if (!isValidName(e.target.value)) {
                newUser.error = "Name should have contains only letters and at least 2 to up to 30 letters.";
            } else {
                newUser.error = "";
            }
        }
        if (e.target.name === "email") {
            isValid = isValidEmail(e.target.value);

            if (!isValidEmail(e.target.value)) {
                newUser.error = "Invalid Email formate.";
            } else {
                newUser.error = "";
            }
        }
        if (e.target.name === "password") {
            isValid = isValidPassword(e.target.value);

            if (!isValidPassword(e.target.value)) {
                newUser.error = "Password should have contained 1 uppercase and lowercase letter, 1 number, 1 special character and at least 8 to up to 30 characters.";
            } else {
                newUser.error = "";
            }
        }
        if (e.target.name === "confirmPassword") {
            let password = document.getElementById("password").value;

            if (password !== e.target.value) {
                newUser.error = "Password did not match";
                isValid = false;
            } else {
                newUser.error = "";
                isValid = true;
            }
        }

        newUser[ e.target.name ] = e.target.value;
        newUser.isValid = isValid;
        setUser(newUser);
    }

    // Register Account
    const registerAccount = e => {
        if (user.isValid) {
            auth.createUserWithEmail(user.name, user.email, user.password,).then(res => {
                if (res.email) window.location.pathname = '/quiz';
            });
        } else {
            const formValid = { ...user }
            formValid.error = 'Form is not valid';
            setUser(formValid);
        }
        e.preventDefault();
        e.target.reset();
    }

    // Sign In User
    const signInUser = e => {
        auth.signInWithEmail(user.email, user.password).then(res => {
            if (res.email) window.location.pathname = '/quiz';
        });

        e.preventDefault();
        e.target.reset();
    }

    // Google Sign In
    const googleSignIn = (e) => {
        auth.signInWithGoogle().then(res => {
            if (res.email) window.location.pathname = '/quiz';
        });
        e.preventDefault();
    }

    // Facebook Sign In
    const facebookSignIn = (e) => {
        auth.signInWithFacebook().then(res => {
            window.location.pathname = '/quiz';
        });
        e.preventDefault();
    }


    // Github Sign In
    const githubSignIn = (e) => {
        auth.signInWithGithub().then(res => {
            if (res.displayName) window.location.pathname = '/quiz';
        });
        e.preventDefault();
    }

    // Yahoo Sign In
    const yahooSignIn = (e) => {
        auth.signInWithYahoo().then(res => {
            if (res.email) window.location.pathname = '/quiz';
        });
        e.preventDefault();
    }

    // Sign Out
    const signOut = () => {
        auth.signOut().then(res => {
            window.location.pathname = '/entry';
        });
    }

    // Form Toggle
    const [ formType, setFormType ] = useState('registration');
    const signInForm = () => {
        setFormType('sign in');
    }
    const registerForm = () => {
        setFormType('registration');
    }

    return (
        <section className="flexCenter user">
            <Hero title="Account" />
            {
                auth.user ?
                    <div className="userSignedIn">
                        <div className="userInfo">
                            {
                                auth.user.photo ?
                                    <img src={auth.user.photo} alt={auth.user.name} style={{ width: "150px", borderRadius: "50%" }} /> :
                                    auth.user.name && <p className="photoAlt">{auth.user.name.charAt(0)}</p>
                            }

                            {auth.user.name && <h2>Welcome, {auth.user.name}</h2>}
                            {auth.user.email && <p><strong>Your E-mail:</strong> {auth.user.email}</p>}
                        </div>
                        <button className="btn" onClick={signOut}>Sign out</button>
                    </div> :
                    <div className="accountWrapper">
                        <div className="alert">
                            <p id="successMessage">{user.success}</p>
                            <p id="errorMessage">{auth.error}</p>
                            <p id="errorMessage">{user.error}</p>
                        </div> {/* Alert Message */}

                        <div className="signArea" id="signArea">
                            <div className="loginSocialNetworks">
                                <h2>Login with social networks </h2>
                                <button onClick={facebookSignIn} className="facebookBtn"><i class="fa fa-facebook"></i>Facebook</button>
                                <button onClick={googleSignIn} className="googleBtn "> <i class="fa fa-google"></i>Google</button>
                                <button onClick={githubSignIn} className="githubBtn"> <i class="fa fa-github"></i>Github</button>
                                <button onClick={yahooSignIn} className="yahooBtn"> <i class="fa fa-yahoo"></i>Yahoo</button>
                            </div>{/* Login Social Networks */}

                            <div className="formSubmission">
                                <form style={{ display: formType === 'registration' ? "block" : "none" }} onSubmit={registerAccount}>
                                    <h2>Register a new account</h2>
                                    <input type="text" name="name" onBlur={inputChange} className="input" placeholder="Enter your name" required />
                                    <input type="email" name="email" onBlur={inputChange} className="input" placeholder="Enter your email" required />
                                    <input type="password" name="password" onBlur={inputChange} className="input" placeholder="Enter your password" id="password" required />
                                    <input type="password" name="confirmPassword" onBlur={inputChange} className="input" placeholder="Confirm password" required />
                                    <input type="submit" value="Register" className="submitBtn" />
                                    <p className="green formText" onClick={signInForm}>Are you a member? Login now</p>
                                </form>{/* Register Form */}

                                <form style={{ display: formType === 'sign in' ? "block" : "none" }} onSubmit={signInUser}>
                                    <h2>Login with your site account</h2>
                                    <input type="email" name="email" onBlur={inputChange} className="input" placeholder="Enter your email" required />
                                    <input type="password" name="password" onBlur={inputChange} className="input" placeholder="Enter your password" required />
                                    <input type="submit" value="Sign In" className="submitBtn" />
                                    <p className="green formText" onClick={registerForm}> Not a member yet? Register now</p>
                                </form> {/* Login form */}
                            </div> {/*Form Submission */}
                        </div>{/* Sign In Area */}
                    </div>//Account Wrapper
            }
        </section>
    );
};

export default Entry;