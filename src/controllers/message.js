import { Message } from "../models/messageModel.js";

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

export async function updateSeenMessage(messages, userId, recieverId) {
  await Message.updateMany(
    {
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
      seen: false,
    },
    { $set: { seen: true } }
  );
  console.log("updated...");
}
