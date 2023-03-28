import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizTitle: { type: String, required: true },
  thumnailUrl: { type: String },
  quizDescribe: { type: String, required: true, trim: true },
  createAt: { type: Date, default: Date.now },
  quizzes: [
    {
      id: { type: Number, required: true },
      quizDescribe: { type: String, required: true },
      imgUrl: { type: String },
      commetary: { type: String },
      quizCorrectRate: { type: Number, default: 0 },
      type: { type: String, required: true, trim: true },
      questions: [
        {
          number: { type: Number, required: true },
          content: { type: String, required: true },
          isCorrect: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
            trim: true,
          },
          spacingHint: { type: String },
        },
      ],
    },
  ],
  meta: {
    view: { type: Number, default: 0 },
    subView: { type: Number, default: 0 },
    quizThema: [{ type: String, required: true }],
    correctRate: { type: Number, default: 0 },
    scoreSummary: { type: Number, default: 0 },
    isEdit: { type: Boolean, default: false },
  },
  userComment: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserComment" }],
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
