import mongoose from "mongoose";

const userRequestionSchema = new mongoose.Schema({
  email: { type: String, require },
  reason: { type: String, require },
  content: { type: String, require },
  createAt: { type: Date, default: Date.now },
});

const UserRequestion = mongoose.model("UserRequestion", userRequestionSchema);

export default UserRequestion;
