import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const server = process.env.REACT_APP_SERVER;

function App() {
  // socket client
  const socket = io(server);

  // connection status
  const [connected, setConnected] = useState(true);

  // list of all messages from server
  const [messages, setMessages] = useState([]);

  // current message to be sent
  const [msg, setMsg] = useState("");

  // get all messages from db when starting the app
  useEffect(() => {
    try {
      socket.on("getMessages", (msgs) => {
        setMessages(msgs);
      });
    } catch (err) {
      return err;
    }
  }, [socket]);

  // listen for new messages from other clients as they are sent to the server, add new message to messages state
  useEffect(() => {
    socket.on("newMsg", (newMsg) => {
      setMessages([...messages, newMsg]);
    });
  }, [socket, messages]);

  // update message to be sent
  const updateMsg = (content) => {
    setMsg(content);
  };

  // send message with socket.emit(), clear msg state
  const sendMsg = () => {
    socket.emit("msg", msg);
    setMsg("");
  };

  return (
    <div className="App">
      <h1>This is the client for the socket-io Chat App!</h1>
      {connected ? (
        <>
          <div className="messages">
            <h1>Messages</h1>
            {!messages.length ? (
              <h3>No new messages!</h3>
            ) : (
              messages.map((message, index) => {
                return (
                  <div className="message" key={index}>
                    {message}
                  </div>
                );
              })
            )}
          </div>
          <input
            type="text"
            value={msg}
            placeholder="Type here!"
            onChange={(e) => updateMsg(e.target.value)}
          />
          <button onClick={sendMsg}>Submit</button>
        </>
      ) : (
        <>
          {" "}
          <p>Can't connect to server</p>
          <p>{connected.toString()}</p>
        </>
      )}
    </div>
  );
}

export default App;
