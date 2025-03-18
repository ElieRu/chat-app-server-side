import { Message } from "../models.js";

export function fetchMessages() {
    console.log('gos');    
}

export async function saveMessage(message) {
    const myMessage = new Message(message);
    // console.log(myMessage);
    
    await myMessage.save();
}


