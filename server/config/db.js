const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ameenazzam2013_db_user:Amin%402000@cluster0.zuubxmj.mongodb.net/student_management?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(uri);

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = { connectDB };