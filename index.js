import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { db } from "./database/mongoose.js";
import { fetchMessages, saveMessage } from "./controllers/messages.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

db().catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get('/messages', async (req, res) => {
  await fetchMessages(req, res);
});

io.on("connection", (socket) => {
  socket.on("joinRoom", async (roomName) => {
    socket.join("connect_chat");

    // socket.to("connect_chat").emit("recentMsg", await fetchMessages(roomName));
  });

  socket.on("sendMsg", async (message) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    message.time = timeString;

    console.log("selecting...");
    socket.to("connect_chat").emit("recieveMsg", message);

    await saveMessage(message);
    socket.on("disconnect", () => {
      console.log(`User ${socket.id} is disconnected`);
    });
  });
});

httpServer.listen(3001);
