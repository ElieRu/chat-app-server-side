import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { db } from "./sys/mongoose.js";
import { saveMessage } from "./sys/controllers/messages.js";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

db().catch((err) => console.log(err));

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomName) => {
    
    // console.log(roomName);
    socket.join("connect_chat");

  });

  socket.on("sendMsg", async (message) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    message.time = timeString;
    
    socket.to("connect_chat").emit("recieveMsg", message);
    console.log('got');
    
    await saveMessage(message);

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} is disconnected`);
    });
  });
});

httpServer.listen(3001);
