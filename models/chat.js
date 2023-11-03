const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chat = new Schema({
  senderId: { type: String },
  receiverId: { type: String },
  avatarSender: { type: String },
  avatarReceiver: { type: String },
  nameSender: { type: String },
  nameReceiver: { type: String },
  date: { type: String },
  statusReceiver: { type: String },
  message: [
    {
      content: { type: String },
      idUser: { type: String },
      date: { type: String },
    },
  ],
});
module.exports = mongoose.model("chat", chat);
