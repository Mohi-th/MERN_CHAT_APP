import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {

    socket = io(import.meta.env.VITE_SERVER);

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    

    socket.on("disconnect", () => {
      console.log(" Socket disconnected");
    });

};

export const getSocket = () => socket;