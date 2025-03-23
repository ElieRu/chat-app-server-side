import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { db } from "./src/database/mongoose.js";
import { fetchMessages, saveMessage } from "./src/controllers/message.js";
import { ConnectedUser, DisconnectedUser } from "./src/controllers/user.js";
import { currentTime } from "./util.js";

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

app.get("/messages", async (req, res) => {
  await fetchMessages(req, res);
});

io.on("connection", (socket) => {
  socket.on("joinRoom", async (roomName) => {
    socket.join("connect_chat");
  });

  socket.on("sendMsg", async (message) => {
    message.time = currentTime();

    await saveMessage(message);

    socket.to("connect_chat").emit("recieveMsg", message);
    socket.to("connect_chat").emit("updateUsersDatas", {
      last_message: message.content,
      selected_user: message.selected_user_sub
    });
  });

  socket.on("isDisconnected", (email) => {
    socket.on("disconnect", async () => {
      await DisconnectedUser(email);
    });
  });

  socket.on("isConnected", async (email) => {
    await ConnectedUser(email);
  });
});

httpServer.listen(3001);
