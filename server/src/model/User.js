import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    socialOnly: { type: Boolean, default: false },
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    solvedQuizzes: [
      {
        solvedQuiz: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
        },
        isSolvedQuizEdit: { type: Boolean, default: false },
        inputAnswers: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserInput",
        },
      },
    ],
  },
  { versionKey: false }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
