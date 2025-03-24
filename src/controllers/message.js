import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";

export async function fetchMessages(req, res, next) {
  const { user_sub, selected_user } = req.query;

  const response = await Message.find({
    $or: [
      {
        selected_user_sub: selected_user,
        user_sub: user_sub,
      },
      {
        selected_user_sub: user_sub,
        user_sub: selected_user,
      },
    ],
  }).exec();

  res.status(200).send(response);
}

export async function saveMessage(message) {
  const myMessage = new Message(message);

  await User.findOne({
    sub: message.selected_user_sub,
  })
    .updateOne({
      last_message: message.content,
    })
    .exec();

  await myMessage.save();

  const LastMessage = await Message.find({
    $or: [
      {
        selected_user_sub: message.selected_user_sub,
        user_sub: message.user_sub,
      },
      {
        selected_user_sub: message.user_sub,
        user_sub: message.selected_user_sub,
      },
    ],
  })
    .sort({ _id: -1 })
    .limit(1)
    .exec();

  return LastMessage[0];
}
