const mongoose = require("mongoose");
const MessageSchema = require("../models/Message");

const Message = mongoose.model("Message", MessageSchema); // make new Message db model from MessageSchema

const controller = {
  addMessage: async (data) => {
    // add message
    let newMessage = new Message(data);

    await newMessage.save();
  },
  getMessages: async () => {
    // returns all messages
    return await Message.find({}).then((data) => data);
  },
};

module.exports = controller;
