import { User } from "../models/userModel.js";
import { currentTime } from "../util.js";

export async function DisconnectedUser(email) {
  const response = await User.findOne({
    email: email,
  })
    .updateOne({
      status: currentTime(),
    })
    .exec();

  //   console.log(response);
}

export async function ConnectedUser(email) {
  console.log("conneted");
  const response = await User.findOne({
    email: email,
  })
    .updateOne({
      status: "Online",
    })
    .exec();
  //   console.log(email);
}
