import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";

import { v4 as uuidv4 } from "uuid"; // used to generate a random ID

const server = process.env.REACT_APP_SERVER; // get server URL from .env

// socket client
const socket = io(server);

function App() {
  // connection status
  const [connected, setConnected] = useState(false);

  // username; will default to Anon followed by process id; set functionality later
  const [username, setUsername] = useState(null);

  // list of all messages from server
  const [messages, setMessages] = useState([]);

  // current message to be sent
  const [msg, setMsg] = useState("");

  // get all messages from db when starting the app
  useEffect(() => {
    // random ID; if there is already an ID in session, use it, else generate new one
    if (sessionStorage.getItem("Id")) {
      setUsername(sessionStorage.getItem("Id"));
    } else {
      const Id = uuidv4().slice(0, 8);
      setUsername(Id);
      sessionStorage.setItem("Id", Id);
    }

    socket.on("connect", () => {
      // set connected = true when socket connects to server
      setConnected(true);
      // socket.emit('newConnect', `Anon${username}`)
    });

    socket.on("getMessages", (msgs) => {
      // get all messages on app start
      setMessages(msgs);
    });

    socket.on("disconnect", () => {
      // set connected = false when socket disonnects from server
      setConnected(false);
    });

    return () => {
      // remove listeners in cleanup in order to prevent multiple event registrations
      socket.off("connect");
      socket.off("getMessages");
      socket.off("disconnect");
    };
  }, []);

  // listen for new messages from other clients as they are sent to the server, add new message to messages state
  useEffect(() => {
    socket.on("newMsg", (newMsg) => {
      setMessages([...messages, newMsg]);
    });

    socket.on('newConnectServer', (newMsg) => {
      setMessages([...messages, newMsg])
      console.log(messages)
    })
  }, [socket, messages]);

  // update message to be sent
  const updateMsg = (content) => {
    setMsg(content);
  };

  // send message with socket.emit(), clear msg state
  const sendMsg = (event) => {
    event.preventDefault();
    if (msg.length) {
      socket.emit("msg", { author: `Anon${username}`, message: msg });
      setMsg("");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Anon Chat</h1>
          <h2>Chat with people anonymously!</h2>
        </header>

        {connected ? (
          <div className="chat">
            <div className="messages">
              {!messages.length ? (
                <h3>No new messages!</h3>
              ) : (
                messages.map((message, index) => {
                  return (
                    <div className="message" key={index}>
                      <b>{message.author === 'server' ? null : `${message.author}:`}</b> {message.message}
                    </div>
                  );
                })
              )}
            </div>
            <form className="chatbox" onSubmit={(e) => sendMsg(e)}>
              <input
                type="text"
                value={msg}
                placeholder="Type here!"
                className="form-control shadow-none"
                onChange={(e) => updateMsg(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        ) : (
          <>
            <p>Can't connect to server</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

/*

SOURCES: 
https://socket.io/how-to/use-with-react-hooks

*/
