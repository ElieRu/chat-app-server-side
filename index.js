import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { db } from "./src/database/mongoose.js";
import {
  fetchMessages,
  saveMessage,
  updateSeenMessage,
} from "./src/controllers/message.js";
import { ConnectedUser, DisconnectedUser } from "./src/controllers/user.js";

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
  socket.on("joinRoom", () => {
    socket.join("connect_chat");
  });

  socket.on("sendMsg", async (message) => {
    message.seen = false;
    const LastMessage = await saveMessage(message);

    socket.to("connect_chat").emit("recieveMsg", LastMessage);
    socket.to("connect_chat").emit("updateUsersDatas", LastMessage);
  });

  socket.on("updateUnreadedMsg", async (messages) => {
    if (messages.length > 0) {
      const last_msg = messages.slice(-1)[0];
      const { userId, recieverId } = last_msg;

      console.log(last_msg);      

      await updateSeenMessage(messages, userId, recieverId);
      socket.to("connect_chat").emit("emptyMsgUnreaded", last_msg);
    }
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
