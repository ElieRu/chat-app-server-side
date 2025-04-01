import { isObjectIdOrHexString } from "mongoose";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";

export async function fetchMessages(req, res, next) {
  const { recieveId, userId } = req.query;

  console.log({recieveId, userId});

  const query = [
    {
      '$match': {
        'recieverId': new ObjectId('67eaad8262d1abe6dcc8909f')
      }
    }
  ];

  const response = await Message.$where(
    // query
    {
    recieveId: recieveId,
    // userId: userId
    // $or: [
      // {
        // recieveId: recieveId,
        // userId: userId,
    //   },
    //   {
    //     recieveId: userId,
    //     userId: recieveId,
      },
    // ],
  // }
).exec();

  console.log(response);

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

  // const LastMessage = await Message.find({
  //   $or: [
  //     {
  //       selected_user_sub: message.selected_user_sub,
  //       user_sub: message.user_sub,
  //     },
  //     {
  //       selected_user_sub: message.user_sub,
  //       user_sub: message.selected_user_sub,
  //     },
  //   ],
  // })
  //   .sort({ _id: -1 })
  //   .limit(1)
  //   .exec();

  // return LastMessage[0];
}
