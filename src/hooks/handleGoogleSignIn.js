import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../services/firebase";
import axios from "axios";
import socket from "../services/socket"; // Importando o WebSocket
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
            // Verifica se o usuário já existe
            const userExist = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${user.uid}`); // Corrigido para o backend
            if (userExist.status === 200) {
                // O usuário já existe
                toast.info("Welcome back!");
                // Emitir evento WebSocket aqui, se necessário
                socket.emit("userLoggedIn", { userId: user.uid });
                return;
            }
        } catch (error) {
            if (error.response && error.response.status === 404 && error.response.data.message === "User not found") {
                try {
                    const response = await axios.post("https://guiaseller-backend.dlmi5z.easypanel.host/users", userObj); // Corrigido para o backend
                    console.log("User saved:", response.data);
                    toast.success("Signed in successfully");

                    // Emitir evento WebSocket após salvar o usuário
                    socket.emit("userLoggedIn", { userId: user.uid });
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
