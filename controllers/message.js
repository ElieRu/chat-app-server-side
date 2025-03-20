import { Message } from "../models/messageModel.js";

export async function fetchMessages(req, res, next) {
  const { selected_user } = req.query;

  const response = await Message.find({
    $or: [
      {
        selected_user_sub: selected_user,
      },
      {
        user_sub: selected_user,
      },
    ],
  }).exec();
  
  res.status(200).send(response);
}

export async function saveMessage(message) {
  const myMessage = new Message(message);
  await myMessage.save();
}
