import Quiz from "../model/Quiz";
import User from "../model/User";
import UserInput from "../model/UserInput";
import UserComment from "../model/UserComment";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/config";
import aws from "aws-sdk";
require("dotenv").config();
aws.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();

export const postQuiz = async (req, res) => {
  try {
    const { userId, quizTitle, quizDescribe, themaBox, quizzes } = req.body;
    const modifiedThembox = themaBox.split(",");
    const thumnailFile = req.files.thumbnailFile;
    const parsedQuizzes = JSON.parse(quizzes);
    const quizFiles = req.files.imageFiles;
    let imgCount = 0;
    const newQuizzes = parsedQuizzes.map((quiz) => {
      let quizImgUrl;
      if (quiz.imgUrl !== null) {
        quizImgUrl = quizFiles[imgCount];
        imgCount++;
      } else {
        quizImgUrl = "";
      }
      return {
        id: quiz.id,
        quizDescribe: quiz.quizProblemDescribe,
        type: quiz.quizType,
        imgUrl: quizImgUrl.key,
        commetary: quiz.commentary,
        questions: quiz.questions.map((item) => {
          if (!item.spacingHint) {
            return {
              number: Number(item.number),
              content: item.content,
              isCorrect: item.isCorrect,
            };
          } else {
            return {
              number: Number(item.number),
              content: item.content,
              isCorrect: item.isCorrect,
              spacingHint: item.spacingHint,
            };
          }
        }),
      };
    });
    const newQuiz = await Quiz.create({
      owner: userId,
      quizTitle,
      quizDescribe,
      thumnailUrl: thumnailFile[0].key,
      quizzes: newQuizzes,
      meta: {
        quizThema: modifiedThembox,
      },
    });
    // 만들어진 퀴즈 아이디를 찾아서, 해당 퀴즈를 만든 유저의 quizzes에 저장해준다.
    const quizId = newQuiz._id;
    const makedUser = await User.findById(userId);
    makedUser.quizzes.push(quizId);
    makedUser.save();

    return res.status(200).json({ newQuiz });
  } catch (error) {
    return res.status(404).json({ errorMessage: "fail to create Quiz", error });
  }
};

export const postEdit = async (req, res) => {
  try {
    const quizId = req.params.id;
    const {
      quizTitle,
      quizDescribe,
      themaBox,
      quizzes,
      imgUrlToRemove,
      originalThumbnailUrl,
    } = req.body;
    const modifiedThembox = themaBox.split(",");
    const parsedQuizzes = JSON.parse(quizzes);
    let thumnailFile;
    if (req.files.thumbnailFile) {
      thumnailFile = originalThumbnailUrl;
      // Delete Thumbnail Url
      const params = {
        Bucket: "aquizbuket",
        Key: thumnailFile,
      };
      try {
        s3.deleteObject(params, function (error, data) {
          if (error) {
            console.log("err: ", error, error.stack);
          } else {
            console.log(data, " 정상 삭제 되었습니다.");
          }
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }

    let imgCount = 0;
    const newQuizzes = parsedQuizzes.map((quiz, idx) => {
      let quizImgUrl;
      if (typeof quiz.imgUrl === "string") {
        quizImgUrl = quiz.imgUrl;
      } else if (quiz.imgUrl === null || quiz.imgUrl === undefined) {
        quizImgUrl = null;
      } else if (typeof quiz.imgUrl === "object") {
        if (req.files.imageFiles) {
          quizImgUrl = req.files.imageFiles[imgCount].key;
          imgCount++;
        }
      } else {
        quizImgUrl = null;
      }
      return {
        id: quiz.id,
        quizDescribe: quiz.quizProblemDescribe,
        type: quiz.quizType,
        imgUrl: quizImgUrl,
        commetary: quiz.commentary,
        quizCorrectRate: quiz.quizCorrectRate,
        questions: quiz.questions.map((item) => {
          if (!item.spacingHint) {
            return {
              number: Number(item.number),
              content: item.content,
              isCorrect: item.isCorrect,
            };
          } else {
            return {
              number: Number(item.number),
              content: item.content,
              isCorrect: item.isCorrect,
              spacingHint: item.spacingHint,
            };
          }
        }),
      };
    });
    if (imgUrlToRemove) {
      if (typeof imgUrlToRemove === "string") {
        const params = {
          Bucket: "aquizbuket",
          Key: imgUrlToRemove,
        };
        try {
          s3.deleteObject(params, function (error, data) {
            if (error) {
              console.log("err: ", error, error.stack);
            } else {
              console.log(data, " 정상 삭제 되었습니다.");
            }
          });
        } catch (err) {
          console.log(err);
          throw err;
        }
      } else {
        imgUrlToRemove.forEach((file) => {
          const params = {
            Bucket: "aquizbuket",
            Key: file,
          };
          try {
            s3.deleteObject(params, function (error, data) {
              if (error) {
                console.log("err: ", error, error.stack);
              } else {
                console.log(data, " 정상 삭제 되었습니다.");
              }
            });
          } catch (err) {
            console.log(err);
            throw err;
          }
        });
      }
    }
    // 업데이트 전 업데이트된 Quiz 아이디를 찾아, isEdit을 true로 바꿔준다.
    const solvedUser = await User.find({ "solvedQuizzes.solvedQuiz": quizId });
    Promise.all(
      solvedUser.map(async (user) => {
        const index = user.solvedQuizzes.findIndex((item) => {
          return item.solvedQuiz.toString() === quizId;
        });
        user.solvedQuizzes[index].isSolvedQuizEdit = true;
        return user.save();
      })
    )
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(
          "퀴즈를 수정하면서 유저정보를 업데이트하는데 실패했습니다."
        );
        console.log(error);
      });
    const findQuiz = await Quiz.findById(quizId);
    if (findQuiz) {
      const { view, correctRate } = findQuiz.meta;
      await Quiz.findByIdAndUpdate(quizId, {
        quizTitle,
        quizDescribe,
        meta: {
          quizThema: modifiedThembox,
          view,
          subView: 0,
          correctRate: 0,
          scoreSummary: 0,
          isEdit: true,
        },
        thumnailUrl: req.files.thumbnailFile
          ? req.files.thumbnailFile[0].key
          : originalThumbnailUrl,
        quizzes: newQuizzes,
      });
      return res
        .status(200)
        .json({ message: "퀴즈를 성공적으로 업데이트 했습니다." });
    }
    return res.status(404).json({ errorMessage: "퀴즈를 찾지 못했습니다." });
  } catch (error) {
    return res
      .status(404)
      .json({ errorMessage: "퀴즈를 업데이트 하는데 실패했습니다." });
  }
};

export const getQuizForId = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if (quiz) {
      return res.status(200).json({ quiz });
    }
    return res
      .status(404)
      .json({ errorMessage: "해당되는 퀴즈를 불러오는데 실패했습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ errorMessage: "퀴즈를 불러오는데 실패했습니다." });
  }
};
export const getQuiz = async (req, res) => {
  try {
    const { page, LIMIT, order, thema, rating, keyword } = req.query;
    if (keyword && rating === undefined) {
      try {
        const quiz = await Quiz.find({
          quizTitle: { $regex: keyword, $options: "i" },
        }).sort({
          "meta.view": order === "solved" ? -1 : 1,
        });
        if (!quiz) {
          return res
            .status(404)
            .json("errorMessage: 해당 제목의 퀴즈를 찾을 수 없습니다.");
        }
        return res.status(200).json(quiz);
      } catch (error) {
        return res
          .status(404)
          .json({ errorMessage: "퀴즈를 불러오는데 실패했습니다." });
      }
    }
    if (keyword && rating) {
      try {
        const quiz = await Quiz.find({
          quizTitle: { $regex: keyword, $options: "i" },
        }).sort({
          "meta.correctRate": rating === "high" ? -1 : 1,
          "meta.view": order === "solved" ? -1 : 1,
        });
        if (!quiz) {
          return res
            .status(404)
            .json("errorMessage: 해당 제목의 퀴즈를 찾을 수 없습니다.");
        }
        return res.status(200).json(quiz);
      } catch (error) {
        return res
          .status(404)
          .json({ errorMessage: "퀴즈를 불러오는데 실패했습니다." });
      }
    }
    if (keyword === undefined && rating === undefined) {
      console.log("이게 실행");
      const quiz =
        thema === undefined
          ? await Quiz.find({})
              .sort(order === "solved" ? { "meta.view": -1 } : { createAt: -1 })
              .skip(parseInt(page * 6))
              .limit(LIMIT)
          : await Quiz.find({ "meta.quizThema": { $in: thema } })
              .sort({
                "meta.view": order === "solved" ? -1 : 1,
              })
              .skip(parseInt(page * 6))
              .limit(LIMIT);
      return res.status(200).json(quiz);
    } else if (keyword === undefined && rating) {
      const quiz =
        thema === undefined
          ? await Quiz.find({})
              .sort(
                order === "solved"
                  ? {
                      "meta.correctRate": rating === "high" ? -1 : 1,
                      "meta.view": -1,
                    }
                  : {
                      "meta.correctRate": rating === "high" ? -1 : 1,
                      createAt: -1,
                    }
              )
              // .sort({
              //   "meta.correctRate": rating === "high" ? -1 : 1,
              //   "meta.view": order === "solved" ? -1 : 1,
              // })
              .skip(parseInt(page * 6))
              .limit(LIMIT)
          : await Quiz.find({ "meta.quizThema": { $in: thema } })
              .sort({
                "meta.correctRate": rating === "high" ? -1 : 1,
                "meta.view": order === "solved" ? -1 : 1,
              })
              .skip(parseInt(page * 6))
              .limit(LIMIT);
      return res.status(200).json(quiz);
    } else {
      return res
        .status(200)
        .json({ message: "퀴즈를 로드하는데 실패했습니다." });
    }
    // try {
    //   const quiz = await Quiz.find({
    //     quizTitle: { $regex: keyword, $options: "i" },
    //   }).sort({
    //     "meta.view": order === "solved" ? -1 : 1,
    //     "meta.correctRate": rating === "high" ? -1 : 1,
    //   });
    //   if (!quiz) {
    //     return res
    //       .status(404)
    //       .json("errorMessage: 해당 제목의 퀴즈를 찾을 수 없습니다.");
    //   }
    //   return res.status(200).json(quiz);
    // } catch (error) {
    //   return res
    //     .status(404)
    //     .json({ errorMessage: "퀴즈를 불러오는데 실패했습니다." });
    // }
  } catch (error) {
    return res
      .status(404)
      .json({ errorMessage: "퀴즈를 받아오는데 실패했습니다." });
  }
};

export const getSolveQuiz = async (req, res) => {
  try {
    const { secretKey } = jwtConfig;
    const { page, limit } = req.query;
    let data = null;
    let token = null;
    let userInformation = null;
    let user = null;
    if (req.cookies?.token) {
      // 쿠키가 있는 경우
      data = req.cookies.token;
      token = data.token;
      userInformation = jwt.verify(token, secretKey);
      user = await User.findOne({ email: userInformation.email });
    }
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId).populate("userComment");
    const userComment = quiz.userComment;
    const isEdit = quiz.meta.isEdit;
    let index = -1;
    if (user) {
      index = user.solvedQuizzes.findIndex(
        (item) => item.solvedQuiz.toString() === quizId
      );
    }
    if (index === -1) {
      // 사용자가 문제를 풀지 않은 경우 및 로그인 하지 않은 유저
      if (quiz) {
        return res.status(200).json({
          quiz,
          username: user?.username,
          userComment: userComment.slice(Number(page), Number(limit)),
          totalComments: userComment.length,
        });
      }
      return res.status(404).json({ errorMessage: "퀴즈를 찾지 못했습니다." });
    } else {
      // 사용자가 문제를 푼 경우
      try {
        const { solvedQuiz, inputAnswers } = user.solvedQuizzes[index];
        // 푼문제의 Quiz Id
        // 사용자가 입력한 정답의 UserInput ID

        const solvedQuizToSearchId = await Quiz.findById(
          solvedQuiz.toString()
        ).populate("userComment");
        if (!isEdit) {
          // 문제가 수정되지 않은 경우
          const inputAnswersToSearchId = await UserInput.findById(
            inputAnswers.toString()
          );
          const userComment = solvedQuizToSearchId.userComment;
          const descComment = userComment.sort(
            (a, b) => new Date(b.createAt) - new Date(a.createAt)
          );
          return res.status(200).json({
            quiz: solvedQuizToSearchId,
            inputAnswersToUser: inputAnswersToSearchId,
            username: user?.username,
            userComment: descComment.slice(Number(page), Number(limit)),
            totalComments: descComment.length,
          });
        } else {
          // 문제가 수정된 경우
          const index = user.solvedQuizzes.findIndex((item) => {
            return item.solvedQuiz.toString() === solvedQuiz.toString();
          });
          if (user.solvedQuizzes[index].isSolvedQuizEdit) {
            // 문제가 수정되었고, 수정된 문제를 사용자가 풀지 않았다.
            await UserInput.findByIdAndDelete(inputAnswers.toString()); // 기존 UserInput을 삭제
            user.solvedQuizzes[index].isSolvedQuizEdit = false;
            const userComment = solvedQuizToSearchId.userComment;
            const descComment = userComment.sort(
              (a, b) => new Date(b.createAt) - new Date(a.createAt)
            );
            await user.save();
            return res.status(200).json({
              quiz: solvedQuizToSearchId,
              username: user?.username,
              userComment: descComment.slice(Number(page), Number(limit)),
              totalComments: descComment.length,
            });
          } else {
            // 문제가 수정되었고, 수정된 문제를 사용자가 풀었다.
            const inputAnswersToSearchId = await UserInput.findById(
              inputAnswers.toString()
            );
            const userComment = solvedQuizToSearchId.userComment;
            const descComment = userComment.sort(
              (a, b) => new Date(b.createAt) - new Date(a.createAt)
            );
            return res.status(200).json({
              quiz: solvedQuizToSearchId,
              inputAnswersToUser: inputAnswersToSearchId,
              username: user?.username,
              userComment: descComment.slice(Number(page), Number(limit)),
              totalComments: descComment.length,
            });
          }
        }
      } catch (error) {
        return res
          .status(404)
          .json({ errorMessage: "이미 푼 문제를 찾는데 실패했습니다." });
      }
    }
  } catch (error) {
    return res.status(404).json({ errorMessage: "Quiz Not Found" });
  }
};

export const getUserRequestQuizzes = async (req, res) => {
  try {
    const { opt } = req.query;
    const data = req.cookies.token;
    const token = data.token;
    const { secretKey } = jwtConfig;
    const userInformation = jwt.verify(token, secretKey);
    if (opt === "maked" || opt === undefined) {
      const userMakedQuiz = await User.findOne({
        email: userInformation.email,
      }).populate("quizzes");
      return res.status(200).json({
        quizzes: userMakedQuiz.quizzes,
        user: { email: userInformation.email, username: data.username },
      });
    } else if (opt === "solved") {
      const userSolvedQuiz = await User.findOne({
        email: userInformation.email,
      }).populate({
        path: "solvedQuizzes.solvedQuiz",
        model: "Quiz",
      });
      return res.status(200).json({
        quizzes: userSolvedQuiz.solvedQuizzes,
        user: { email: userInformation.email, username: data.username },
      });
    } else {
      return res
        .status(404)
        .json({ errorMessage: "올바르지 않은 요청입니다." });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ errorMessage: "퀴즈를 불러오는데 오류가 발생했습니다." });
  }
};

export const postDelete = async (req, res) => {
  // Use Token, varify user
  try {
    const deletedQuizId = req.params.id;
    const token = req.cookies.token.token;
    const { secretKey } = jwtConfig;
    const userInformation = jwt.verify(token, secretKey);
    const user = await User.findOne({ email: userInformation.email });
    // Admin의 경우
    if (req.query?.admin === process.env.DELETE_VERIFY) {
      try {
        const deleteQuiz = await Quiz.findById(deletedQuizId).populate(
          "userComment"
        );
        const userComment = deleteQuiz.userComment;
        Promise.all(
          userComment.forEach(async (comment) => {
            if (comment) {
              await UserComment.findByIdAndDelete(comment._id.toString());
            }
          })
        )
          .then(() => {
            return;
          })
          .catch((error) => {
            console.log("User Comment를 삭제하는데 오류가 발생했습니다.");
          });

        const solvedUsers = await User.find({
          "solvedQuizzes.solvedQuiz": deletedQuizId,
        });

        Promise.all(
          solvedUsers.map(async (user) => {
            await UserInput.deleteOne({ owner: user._id });
            user.solvedQuizzes = user.solvedQuizzes.filter(
              (quiz) => quiz.solvedQuiz.toString() !== deletedQuizId
            );
            return user.save();
          })
        )
          .then(() => {
            return;
          })
          .catch((error) => {
            console.log("저장하는데 오류가 발생했습니다.");
          });
        const quiz = await Quiz.findOne({ _id: deletedQuizId });
        const thumbnailUrl = quiz.thumnailUrl;
        const quizImgUrls = quiz.quizzes.map((quiz) => {
          if (quiz.imgUrl) {
            return quiz.imgUrl;
          } else {
            return null;
          }
        });
        // Delete Thumbnail Url
        const params = {
          Bucket: "aquizbuket",
          Key: thumbnailUrl,
        };
        try {
          s3.deleteObject(params, function (error, data) {
            if (error) {
              console.log("err: ", error, error.stack);
            } else {
              console.log(data, " 정상 삭제 되었습니다.");
            }
          });
        } catch (err) {
          console.log(err);
          return res
            .status(404)
            .json({ errorMessage: "퀴즈를 삭제하는데 오류가 발생했습니다." });
        }

        // Delete Quiz Image
        if (quizImgUrls) {
          try {
            quizImgUrls.forEach((file) => {
              if (file) {
                const params = {
                  Bucket: "aquizbuket",
                  Key: file,
                };
                s3.deleteObject(params, (error, data) => {
                  if (error) {
                    console.log("err: ", error, error.stack);
                  } else {
                    console.log(data, " 정상 삭제 되었습니다.");
                  }
                });
              }
            });
          } catch (error) {
            return res.status(404).json({
              errorMessage: "퀴즈를 삭제하는데 문제가 발생했습니다.",
            });
          }
        }
        await Quiz.deleteOne({ _id: deletedQuizId });
        return res
          .status(200)
          .json({ message: "성공적으로 퀴즈를 삭제했습니다." });
      } catch (error) {
        return res
          .status(404)
          .json({ errorMessage: "퀴즈를 삭제하는데 문제가 발생했습니다." });
      }
    }
    // 일반 유저인 경우
    if (!user) {
      return res
        .status(404)
        .json({ errorMessage: "요청을 처리하는데 오류가 발생했습니다." });
    }
    const quizVaild = user.quizzes.find((quiz) => {
      return quiz.toString() === deletedQuizId;
    });

    if (!quizVaild) {
      // 사용자가 문제를 풀지 않은 경우
      return res
        .status(404)
        .json({ errorMessage: "올바르지 않은 요청입니다." });
    }
    // Delete UserComment
    const deleteQuiz = await Quiz.findById(deletedQuizId).populate(
      "userComment"
    );
    const userComment = deleteQuiz.userComment;
    Promise.all(
      userComment.forEach(async (comment) => {
        if (comment) {
          await UserComment.findByIdAndDelete(comment._id.toString());
        }
      })
    )
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log("User Comment를 삭제하는데 오류가 발생했습니다.");
      });
    const makedUser = await User.findOne({ quizzes: deletedQuizId });
    const solvedUsers = await User.find({
      "solvedQuizzes.solvedQuiz": deletedQuizId,
    });
    makedUser.quizzes.pull(deletedQuizId); // 퀴즈를 만든 사용자의 quizzes 배열애서 deletedQuizId를 제거한다. 알아서 toString화 해주는것 같다.

    const isMakeUserSolveThisQuiz = makedUser.solvedQuizzes.find(
      (quiz) => quiz.solvedQuiz.toString() === deletedQuizId
    );
    if (isMakeUserSolveThisQuiz) {
      // 문제를 풀은 경우
      await UserInput.deleteOne({ owner: makedUser._id });
      makedUser.solvedQuizzes = makedUser.solvedQuizzes.filter(
        (solvedQuiz) =>
          solvedQuiz.solvedQuiz.toString() !== deletedQuizId.toString()
      );
      await makedUser.save();
    }
    // 풀던말던 pull 했으면 저장해야한다.
    await makedUser.save();
    // SolvedUsers Part
    Promise.all(
      solvedUsers.map(async (user) => {
        await UserInput.deleteOne({ owner: user._id });
        user.solvedQuizzes = user.solvedQuizzes.filter(
          (quiz) => quiz.solvedQuiz.toString() !== deletedQuizId
        );
        return user.save();
      })
    )
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log("저장하는데 오류가 발생했습니다.");
      });
    const quiz = await Quiz.findOne({ _id: deletedQuizId });
    const thumbnailUrl = quiz.thumnailUrl;
    const quizImgUrls = quiz.quizzes.map((quiz) => {
      if (quiz.imgUrl) {
        return quiz.imgUrl;
      } else {
        return null;
      }
    });
    // Delete Thumbnail Url
    const params = {
      Bucket: "aquizbuket",
      Key: thumbnailUrl,
    };
    try {
      s3.deleteObject(params, function (error, data) {
        if (error) {
          console.log("err: ", error, error.stack);
        } else {
          console.log(data, " 정상 삭제 되었습니다.");
        }
      });
    } catch (err) {
      console.log(err);
      return res
        .status(404)
        .json({ errorMessage: "퀴즈를 삭제하는데 오류가 발생했습니다." });
    }

    // Delete Quiz Image
    if (quizImgUrls) {
      try {
        quizImgUrls.forEach((file) => {
          if (file) {
            const params = {
              Bucket: "aquizbuket",
              Key: file,
            };
            s3.deleteObject(params, (error, data) => {
              if (error) {
                console.log("err: ", error, error.stack);
              } else {
                console.log(data, " 정상 삭제 되었습니다.");
              }
            });
          }
        });
      } catch (error) {
        return res
          .status(404)
          .json({ errorMessage: "퀴즈를 삭제하는데 문제가 발생했습니다." });
      }
    }
    await Quiz.deleteOne({ _id: deletedQuizId });
    return res.status(200).json({ message: "성공적으로 퀴즈를 삭제했습니다." });
  } catch (error) {
    console.log("퀴즈를 삭제하는데 오류가 발생했습니다.");
    return res
      .status(404)
      .json({ errorMessage: "퀴즈를 삭제하는데 문제가 발생했습니다." });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, content } = req.body;
    const newUserComment = await UserComment.create({ nickname, content });
    const findQuiz = await Quiz.findById(id);
    findQuiz.userComment.push(newUserComment._id);
    await findQuiz.save();
    const returnForQuiz = await Quiz.findById(id).populate("userComment");
    const userComment = returnForQuiz.userComment.sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    return res.status(200).json({
      message: "코멘트 저장에 성공했습니다.",
      userComment: userComment.slice(0, 10),
    });
  } catch (error) {
    return res
      .status(404)
      .json({ errorMessage: "코멘트를 저장하는데 실패했습니다." });
  }
};

export const getComment = async (req, res) => {
  try {
    const quizId = req.params.id;
    const { page, limit } = req.query;
    const findQuiz = await Quiz.findById(quizId).populate("userComment");
    const userComment = findQuiz.userComment.sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    return res.status(200).json({
      userComment: userComment.splice(0, (Number(page) + 1) * Number(limit)),
    });
  } catch (error) {
    return res
      .status(200)
      .json({ errorMessage: "댓글을 불러오는데 실패했습니다." });
  }
};

export const allQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.find({});
    return res.status(200).json({ data: quiz });
  } catch (error) {
    return res
      .status(404)
      .json({ errorMsg: "모든 퀴즈를 제공하는데 오류가 발생했습니다." });
  }
};
