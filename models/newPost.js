const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newPost = new Schema({
  idUser: { type: String },
  content: { type: String },
  image: { type: String },
  nameUser: { type: String },
  date: { type: String },
  like: [
    {
      idUserLike: { type: String },
    },
  ],
  comment: [
    {
      idUserCmt: { type: String },
      contentCmt: { type: String },
      name: { type: String },
      avatar: { type: String },
      date: { type: String },
    },
  ],
});

module.exports = mongoose.model("newPost", newPost);
