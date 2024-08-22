// import React, { useRef, useState } from "react";
// import Header from "./Header";
// import { checkvalidData } from "../utils/validate";
// import { auth } from "../utils/firebase";
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     updateProfile,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [isSignInForm, setIsSignInForm] = useState(true);
//     const [errorMessage, setErrorMessage] = useState(null);

//     const name = useRef(null);
//     const email = useRef(null);
//     const password = useRef(null);

//     const navigate = useNavigate();

//     const toggleSignInForm = () => {
//         setIsSignInForm(!isSignInForm);
//     };

//     const handleButtonClick = (e) => {
//         // Validate the form data
//         const message = checkvalidData(
//             email.current.value,
//             password.current.value
//         );
//         setErrorMessage(message);

//         if (message) {
//             return;
//         }

//         // SignIn/ SignUp logic
//         if (!isSignInForm) {
//             // SignUp Logic
//             createUserWithEmailAndPassword(
//                 auth,
//                 email.current.value,
//                 password.current.value
//             )
//             .then((userCredential) => {
//                 // Signed up
//                 const user = userCredential.user;

//                 updateProfile(user, {
//                     displayName: name.current.value,
//                     photoURL:
//                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYIMmE0bLUSDD7LII20c-b06qmFH_ZWUqUQA&s",
//                 })
//                 .then(() => {
//                     navigate("/browse");
//                 })
//                 .catch((error) => {
//                     setErrorMessage(error.message);
//                 });

//                 console.log(user);
//                 navigate("/");
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;

//                 setErrorMessage(`${errorMessage} : ${errorMessage}`);
//             });
//         } else {
//             // SignIn Logic
//             signInWithEmailAndPassword(
//                 auth,
//                 email.current.value,
//                 password.current.value
//             )
//                 .then((userCredential) => {
//                     // Signed in
//                     const user = userCredential.user;
//                     console.log(user);
//                     navigate("/browse");
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     const errorMessage = error.message;

//                     setErrorMessage(`${errorMessage} : ${errorMessage}`);
//                 });
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <div className="absolute">
//                 <img
//                     alt=""
//                     src="https://assets.nflxext.com/ffe/siteui/vlv3/031c42b9-0c81-4db5-b980-0160765188e9/27f1b15d-79ed-43ca-8982-7faa9e4aa388/IN-en-20240819-TRIFECTA-perspective_WEB_3c576fa6-cd23-46b6-ac3f-1ad2bb0f66fb_small.jpg"
//                 />
//             </div>

//             <form
//                 onClick={(e) => e.preventDefault()}
//                 action=" "
//                 className="absolute p-12 bg-black w-3/12 mx-auto my-36 right-0 left-0 text-white rounded-lg bg-opacity-80"
//             >
//                 <h1 className="font-bold text-3xl py-4">
//                     {isSignInForm ? "Sign In" : "Sign Up"}
//                 </h1>
//                 {isSignInForm || (
//                     <input
//                         type="text"
//                         placeholder="Full Name"
//                         className="p-4 my-4 w-full bg-gray-700"
//                     />
//                 )}
//                 <input
//                     type="text"
//                     ref={email}
//                     placeholder="email address"
//                     className="p-4 my-4 w-full bg-gray-700"
//                 />
//                 <input
//                     type="password"
//                     ref={password}
//                     placeholder="password"
//                     className="p-4 my-4 w-full bg-gray-700"
//                 />
//                 <p className="text-red-500 font-bold">{errorMessage}</p>
//                 <button
//                     className="p-4 my-6 bg-red-700 w-full rounded-lg"
//                     onClick={handleButtonClick}
//                 >
//                     {isSignInForm ? "Sign In" : "Sign Up"}
//                 </button>
//                 <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
//                     {isSignInForm
//                         ? "New To Netflix? Sign Up Now"
//                         : "Already registered Sign In NOW"}
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkvalidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = (e) => {
        const message = checkvalidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYIMmE0bLUSDD7LII20c-b06qmFH_ZWUqUQA&s",
                    })
                    .then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({
                            uid : uid,
                            email : email,
                            displayName : displayName,
                            photoURL : photoURL
                        }))
                        navigate("/browse");
                    })
                    .catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate("/browse");
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        }
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    alt=""
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/031c42b9-0c81-4db5-b980-0160765188e9/27f1b15d-79ed-43ca-8982-7faa9e4aa388/IN-en-20240819-TRIFECTA-perspective_WEB_3c576fa6-cd23-46b6-ac3f-1ad2bb0f66fb_small.jpg"
                />
            </div>

            <form
                onClick={(e) => e.preventDefault()}
                action=" "
                className="absolute p-12 bg-black w-3/12 mx-auto my-36 right-0 left-0 text-white rounded-lg bg-opacity-80"
            >
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        type="text"
                        ref={name}
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
                <button
                    className="p-4 my-6 bg-red-700 w-full rounded-lg"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm
                        ? "New To Netflix? Sign Up Now"
                        : "Already registered? Sign In NOW"}
                </p>
            </form>
        </div>
    );
};

export default Login;
