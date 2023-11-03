const mongoose = require("mongoose");

async function connection() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/ToDoApp");
    console.log("Connect Successfully");
  } catch (error) {
    console.log("Connect Failure");
  }
}

module.exports = { connection };
