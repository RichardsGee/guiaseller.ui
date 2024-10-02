import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../services/firebase";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    const provider = new FacebookAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const [name, last_name] = user.displayName ? user.displayName.split(" ", 2) : ["", ""];

        const userObj = {
            id: user.uid,
            email: user.email,
            name: name || "",
            last_name: last_name || "",
        };

        try {
            await axios.post("http://localhost:8080/users", userObj);
            toast.success("Signed in successfully with Facebook");
        } catch (error) {
            console.error(error);
            toast.error("Signed in, but failed to save user to database");
        }
    } catch (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
            toast.error("An account already exists with the same email address.");
        } else if (error.code === 'auth/cancelled-popup-request') {
            toast.error("Popup closed before completing the sign-in.");
        } else if (error.code === 'auth/popup-blocked') {
            toast.error("Popup was blocked by the browser.");
        } else if (error.code === 'auth/popup-closed-by-user') {
            toast.error("Popup closed before completing the sign-in.");
        } else {
            toast.error("Failed to sign in with Facebook.");
        }
        console.error(error.message);
    }
};

export default handleFacebookSignIn;
