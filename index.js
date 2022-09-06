const express = require("express");
const app = express(); // instantiate express app"mongodb://localhost:27017"
const MessageDB = require("./services/msgStorage"); // message storage service that uses MongoDB Client

require("dotenv").config();

const msgDB = new MessageDB(process.env.MONGODB_URI); // instantiate message storage service

const http = require("http");
const server = http.createServer(app); // create HTTP server with Express listener

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, methods: ["GET", "POST"] }, // instantiate socket.io server with cors
});

const cors = require("cors"); // use cors for backend-frontend communication

const PORT = parseInt(process.env.SERVER_PORT); // get port number from .env

app.use(cors()); // use cors for backend-frontend communication

io.on("connection", async (socket) => {
  // send all messages to newly connected client
  await msgDB.connect(); // connect to database

  const messages = await msgDB.getMessages().toArray(); // retrieve all messages from database
  io.to(socket.id).emit("getMessages", messages);

  socket.on("msg", async (content) => {
    // when client sends a message
    await msgDB.storeMessage(content); // store message in database
    io.sockets.emit("newMsg", content); // emit new message to all connected sockets
  });

  socket.on("disconnect", async () => {
    // when client disconnects
    try {
      await msgDB.disconnect();
    } catch (err) {
      console.error(err);
    }
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
