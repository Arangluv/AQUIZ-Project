import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SolveQuizDetail from "./SolveQuizDetail";
import styled from "styled-components";
import ReactHelmet from "../../ReactHelmet";
import ReactGA from "react-ga";
import URL from "../../../assets/url";
const QuizContainer = styled.div`
  height: 100%;
  display: flex;
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
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  let findQuizzes = null;

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, currentQuizIndex]);
  useEffect(() => {
    const regex = /([0-9a-f]{24})/;
    if (!regex.test(selectedQuizId)) {
      history("/not");
    }
  }, []);
  useEffect(() => {
    fetch(`${URL}quizzes/solve/${selectedQuizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
        pageTitle={"AQUIZ, 퀴즈메이커 - " + " " + quizTitle}
        image={thumnailUrl}
      />
      {quizList[currentQuizIndex]}
    </QuizContainer>
  );
}

export default SolveQuiz;
