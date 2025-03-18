import { Message } from "../models/messages.js";

export async function fetchMessages(roomName) {
  const req1 = await Message.find({
    $or: [
      {
        selected_user_sub: roomName.selected_user,
      },
      {
        user_sub: roomName.selected_user,
      },
    ],
  }).exec();

  //   console.log(roomName);

  console.log(req1.length);

  return req1;
}

export async function saveMessage(message) {
  const myMessage = new Message(message);
  await myMessage.save();
}
