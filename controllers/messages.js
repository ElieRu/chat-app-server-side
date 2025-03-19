import { Message } from "../models/messages.js";

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
  
  console.log(response);  

  res.status(200).send(response);
}

export async function saveMessage(message) {
  const myMessage = new Message(message);
  await myMessage.save();
}
