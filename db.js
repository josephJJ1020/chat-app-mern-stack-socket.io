const { LocalStorage } = require("node-localstorage");
const db = new LocalStorage("data"); // use data folder as our 'database'

class Database {
  constructor() {}

  getMessages = () => {
    // get messages from database
    const messages = db.getItem("messages");
    return JSON.parse(messages);
  };

  addMessage = (msg) => {
    // add message from database
    const messages = this.getMessages();
    db.setItem("messages", JSON.stringify([...messages, msg]));

    return true;
  };
}

module.exports = new Database(); // export instance of Database class
