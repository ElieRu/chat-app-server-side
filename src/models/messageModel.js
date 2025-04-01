import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    recieverId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

export const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
