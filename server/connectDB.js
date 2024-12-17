const mongoose = require('mongoose');

const uri = "mongodb+srv://bagdesameer92:bagdesameer92@cluster0.bf7nw.mongodb.net/";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();
