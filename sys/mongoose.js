import mongoose from "mongoose";

export async function db() {
  try {
    await mongoose.connect("mongodb://localhost:27017/real-time-chat-application");
    // console.log("DB connected");
  } catch (error) {
    // console.log("DB not connected");    
  }
}
