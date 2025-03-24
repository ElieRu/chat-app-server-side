import { User } from "../models/userModel.js";
import { currentTime } from "../../util.js";

export async function DisconnectedUser(email) {
  const response = await User.findOne({
    email: email,
  })
    .updateOne({
      status: currentTime(),
    })
    .exec();
}

export async function ConnectedUser(email) {
  const response = await User.findOne({
    email: email,
  })
    .updateOne({
      status: "online",
    })
    .exec();
  //   console.log(email);
}
