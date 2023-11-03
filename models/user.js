const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

require("dotenv").config();
const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: String },
  password: { type: String, min: 6 },
  name: { type: String },
  avatar: { type: String },
  friends: [
    {
      idUser: { type: String },
    },
  ],
  friendsRequest: [
    {
      idPersionReq: { type: String },
    },
  ],
  token: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("user", user);
