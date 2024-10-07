import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const handleSignUp = async ({ firstName, lastName, email, password }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        const userObj = {
            id: user.uid,
            email: user.email,
            name: firstName,
            last_name: lastName,
            user_level: "basic",
        };

        try {
            // Verifica se o usuário já existe
            const userExist = await axios.get(`http://localhost:8080/users/${user.uid}`);
            if (userExist.status === 200) {
                // O usuário já existe
                toast.info("Welcome back!");
                return;
            }
        } catch (error) {
            if (error.response && error.response.status === 404 && error.response.data.message === "User not found") {
                try {
                    const response = await axios.post("http://localhost:8080/users", userObj);
                    console.log("User saved:", response.data);
                    toast.success("Signed in successfully");
                } catch (error) {
                    console.error("Error saving user to database:", error);
                    toast.error("Signed in, but failed to save user to database");
                }
            } else {
                console.error("Error checking user existence:", error);
                toast.error("Error checking user existence.");
                return; 
            }
        }
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            toast.error('Email is already in use.');
        } else {
            toast.error('Failed to sign up.');
        }
        console.error(error);
    }
};

export default handleSignUp;
