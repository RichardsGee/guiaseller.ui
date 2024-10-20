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
            user_id: user.uid,
            email: user.email,
            first_name: name || "",
            last_name: last_name || "",
            user_level: "basic",
        };

        try {
            // Verifica se o usuário já existe
            const userExist = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${user.uid}`);
            if (userExist.status === 200) {
                // O usuário já existe
                toast.info("Welcome back!");
                return;
            }
        } catch (error) {
            if (error.response && error.response.status === 404 && error.response.data.message === "User not found") {
                try {
                    const response = await axios.post("https://guiaseller-backend.dlmi5z.easypanel.host/users", userObj);
                    console.log("User saved:", response.data);
                    toast.success("Signed in successfully");
                } catch (error) {
                    console.error("Error saving user to database:", error.response ? error.response.data : error.message);
                    toast.error("Signed in, but failed to save user to database");
                }
            } else {
                console.error("Error checking user existence:", error.response ? error.response.data : error.message);
                toast.error("Error checking user existence.");
                return; 
            }
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
