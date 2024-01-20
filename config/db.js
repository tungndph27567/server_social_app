const mongoose = require("mongoose");

async function connection() {
  try {
    await mongoose.connect(
      "mongodb+srv://ductung:ductung@cluster0.nfwkdlr.mongodb.net/socialApp"
    );
    console.log("Connect Successfully");
  } catch (error) {
    console.log("Connect Failure");
  }
}

module.exports = { connection };
