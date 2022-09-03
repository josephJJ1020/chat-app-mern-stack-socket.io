const express = require("express");
const app = express(); // instantiate express app
const db = require("./db"); // sample database with node-localstorage

require("dotenv").config();

const http = require("http");
const server = http.createServer(app); // create HTTP server with Express listener

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, methods: ["GET", "POST"] }, // instantiate socket.io server with cors
});

const cors = require("cors"); // use cors for backend-frontend communication

const PORT = parseInt(process.env.SERVER_PORT);

app.use(cors()); // use cors for backend-frontend communication

io.on("connection", (socket) => {
  // send all messages to newly connected client
  const messages = db.getMessages();
  io.to(socket.id).emit("getMessages", messages);

  socket.on("msg", (content) => {
    // when client sends a message
    db.addMessage(content); // add message to database
    io.sockets.emit("newMsg", content); // emit new message to all connected sockets
  });

  socket.on("disconnect", () => {
    // when client disconnects
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
