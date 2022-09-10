# Anon Chat
## Real-time Chat App with MongoDB, Mongoose, Express, React, Node.js, and Socket.io

=======

Chat with people anonymously in one single group chat. This is a simple blueprint for creating a real-time chat application with the MERN stack.

This is the server-side code for Anon Chat @ https://josephjj1020.github.io/anon-chat/
### About the app

- This application is a real-time chat application that allows users to anonymously send messages into a single group chat; the user can see and send messages in real time
- Uses React and Bootstrap for the frontend, Express, the http module, and Socket.io as the backend, Mongoose as ORM, and MongoDB as a storage service
- Generates a random ID for the user with the uuid module the first time the user connects
- Uses Mongoose to add and get items from the Atlas database

### Setup

- Install Node.js, MongoDB, Mongoose, and Socket.io
- Install all dependencies by running `npm install` on the root folder
- Set up environment variables containing your server URLs and port numbers in the root folder
- Create an account for MongoDB Atlas to use as the database; connect Atlas to Mongoose and MongoDB compass

### How to use

- Run `npm start` or `npm run dev` in a terminal on the root folder to run the backend/server

## License

[GPL] (https://choosealicense.com/licenses/gpl-3.0/)
