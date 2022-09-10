const mongoose = require("mongoose");

// create message schema
const MessageSchema = new mongoose.Schema({
  author: {
    type: String,
    required: "Author is required",
  },
  message: {
    type: String,
    required: "Can't send empty message",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = MessageSchema
