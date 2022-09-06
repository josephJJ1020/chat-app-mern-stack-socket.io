const { MongoClient } = require("mongodb");

class MessageDB {
  constructor(url) {
    this.url = url;
    this.client = null;
    this.collections = null;
  }

  async connect() {
    const mongoClient = new MongoClient(this.url);
    this.client = await mongoClient.connect();
    this.collections = this.client.db("messages").collection("messages");
  }

  storeMessage(data) {
    return this.collections.insertOne({
      author: data.author,
      message: data.message,
    });
  }

  getMessages() {
    return this.collections.find({});
  }

  async disconnect() {
    return await this.client.close()
  }
}

module.exports = MessageDB;
