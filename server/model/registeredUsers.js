const mongoose = require("mongoose");

const registeredUsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const registeredUsers = mongoose.model("RegisteredUsers", registeredUsersSchema);

module.exports = registeredUsers; 