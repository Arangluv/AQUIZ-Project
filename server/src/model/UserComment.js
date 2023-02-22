import mongoose from "mongoose";

const userCommentSchema = new mongoose.Schema({
  nickname: { type: String, require },
  createAt: { type: Date, default: Date.now },
  content: { type: String, require },
});

const UserComment = mongoose.model("UserComment", userCommentSchema);

export default UserComment;
