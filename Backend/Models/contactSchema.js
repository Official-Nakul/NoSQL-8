const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  image: { type: String },
  number: { type: String, require: true },
  uID: { type: mongoose.Types.ObjectId, ref: "users" },
});

const contact = mongoose.model("contact", contactSchema);
module.exports = contact;
