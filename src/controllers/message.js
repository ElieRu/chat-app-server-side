import { isObjectIdOrHexString } from "mongoose";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";

export async function fetchMessages(req, res, next) {
  const { recieverId, userId } = req.query;

  const response = await Message.find({
    $or: [
      {
        recieverId: recieverId,
        userId: userId,
      },
      {
        recieverId: userId,
        userId: recieverId,
      },
    ],
  }).exec();

  res.status(200).send(response);
}

export async function saveMessage(message) {
  const myMessage = new Message(message);

  // await User.findOne({
  //   sub: message.selected_user_sub,
  // })
  //   .updateOne({
  //     last_message: message.content,
  //   })
  //   .exec();
  await myMessage.save();

  const LastMessage = await Message.find({
    $or: [
      {
        recieverId: message.recieverId,
        userId: message.userId,
      },
      {
        recieverId: message.userId,
        userId: message.recieverId,
      },
    ],
  })
    .sort({ _id: -1 })
    .limit(1)
    .exec();

  return LastMessage[0];
}
