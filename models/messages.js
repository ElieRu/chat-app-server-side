import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    user_sub: {
      type: String,
    },
    selected_user_sub: {
      type: String,
    },
    picture: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
