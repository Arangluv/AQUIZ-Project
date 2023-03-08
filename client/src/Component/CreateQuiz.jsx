import CreateTitle from "./Page/CreatePage/CreateTitle";
import CreateThema from "./Page/CreatePage/CreateThema";
import CreateThumail from "./Page/CreatePage/CreateThumnail";
import CreateProblem from "./Page/CreatePage/CreateProblem";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faCircleXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
const Div = styled.div`
  display: flex;
  justify-content: center;
`;
const QuizPublishContainer = styled.div`
  display: flex;
  border: 0.1vw solid rgba(103, 106, 108, 0.6);
  background-color: #fffbf5;
  border-radius: 5px;
  flex-direction: column;
  padding-top: 2vh;
  padding-bottom: 2vh;
  align-items: center;
  width: 80%;
  margin-top: 1vh;
  @media (max-width: 500px) {
    padding-top: 1vh;
    padding-bottom: 1vh;
    margin-top: 1vh;
    width: 80%;
    border: 0.1vw solid #676a6c;
  }
  h2 {
    font-size: 2vw;
    margin-bottom: 2vh;
    color: #676a6c;
    font-weight: 600;
    span {
      margin-right: 10px;
      color: #ff8b13;
    }
    @media (max-width: 500px) {
      font-size: 1.5vh;
      margin-bottom: 1vh;
    }
  }
  input[type="submit"] {
    width: 65%;
    padding-top: 0.7vw;
    padding-bottom: 0.7vw;
    font-size: 1.6vw;
    border: 1px solid rgb(117, 204, 79);
    border-radius: 5px;
    background-color: white;
    color: rgb(117, 204, 79);
    @media (max-width: 500px) {
      padding-top: 0.7vh;
      padding-bottom: 0.7vh;
    }
  }
  input[type="submit"]:hover {
    background-color: rgba(117, 204, 79, 0.7);
    box-shadow: 0.1rem 0.1rem 0.3rem gray;
    color: white;
  }
`;
const CreateFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1vw;
  padding-bottom: 2vw;
  background-color: rgb(255, 242, 242);
  width: 80%;
  border-radius: 0.8vw;
`;
const ErrorBox = styled.div`
  border: 1px solid #f55050;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 5vw;
  background-color: white;
  border-radius: 3px;
  right: 6vw;
  z-index: 1;
  width: 15%;
  padding: 1.5vw 1vw;
`;
const ErrorContainer = styled.div`
  display: ${({ boxClick }) => (boxClick ? "flex" : "none")};
  flex-direction: column;
  position: relative;
  span {
    display: flex;
    justify-content: center;
    margin-bottom: 1.3vw;
    font-size: 1vw;
    color: rgba(0, 0, 0, 0.8);
  }
  font {
    position: absolute;
    color: #676a6c;
    font-size: 2vw;
    top: -1vw;
    right: 0vw;
    transition: 0.1s ease-in-out;
  }
  font:hover {
    color: #f55050;
  }
  h3 {
    margin-bottom: 0.4vw;
    border: 1px solid #676a6c;
    border-radius: 2px;
    padding: 0.2vw 0.4vw;
    transition: 0.1s ease-in-out;
    a {
      font-size: 1.2vw;
      color: #676a6c;
    }
  }
  h3:hover {
    background-color: #f55050;
    a {
      color: white;
    }
    cursor: pointer;
  }
  h3:nth-child(1) {
    margin-top: 1vw;
  }
`;
const WarningContainer = styled.div`
  display: ${({ boxClick }) => (boxClick ? "none" : "flex")};
  justify-content: space-between;
  .warn-icon {
    display: flex;
    align-items: center;
    font-size: 1.5vw;
    color: #f55050;
  }
  p {
    display: flex;
    flex-direction: column;
    font-size: 1vw;
    color: #f55050;
    font-weight: 600;
    font {
      margin-top: 0.3vw;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;
function CreateQuiz() {
  // get User id and cookies
  const userId = useParams().id;
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  // Key Id Setting
  const [keyId, setKeyId] = useState([]);
  // CreateQuiz Component의 보낼 data setting
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescribe, setQuizDescribe] = useState("");
  const [themaBox, setThemaBox] = useState([]);
  const [thumnailFile, setThumnailFile] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  // User Input Validation
  const [inputValid, setInputValid] = useState([]);
  // CreateProblem Component의 State Set
  const [quizNumber, setQuizNumber] = useState(1); // Quiz id는 QuizNumber로
  const [quizForm, setQuizForm] = useState([]);
  const [quizType, setQuizType] = useState(null);
  const [quizProblemDescribe, setQuizProblemDescribe] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [questions, setQuestion] = useState([]);
  const [commentary, setCommentary] = useState(null);
  // ErrorBox Handling
  const [isErrorBoxClick, setIsErrorBoxClick] = useState(false);
  const mainTite = useRef();
  const quizThema = useRef();
  const quizThumbnail = useRef();
  const quizProblem = useRef([]);
  const URL =
    process.env.NODE_ENV === "production"
      ? "https://api.aquiz.co.kr/"
      : "http://localhost:4001/";

  useEffect(() => {
    const regex = /([0-9a-f]{24})/;
    if (!regex.test(userId)) {
      navigate("/not");
    }
    // token refresh
    fetch(`${URL}api/refresh-token/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then(() => console.log("refresh"))
      .catch((error) => {
        console.log("쿠키를 리프레쉬 하는 과정에서 문제가 발생했습니다.");
        console.log(error);
        alert("로그인 후 이용해주세요");
        window.location.replace("/");
      });
  }, []);

  const addQuiz = (event) => {
    event.preventDefault();
    if (quizzes.length !== 0) {
      if (quizzes.length === quizNumber) {
        setQuizProblemDescribe(null);
        setQuizType(null);
        setImgUrl(null);
        setQuestion(null);
        setCommentary(null);
        setQuizNumber(quizzes.length + 1);
        const id = uuidv4();
        setKeyId((pre) => [...pre, id]);
      } else {
        setQuizzes((pre) => {
          return [
            ...pre,
            {
              id: quizNumber,
              quizProblemDescribe,
              quizType,
              imgUrl,
              questions,
              commentary,
            },
          ];
        });
        const id = uuidv4();
        setKeyId((pre) => [...pre, id]);
        setQuizProblemDescribe(null);
        setQuizType(null);
        setImgUrl(null);
        setQuestion(null);
        setCommentary(null);
        setQuizNumber((pre) => pre + 1);
      }
    } else {
      // QuizNumber === 1
      setQuizzes((pre) => {
        return [
          ...pre,
          {
            id: quizNumber,
            quizProblemDescribe,
            quizType,
            imgUrl,
            questions,
            commentary,
          },
        ];
      });
      setQuizProblemDescribe(null);
      // setType(null);
      setImgUrl(null);
      setQuestion(null);
      setCommentary(null);
      const id = uuidv4();
      setKeyId((pre) => [...pre, id]);
      setQuizNumber((pre) => pre + 1);
    }
  };
  if (userId === "null") {
    alert("로그인 후 이용해주세요");
    window.location.replace("/login");
  }
  const userDataValidation = (quizzes) => {
    const errorMessage = [];
    if (quizTitle === "") {
      errorMessage.push({ mainTitle: "퀴즈 제목 설정" });
    }
    if (quizDescribe === "") {
      errorMessage.push({ subTitle: "퀴즈 소제목 설정" });
    }
    if (themaBox.length === 0) {
      errorMessage.push({ quizThema: "퀴즈 테마 설정" });
    }
    if (!thumnailFile) {
      errorMessage.push({ quizThumbnail: "썸네일 이미지 설정" });
    }
    if (quizzes) {
      for (let i = 0; i < quizzes.length; i++) {
        if (
          quizzes[i].quizProblemDescribe === null ||
          quizzes[i].quizProblemDescribe === ""
        ) {
          errorMessage.push({
            problem: `${i + 1}번 문제 제목 설정`,
          });
        }
        // Type inspect
        if (quizzes[i].quizType === null) {
          errorMessage.push({
            problem: `${i + 1}번 문제 타입 설정`,
          });
          continue;
        }
        // user Type Select but nothing write.
        if (quizzes[i].quizType === "word") {
          if (
            quizzes[i].questions === null ||
            quizzes[i].questions.length === 0
          ) {
            errorMessage.push({ problem: `${i + 1}번 문제 작성` });
            continue;
          }
          // Question Inspect -> in word case, if questions is not null, this part unreachable
        } else {
          console.log(quizzes[i].questions);
          if (
            quizzes[i].questions === null ||
            quizzes[i].questions.length === 0
          ) {
            errorMessage.push({ problem: `${i + 1}번 문제 작성` });
            continue;
          }
          // Question Inspect
          if (quizzes[i].questions.length < 2) {
            errorMessage.push({
              problem: `${i + 1}번 문제 추가 작성`,
            });
            continue;
          }
          // Add Part : Question Content inspect
          let emptyContentCount = 0;
          console.log(quizzes[i].questions);
          quizzes[i].questions.forEach((question) => {
            if (question?.content) {
              if (question.content === "") {
                emptyContentCount++;
              }
            } else {
              emptyContentCount++;
            }
          });
          if (emptyContentCount > 0) {
            errorMessage.push({
              problem: `${i + 1}번 문제 빈 컨텐츠`,
            });
            continue;
          }
          if (quizzes[i].quizType === "single") {
            let singleTypeCount = 0;
            quizzes[i].questions.forEach((question) => {
              if (question.isCorrect === true) {
                singleTypeCount++;
              }
            });
            if (singleTypeCount === 0) {
              errorMessage.push({
                problem: `${i + 1}번 문제 정답 설정`,
              });
            }
          } else {
            // Type -> Multi
            let multiTypeCount = 0;
            quizzes[i].questions.forEach((question) => {
              if (question.isCorrect === true) {
                multiTypeCount++;
              }
            });
            if (multiTypeCount === 0) {
              errorMessage.push({
                problem: `${i + 1}번 문제 정답 추가 설정`,
              });
            }

            if (multiTypeCount === 1) {
              errorMessage.push({
                problem: `${i + 1}번 문제 정답 추가 설정`,
              });
            }
          }
        }
      }
    }
    return errorMessage;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (quizNumber === quizzes.length) {
      const errorMessage = userDataValidation(quizzes);
      if (errorMessage.length === 0) {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("quizTitle", quizTitle);
        formData.append("thumbnailFile", thumnailFile);
        formData.append("quizDescribe", quizDescribe);
        formData.append("themaBox", themaBox);
        formData.append("quizzes", JSON.stringify(quizzes));
        for (let i = 0; i < quizzes.length; i++) {
          if (quizzes[i].imgUrl) {
            formData.append("imageFiles", quizzes[i].imgUrl);
          } else {
            formData.append("imageFiles", null);
          }
        }

        fetch(`${URL}quizzes/create-quiz`, {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("퀴즈를 만드는데 실패했습니다.");
            } else {
              return response.json();
            }
          })
          .then(() => {
            console.log("퀴즈를 잘 만들었습니다 !");
            window.location.replace("/");
          })
          .catch((error) => {
            console.log(error.message); // 퀴즈를 만드는데 실패했다는 문구가 나온다.
            console.log("-----------ERROR-----------");
            console.log(error);
          });
      } else {
        // error 메세지가 있다.
        console.log("에러메세지가 존재!");
        console.log(errorMessage);
        setInputValid([...errorMessage]);
        return;
      }
    } else {
      setQuizzes((pre) => {
        const prevQuizzes = [...pre];
        const newQuizzes = [
          ...pre,
          {
            id: quizNumber,
            quizProblemDescribe,
            quizType,
            imgUrl,
            questions,
            commentary,
          },
        ];
        const errorMessage = userDataValidation(newQuizzes);
        if (errorMessage.length === 0) {
          const formData = new FormData();
          formData.append("userId", userId);
          formData.append("quizTitle", quizTitle);
          formData.append("thumbnailFile", thumnailFile);
          formData.append("quizDescribe", quizDescribe);
          formData.append("themaBox", themaBox);
          formData.append("quizzes", JSON.stringify(newQuizzes));
          for (let i = 0; i < newQuizzes.length; i++) {
            if (newQuizzes[i].imgUrl) {
              formData.append("imageFiles", newQuizzes[i].imgUrl);
            } else {
              formData.append("imageFiles", null);
            }
          }

          fetch(`${URL}quizzes/create-quiz`, {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("퀴즈를 만드는데 실패했습니다.");
              } else {
                return response.json();
              }
            })
            .then(() => {
              console.log("퀴즈를 잘 만들었습니다 !");
              navigate("/");
            })
            .catch((error) => {
              console.log(error.message); // 퀴즈를 만드는데 실패했다는 문구가 나온다.
              console.log("-----------ERROR-----------");
              console.log(error);
            });
        } else {
          console.log("에러 발생!");
          console.log(errorMessage);
          setInputValid([...errorMessage]);
          return prevQuizzes;
        }
      });
    }
  };
  const errorBoxClick = () => {
    setIsErrorBoxClick(!isErrorBoxClick);
    console.log(isErrorBoxClick);
  };
  const handleMainTitleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (mainTite.current) {
      mainTite.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleThemaClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (quizThema.current) {
      quizThema.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleThumbnaulClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (quizThumbnail.current) {
      quizThumbnail.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleQuizProblemClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (quizProblem.current[event.target.dataset.number - 1]) {
      quizProblem.current[event.target.dataset.number - 1].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <Div>
      <CreateFormContainer
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <CreateTitle
          changeTitle={setQuizTitle}
          changeDescribe={setQuizDescribe}
          title={quizTitle}
          describe={quizDescribe}
          mainTite={mainTite}
        />
        <CreateThema
          themaBox={themaBox}
          changeThemaBox={setThemaBox}
          quizThema={quizThema}
        />
        <CreateThumail
          thumnailFile={thumnailFile}
          changeThumnail={setThumnailFile}
          name="thumnailFile"
          quizThumbnail={quizThumbnail}
        />
        <CreateProblem
          changeQuiz={setQuizzes}
          quizzes={quizzes}
          quizNumber={quizNumber}
          setQuizNumber={setQuizNumber}
          quizForm={quizForm}
          setQuizForm={setQuizForm}
          quizType={quizType}
          setQuizType={setQuizType}
          quizDescribe={quizProblemDescribe}
          setQuizDescribe={setQuizProblemDescribe}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          questions={questions}
          setQuestion={setQuestion}
          commentary={commentary}
          setCommentary={setCommentary}
          addQuiz={addQuiz}
          keyId={keyId}
          setKeyId={setKeyId}
          quizProblem={quizProblem}
        />
        <QuizPublishContainer>
          <h2>
            <span>
              <FontAwesomeIcon icon={faUpload} />
            </span>
            퀴즈 공개하기
          </h2>
          <input type="submit" value="퀴즈 공개하기" />
        </QuizPublishContainer>
      </CreateFormContainer>
      {inputValid.length !== 0 ? (
        <ErrorBox>
          <ErrorContainer onClick={errorBoxClick} boxClick={isErrorBoxClick}>
            <span>클릭시 이동합니다.</span>
            <font>
              <FontAwesomeIcon icon={faCircleXmark} />
            </font>
            {inputValid.map((errorMsg, idx) => {
              if (errorMsg?.mainTitle) {
                return (
                  <h3 key={idx}>
                    <a href="#mainTitle" onClick={handleMainTitleClick}>
                      {errorMsg.mainTitle}
                    </a>
                  </h3>
                );
              } else if (errorMsg?.subTitle) {
                return (
                  <h3 key={idx}>
                    <a href="#mainTitle" onClick={handleMainTitleClick}>
                      {errorMsg.subTitle}
                    </a>
                  </h3>
                );
              } else if (errorMsg?.quizThema) {
                return (
                  <h3 key={idx}>
                    <a href="#quizThema" onClick={handleThemaClick}>
                      {errorMsg.quizThema}
                    </a>
                  </h3>
                );
              } else if (errorMsg?.quizThumbnail) {
                return (
                  <h3 key={idx}>
                    <a href="#quizThumbnail" onClick={handleThumbnaulClick}>
                      {errorMsg.quizThumbnail}
                    </a>
                  </h3>
                );
              } else {
                let problemOccurNumber = errorMsg.problem[0];

                return (
                  <h3 key={idx}>
                    <a
                      href={"#" + problemOccurNumber + "-quiz"}
                      onClick={handleQuizProblemClick}
                      data-number={problemOccurNumber}
                    >
                      {errorMsg.problem}
                    </a>
                  </h3>
                );
              }
            })}
          </ErrorContainer>
          <WarningContainer onClick={errorBoxClick} boxClick={isErrorBoxClick}>
            <font className="warn-icon">
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </font>
            <p>
              수정해야 할 항목이 있습니다
              <font>클릭으로 열기</font>
            </p>
          </WarningContainer>
        </ErrorBox>
      ) : null}
    </Div>
  );
}

export default CreateQuiz;
