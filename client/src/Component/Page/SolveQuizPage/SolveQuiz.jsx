import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";
import SolveQuizDetail from "./SolveQuizDetail";
import styled from "styled-components";
import ReactHelmet from "../../ReactHelmet";

const QuizContainer = styled.div`
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  margin-top: 1vw;
  @media screen and (max-width: 767px) {
    padding-left: 0px;
    padding-right: 0px;
    margin-top: 0;
  }
`;
function SolveQuiz() {
  const [quizList, setQuizList] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [inputAnswerToUser, setInputAnswerToUser] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescribe, setQuizDescribe] = useState("");
  const [thumnailUrl, setThumnailUrl] = useState("");
  const [isError, setIsError] = useState(null);
  const selectedQuizId = useParams().id;
  const history = useNavigate();
  const [cookies] = useCookies(["token"]);

  let findQuizzes;
  useEffect(() => {
    const regex = /([0-9a-f]{24})/;
    if (!regex.test(selectedQuizId)) {
      history("/not");
    }
  }, []);

  useEffect(() => {
    let getToken = null;
    if (cookies?.token) {
      getToken = cookies.token.token;
    }
    fetch(`http://localhost:4001/quizzes/solve/${selectedQuizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("퀴즈를 불러오는데 오류가 발생했습니다.");
        }
      })
      .then((result) => {
        if (result.inputAnswersToUser) {
          console.log("실행");
          history(`/result/${selectedQuizId}`, {
            state: {
              inputAnswerToUser: null,
              selectedQuizId,
            },
          });
        }
        const { quizTitle, quizDescribe, thumnailUrl } = result.quiz;
        setQuizDescribe(quizDescribe);
        setThumnailUrl(thumnailUrl);
        setQuizTitle(quizTitle);
        const data = {
          quizzes: result.quiz.quizzes,
          view: result.quiz.meta.view,
        };
        return data;
      })
      .then((data) => {
        findQuizzes = data.quizzes;
        const quizLenth = data.quizzes?.length;
        const getQuizList = data.quizzes.map((quiz, idx) => {
          const {
            imgUrl,
            type,
            questions,
            id,
            quizDescribe,
            commetary,
            quizCorrectRate,
          } = quiz;

          return (
            <SolveQuizDetail
              key={id}
              imgUrl={imgUrl}
              quizCorrectRate={
                data.view === 0 ? 0 : quizCorrectRate / data.view
              }
              quizDescribe={quizDescribe}
              type={type}
              questions={questions}
              quizNum={idx}
              quizLenth={quizLenth}
              onClick={handleButtonClick}
              commetary={commetary}
            />
          );
        });
        return getQuizList;
      })
      .then((quizList) => {
        setQuizList(quizList);
      })
      .catch((error) => {
        console.log(error);
        setIsError(error);
      });
  }, []);

  const handleButtonClick = (answer, event) => {
    if (answer === undefined) {
      // client가 답을 하나도 체크안하고 넘겼다.
      alert("하나 이상의 답을 체크하거나 입력해야 합니다 🤣");
      event.preventDefault();
    } else {
      if (answer.answers.length === 0 || answer.answers === "") {
        alert("하나 이상의 답을 체크하거나 입력해야 합니다 🤣");
        event.preventDefault();
      } else {
        if (findQuizzes.length === answer.num + 1) {
          const quizIndex = answer.num;
          inputAnswerToUser[quizIndex] = answer;
          setInputAnswerToUser([...inputAnswerToUser]);
          handleSubmit();
        } else {
          setCurrentQuizIndex((pre) => pre + 1);
          const quizIndex = answer.num;
          inputAnswerToUser[quizIndex] = answer;
          setInputAnswerToUser([...inputAnswerToUser]);
        }
      }
    }
  };
  const handleSubmit = () => {
    history(`/result/${selectedQuizId}`, {
      state: {
        inputAnswerToUser,
        selectedQuizId,
      },
    });
  };
  return isError ? null : (
    <QuizContainer>
      <ReactHelmet
        description={quizDescribe}
        title={quizTitle}
        pageTitle={quizTitle}
        image={thumnailUrl}
      />
      {quizList[currentQuizIndex]}
    </QuizContainer>
  );
}

export default SolveQuiz;
