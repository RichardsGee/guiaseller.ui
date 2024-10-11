import { io } from "socket.io-client";

const socket = io("https://guiaseller-backend.dlmi5z.easypanel.host/"); 

// Escutar eventos
socket.on("connect", () => {
    console.log("Conectado ao WebSocket:", socket.id);
});

export default socket;
