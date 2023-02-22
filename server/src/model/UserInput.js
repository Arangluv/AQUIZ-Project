import mongoose from "mongoose";

const userInputSchema = new mongoose.Schema({
  userInputList: [
    { num: { type: Number }, answers: { type: mongoose.Schema.Types.Mixed } },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const UserInput = mongoose.model("UserInput", userInputSchema);

export default UserInput;
