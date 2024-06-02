const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/prac8ContactManager");

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Database connected");
});
db.on("disconnected", () => {
  console.log("Database disConnected");
});
module.exports = db;
