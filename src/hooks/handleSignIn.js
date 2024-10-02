import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleSignIn = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        toast.success("Signed in successfully");
    } catch (error) {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            toast.error("Invalid email or password.");
        } else if (error.code === 'auth/too-many-requests') {
            toast.error("Too many attempts. Try again later.");
        } else {
            toast.error("Failed to sign in.");
        }
        console.error(error.message);
    }
};

export default handleSignIn;
