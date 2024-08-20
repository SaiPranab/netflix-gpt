import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkvalidData } from "../utils/validate";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    
    const[errorMessage, setErrorMessage] = useState(null)

    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = (e) => {
        // Validate the form data
        const message = checkvalidData(email.current.value, password.current.value)
        setErrorMessage(message)
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    alt=""
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/031c42b9-0c81-4db5-b980-0160765188e9/27f1b15d-79ed-43ca-8982-7faa9e4aa388/IN-en-20240819-TRIFECTA-perspective_WEB_3c576fa6-cd23-46b6-ac3f-1ad2bb0f66fb_small.jpg"
                />
            </div>

            <form onClick={(e) => e.preventDefault()}
                action=" "
                className="absolute p-12 bg-black w-3/12 mx-auto my-36 right-0 left-0 text-white rounded-lg bg-opacity-80"
            >
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                { isSignInForm || (
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="p-4 my-4 w-full bg-gray-700"
                    />
                )}
                <input
                    type="text"
                    ref={email}
                    placeholder="email address"
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <input
                    type="password"
                    ref={password}
                    placeholder="password"
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <p className="text-red-500 font-bold">{errorMessage}</p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm
                        ? "New To Netflix? Sign Up Now"
                        : "Already registered Sign In NOW"}
                </p>
            </form>
        </div>
    );
};

export default Login;
