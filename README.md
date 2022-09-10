<<<<<<< HEAD
# Anon Chat - Real-time Chat App with MongoDB, Mongoose, Express, React, Node.js, and Socket.io
=======
# Anon Chat
## Real-time Chat App with MongoDB, Express, React, Node.js, and Socket.io
>>>>>>> 4ec604d662c24011a207ba32cdfc6d4026e21f23

Chat with people anonymously in one single group chat. This is a simple blueprint for creating a real-time chat application with the MERN stack.

### About the app

- This application is a real-time chat application that allows users to anonymously send messages into a single group chat; the user can see and send messages in real time
- Uses React and Bootstrap for the frontend, Express, the `http` module, and Socket.io as the backend, Mongoose as ORM, and MongoDB as a storage service
- Generates a random ID for the user with the `uuid` module the first time the user connects
- Uses a custom message storage service that utilizes the MongoDB Client to store data in a MongoDB database server

### Setup

- Install Node.js, MongoDB, and the MongoDB Compass app
- Install all dependencies by running `npm install` on both the root folder and client folder terminal
- Set up environment variables containing your server URLs and port numbers in the root and client folder
- Create and connect to a database with MongoDB Compass to be used for storing messages

### How to use

- Run `node .` or `npm run dev` in a terminal on the root folder to run the backend/server and to initialize the message storage service
- Run `npm start` in a terminal on the client folder to start the frontend

## License

[GPL] (https://choosealicense.com/licenses/gpl-3.0/)
