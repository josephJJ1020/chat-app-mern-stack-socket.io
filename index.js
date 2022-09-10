const express = require("express");
const app = express(); // instantiate express app
const mongoose = require("mongoose"); // use mongoose instead of MongoDB directly
const controller = require("./controller/controller"); // message storage service that uses mongoose as ORM

require("dotenv").config(); // use for accessing environment variables

// mongoose connection; connect mongoose to MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOOSE_URI);

const http = require("http");
const server = http.createServer(app); // create HTTP server with Express listener

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, methods: ["GET", "POST"] }, // instantiate socket.io server with cors
});

const cors = require("cors"); // use cors for backend-frontend communication

const PORT = parseInt(process.env.SERVER_PORT) || 3000; // get port number from .env

app.use(cors()); // use cors for backend-frontend communication

io.on("connection", async (socket) => {
  // send all messages to newly connected client

  const messages = await controller.getMessages(); // get messages from mongoose
  io.to(socket.id).emit("getMessages", messages);

  socket.on("msg", async (content) => {
    // // when client sends a message

    controller.addMessage(content); // add message to MongoDB with mongoose
    io.sockets.emit("newMsg", content); // emit new message to all clients
  });

  socket.on("disconnect", async () => {});
});

app.get('/xd', (req, res) => {
  res.send('xd')
} )

app.use((req, res, next) => {
  res.send('Page not found')
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
