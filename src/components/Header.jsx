import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
            })
            .catch((error) => {
                navigate("/error");
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );

                navigate("/browse")
            } else {
                dispatch(removeUser());
                navigate("/")
            }
        });

        return () =>  
    }, []);

    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
            <img
                className="w-44"
                alt="#"
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            />

            {user && (
                <div className="flex p-2">
                    <img
                        className="w-12 h-12 rounded-3xl"
                        src={user?.photoURL}
                        alt="#"
                    />
                    <button
                        onClick={handleSignOut}
                        className="text-white font-bold "
                    >
                        (sign out)
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
