import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../services/firebase";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const [name, last_name] = user.displayName ? user.displayName.split(" ", 2) : ["", ""];

        const userObj = {
            user_id: user.uid,
            email: user.email,
            first_name: name || "",
            last_name: last_name || "",
            user_level: "basic",
        };

        try {
            const userExist = await axios.get(`http://localhost:8080/users/${user.uid}`);
            if (userExist) {
                toast.info("Welcome back!");
                return;
            }
            await axios.post("http://localhost:8080/users", userObj);
            toast.success("Signed in successfully");
        } catch (error) {
            console.error(error);
            toast.error("Signed in, but failed to save user to database");
        }
    } catch (error) {
        if (error.code === 'auth/cancelled-popup-request') {
            toast.error("Popup closed before completing the sign-in.");
        } else if (error.code === 'auth/popup-blocked') {
            toast.error("Popup was blocked by the browser.");
        } else if (error.code === 'auth/popup-closed-by-user') {
            toast.error("Popup closed before completing the sign-in.");
        } else {
            toast.error("Failed to sign in with Google.");
        }
    }
};

export default handleGoogleSignIn;
