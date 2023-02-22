import User from "../model/User";
import Quiz from "../model/Quiz";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/config";
import UserInput from "../model/UserInput";

export const getJoin = (req, res, next) => {
  return res.json({ pageTitle: "회원가입 하기" });
};

export const postJoin = async (req, res, next) => {
  const { email, username, passward1, passward2 } = req.body;
  const { secretKey, options } = jwtConfig;
  let isJoinSucceed = false;
  if (passward1 !== passward2) {
    return res
      .status(404)
      .json({ isJoinSucceed, errorMessage: "비밀번호가 맞지 않습니다." });
  }
  const usernameExist = await User.exists({ username });
  if (usernameExist) {
    return res
      .status(404)
      .json({ isJoinSucceed, errorMessage: "이미 사용중인 닉네임입니다." });
  }
  const emailExist = await User.exists({ email });
  if (emailExist) {
    return res
      .status(404)
      .json({ isJoinSucceed, errorMessage: "이미 사용중인 이메일 입니다." });
  }

  try {
    const payload = {
      email,
      username,
    };
    const token = jwt.sign(payload, secretKey, options);
    await User.create({
      username,
      email,
      password: passward1,
    });
    const user = await User.findOne({ username });
    return res.status(200).json({ username, isJoinSucceed: true, token });
  } catch (error) {
    return res
      .status(404)
      .json({ errorMessage: "회원가입을 하는데 문제가 발생했습니다." });
  }
};

export const postLogin = async (req, res) => {
  const { secretKey, options } = jwtConfig;
  const { email, password } = req.body;
  const user = await User.findOne({ email, socialOnly: false });
  if (!user) {
    // 유저를 찾지 못한 경우
    return res
      .status(404)
      .json({ errorMessage: "이메일 혹은 비밀번호가 맞지 않습니다" });
  }
  const passwordOk = await bcrypt.compare(password, user.password);

  if (!passwordOk) {
    return res
      .status(404)
      .json({ errorMessage: "이메일 혹은 비밀번호가 맞지 않습니다" });
  }

  const payload = {
    email,
    userName: user.name,
  };
  const token = jwt.sign(payload, secretKey, options);
  return res.status(200).json({ isLoggin: true, token, user });
  // const token = jwt.sign(payload, secretKey, options);
};

export const userLoginValid = async (req, res) => {
  const data = JSON.parse(req.cookies.token);
  const token = data.token;

  const { secretKey } = jwtConfig;
  try {
    const userInformation = jwt.verify(token, secretKey);
    const targetEmail = userInformation.email;

    const findUser = await User.findOne({ email: targetEmail });
    const { email, username, _id, quizzes } = findUser;
    if (!findUser) {
      throw new Error("사용자가 존재하지 않습니다.");
    }
    return res.status(200).json({ email, username, _id, quizzes });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

export const addQuiz = async (req, res) => {
  const { quizId, username, inputAnswerToUser } = req.body;
  try {
    if (inputAnswerToUser.length === 0) {
      return res.status(200).json({ message: "이미 문제를 풀었습니다." });
    }
    let user = null;
    let userInput = null;
    if (username) {
      user = await User.findOne({ username });
      userInput = await UserInput.create({
        owner: user._id,
        userInputList: inputAnswerToUser,
      });
    }
    if (!user) {
      try {
        const findQuiz = await Quiz.findById(quizId);
        if (findQuiz) {
          const { quizzes } = findQuiz;
          let correctScore = 0;
          const numberOfQuizzes = inputAnswerToUser.length;
          quizzes.forEach((quiz, idx) => {
            const targetQuestion = quiz.questions;
            const userInput = inputAnswerToUser[idx];
            if (quiz.type === "single") {
              if (targetQuestion[userInput.answers[0]].isCorrect) {
                correctScore++;
                quiz.quizCorrectRate++;
              }
            } else if (quiz.type === "multi") {
              // quiz type이 multi인 경우
              const quizCorrectNumbers = [];
              targetQuestion.forEach((question) => {
                if (question.isCorrect) {
                  quizCorrectNumbers.push(question.number);
                }
              });
              if (userInput.answers.length === quizCorrectNumbers.length) {
                let isCorrectCheck = true;
                userInput.answers.forEach((input) => {
                  if (!quizCorrectNumbers.includes(input)) {
                    isCorrectCheck = false;
                  }
                });
                if (isCorrectCheck) {
                  correctScore++;
                  quiz.quizCorrectRate++;
                }
              }
            } else {
              // quiz type이 word인 경우
              const quizCorrectContent = targetQuestion[0].isCorrect;
              if (userInput.answers === quizCorrectContent) {
                correctScore++;
                quiz.quizCorrectRate++;
              }
            }
          });
          findQuiz.meta.view += 1;
          findQuiz.meta.scoreSummary += (correctScore / numberOfQuizzes) * 100;
          findQuiz.meta.correctRate =
            findQuiz.meta.scoreSummary / findQuiz.meta.view;
          await findQuiz.save();
        }
        return res.status(200).json({ message: "add ok for unknown user" });
      } catch (error) {
        return res.status(404).json({
          errorMessage:
            "로그인하지않은 유저의 퀴즈 정보를 저장하는데 오류가 발생했습니다.",
        });
      }
    }

    // 유저가 있는 경우
    const index = user.solvedQuizzes.findIndex(
      (item) => item.solvedQuiz.toString() === quizId
    );
    if (index === -1) {
      const newIdObj = {
        solvedQuiz: quizId,
        isSolvedQuizEdit: false,
        inputAnswers: userInput._id,
      };
      user.solvedQuizzes.push(newIdObj);
      const numberOfQuizzes = inputAnswerToUser.length;
      await user.save();
      const findQuiz = await Quiz.findById(quizId);
      if (findQuiz) {
        const { quizzes } = findQuiz;
        let correctScore = 0;
        quizzes.forEach((quiz, idx) => {
          const targetQuestion = quiz.questions;
          const userInput = inputAnswerToUser[idx];
          if (quiz.type === "single") {
            // quiz type이 single인 경우
            if (targetQuestion[userInput.answers[0]].isCorrect) {
              correctScore++;
              quiz.quizCorrectRate++;
            }
          } else if (quiz.type === "multi") {
            // quiz type이 multi인 경우
            const quizCorrectNumbers = [];
            targetQuestion.forEach((question) => {
              if (question.isCorrect) {
                quizCorrectNumbers.push(question.number);
              }
            });
            if (userInput.answers.length === quizCorrectNumbers.length) {
              let isCorrectCheck = true;
              userInput.answers.forEach((input) => {
                if (!quizCorrectNumbers.includes(input)) {
                  isCorrectCheck = false;
                }
              });
              if (isCorrectCheck) {
                correctScore++;
                quiz.quizCorrectRate++;
              }
            }
          } else {
            // quiz type이 word인 경우
            const quizCorrectContent = targetQuestion[0].isCorrect;
            if (userInput.answers === quizCorrectContent) {
              correctScore++;
              quiz.quizCorrectRate++;
            }
          }
        });
        findQuiz.meta.view += 1;
        findQuiz.meta.scoreSummary += (correctScore / numberOfQuizzes) * 100;
        findQuiz.meta.correctRate =
          findQuiz.meta.scoreSummary / findQuiz.meta.view;
        await findQuiz.save();
      }
      return res.status(200).json({ message: "add ok" });
    } else if (index >= 0 && inputAnswerToUser) {
      const newIdObj = {
        solvedQuiz: quizId,
        isSolvedQuizEdit: false,
        inputAnswers: userInput._id,
      };
      user.solvedQuizzes.splice(index, 1);
      user.solvedQuizzes.push(newIdObj);
      const numberOfQuizzes = inputAnswerToUser.length;
      await user.save();
      const findQuiz = await Quiz.findById(quizId);
      if (findQuiz) {
        const { quizzes } = findQuiz;
        let correctScore = 0;
        quizzes.forEach((quiz, idx) => {
          const targetQuestion = quiz.questions;
          const userInput = inputAnswerToUser[idx];
          if (quiz.type === "single") {
            // quiz type이 single인 경우
            if (targetQuestion[userInput.answers[0]].isCorrect) {
              correctScore++;
              quiz.quizCorrectRate++;
            }
          } else if (quiz.type === "multi") {
            // quiz type이 multi인 경우
            const quizCorrectNumbers = [];
            targetQuestion.forEach((question) => {
              if (question.isCorrect) {
                quizCorrectNumbers.push(question.number);
              }
            });
            if (userInput.answers.length === quizCorrectNumbers.length) {
              let isCorrectCheck = true;
              userInput.answers.forEach((input) => {
                if (!quizCorrectNumbers.includes(input)) {
                  isCorrectCheck = false;
                }
              });
              if (isCorrectCheck) {
                correctScore++;
                quiz.quizCorrectRate++;
              }
            }
          } else {
            // quiz type이 word인 경우
            const quizCorrectContent = targetQuestion[0].isCorrect;
            if (userInput.answers === quizCorrectContent) {
              correctScore++;
              quiz.quizCorrectRate++;
            }
          }
        });
        findQuiz.meta.view += 1;
        findQuiz.meta.scoreSummary += (correctScore / numberOfQuizzes) * 100;
        findQuiz.meta.correctRate =
          findQuiz.meta.scoreSummary / findQuiz.meta.view;
        await findQuiz.save();
      }
      return res.status(200).json({ message: "add ok" });
    } else {
      return res.status(200).json({ message: "이미 문제를 풀었습니다." });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ errorMessage: "푼 문제를 저장하는데 오류가 발생했습니다." });
  }
};

export const getUserInfo = (req, res) => {
  try {
    const { token, username } = JSON.parse(req.cookies.token);
    const { secretKey } = jwtConfig;
    const userInformation = jwt.verify(token, secretKey);
    const email = userInformation.email;
    return res.status(200).json({ username, email });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "사용자 정보를 변경하는데 실패했습ㄴ디ㅏ." });
  }
};

export const postEdit = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errorMessage: "유저를 찾지 못했습니다." });
    }
    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res
        .status(404)
        .json({ errorMessage: "비밀번호가 맞지 않습니다." });
    }

    await User.findOneAndUpdate(
      { email },
      {
        username,
      }
    );
    return res.status(200).json({ username, message: "ok" });
  } catch (error) {
    res
      .status(404)
      .json({ errorMessage: "유저 정보를 바꾸는데 실패했습니다." });
  }
};
