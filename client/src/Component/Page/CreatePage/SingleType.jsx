import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../../assets/atom";
const SingleTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuizLabel = styled.label`
  margin-bottom: 1vh;
  font {
    color: ${(props) => props.theme.textColor};
    font-size: 1vw;
    @media screen and (max-width: 767px) {
      font-size: 0.9vh;
    }
  }
`;

const QusetionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Question = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  border-radius: 3px;
  margin-bottom: 1vh;
  background: ${(props) => props.theme.bgColor};
  @media screen and (max-width: 767px) {
    border: 0.2vw solid ${(props) => props.theme.bgColor};
    margin-bottom: 0.8vh;
  }
  input[type="text"] {
    width: 100%;
    padding: 0.6vw 0.8vw;
    border: none;
    border-left: 1px solid rgba(103, 106, 108, 0.7);
    font-size: 1vw;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    &::placeholder {
      color: ${(props) => props.theme.textColor};
    }
    @media screen and (max-width: 767px) {
      border-left: 0.1vw solid rgba(103, 106, 108, 0.9);
      padding: 0.6vh 0.8vh;
      -webkit-appearance: none;
      -webkit-border-radius: 0;
      font-size: 1vh;
      font-family: "Gowun Batang", serif;
    }
  }

  input[type="radio"] {
    appearance: none;
    border-radius: 100%;
    border: 0.1vw solid rgba(103, 106, 108, 0.4);
    background-color: white;
    padding: 0.4vw;
    width: 0.5vw;
    height: 0.5vw;
    margin: 0.5vw;
    @media screen and (max-width: 767px) {
      padding: 0.4vh;
      width: 0.5vh;
      height: 0.5vh;
      margin: 0.5vh;
    }
  }
  input[type="radio"]:checked {
    background-color: rgb(170, 203, 115);
    border: 0.1vw solid rgba(0, 0, 0, 0);
  }
  button {
    position: absolute;
    right: 0em;
    font-size: 1.1rem;
    background-color: white;
    border: 1px solid rgba(245, 80, 80, 0.8);
    color: rgba(245, 80, 80, 0.8);
    padding: 0.25em 0.35em;
    border-radius: 3px;
    margin: 0;
  }
  button:hover {
    background-color: rgba(245, 80, 80, 0.8);
    color: white;
    border: 1px solid white;
  }
`;

const OptionContainer = styled.div`
  margin-bottom: 2vh;
  @media screen and (max-width: 767px) {
    margin-bottom: 1vh;
  }
  #addQuiz_bnt {
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #7286d3;
    background-color: #fffbf6;
    @media screen and (max-width: 767px) {
      border: 0.3vw solid #7286d3;
    }
    font {
      margin-left: 3px;
      color: #7286d3;
      font-size: 1vw;
      @media screen and (max-width: 767px) {
        font-size: 1vh;
      }
    }
    span {
      margin-top: 0;
      color: #7286d3;
      font-size: 1vw;
      padding: 0.6vw 0.4vw;
      border-radius: 3px;
      display: flex;
      align-items: center;
      transition: 0.1s ease-in-out;
      @media screen and (max-width: 767px) {
        font-size: 1vh;
        padding: 0.6vh 0.4vh;
      }
    }
  }
  button:hover {
    background-color: white;
  }
`;
function SingleType({ quizNumber, setQuestion, quizzes }) {
  const [quizForm, setQuizForm] = useState([1, 2]);
  const [questions, setQuestions] = useState([]);
  const isDark = useRecoilValue(isDarkAtom);
  const handleAnswerChange = (event) => {
    if (quizzes[quizNumber - 1] !== undefined) {
      // 사용자가 이미 있는 문제를 수정하려고 한다.
      if (quizzes[quizNumber - 1].questions[event.target.id] === undefined) {
        const newQuestion = {
          number: event.target.id,
          content: event.target.value,
          isCorrect: false,
        };
        quizzes[quizNumber - 1].questions[event.target.id] = newQuestion;
      } else {
        quizzes[quizNumber - 1].questions[event.target.id].content =
          event.target.value;
      }
    } else {
      if (questions[event.target.id] !== undefined) {
        questions[event.target.id].number = event.target.id;
        questions[event.target.id].content = event.target.value;
        setQuestions([...questions]);
      } else {
        const newQuestion = {
          number: event.target.id,
          content: event.target.value,
          isCorrect: false,
        };
        questions[event.target.id] = newQuestion;
        setQuestions([...questions]);
      }
    }
  };
  const handleRadioClick = (event) => {
    if (quizzes[quizNumber - 1] !== undefined) {
      quizzes[quizNumber - 1].questions.forEach(
        (item) => (item.isCorrect = false)
      );
      if (quizzes[quizNumber - 1].questions[event.target.id] === undefined) {
        quizzes[quizNumber - 1].questions[event.target.id] = {
          isCorrect: true,
          number: event.target.id,
        };
      } else {
        quizzes[quizNumber - 1].questions[event.target.id].isCorrect = true;
      }
    } else {
      if (questions[event.target.id] !== undefined) {
        questions.forEach((item) => (item.isCorrect = false));
        questions[event.target.id].isCorrect = true;
        setQuestions([...questions]);
      } else {
        if (questions.length === 0) {
          const newQuestion = {
            number: event.target.id,
            content: "",
            isCorrect: true,
          };
          questions[event.target.id] = newQuestion;
          setQuestions([...questions]);
        } else {
          for (let i = 0; i < questions.length; i++) {
            if (questions[i] === undefined) {
              continue;
            } else {
              questions[i].isCorrect = false;
            }
          }
          const newQuestion = {
            number: event.target.id,
            content: "",
            isCorrect: true,
          };
          questions[event.target.id] = newQuestion;
          setQuestions([...questions]);
        }
      }
    }
  };

  const addAnswer = (event) => {
    event.preventDefault();
    if (quizForm[quizForm.length - 1] === 4) {
      setQuizForm((pre) => [...pre, 3]);
    } else {
      setQuizForm((pre) => [...pre, quizForm[quizForm.length - 1] + 1]);
    }
  };
  const handleDelete = (event) => {
    event.preventDefault();
    const deletedForm = quizForm.filter(
      (item) => item !== Number(event.target.value)
    );
    setQuizForm(deletedForm); // 어떤 행동에 대해서도 고정
    // event.target.value == > 버튼값임
    if (quizzes[quizNumber - 1] !== undefined) {
      quizzes[quizNumber - 1].questions = quizzes[
        quizNumber - 1
      ].questions.filter(
        (item) => Number(item.number) !== Number(event.target.value) - 1
      );
    } else {
      const newQuestions = questions.filter((item) => {
        return Number(item.number) !== Number(event.target.value) - 1;
      });
      setQuestions([...newQuestions]);
    }
  };

  const inputName = "singleQuestion" + String(quizNumber);
  useEffect(() => {
    if (quizNumber === quizzes.length + 1) {
      setQuestion([...questions]);
    }
  }, [questions]);
  return (
    <SingleTypeContainer>
      <QuizLabel htmlFor="#">
        <font>
          정답 설정하기 | 정답을 체크해주세요 <sup>*필수</sup>
        </font>
      </QuizLabel>
      <QusetionContainer>
        {quizForm.map((item, idx) => {
          return (
            <Question key={item} isDark={isDark}>
              <input
                id={idx}
                onClick={handleRadioClick}
                name={inputName}
                type="radio"
              />
              <input
                id={idx}
                type="text"
                onChange={handleAnswerChange}
                placeholder="문제에 대한 정답 및 오답을 입력해주세요"
              />
              {idx > 1 ? (
                <button onClick={handleDelete} value={item}>
                  X
                </button>
              ) : null}
            </Question>
          );
        })}
      </QusetionContainer>
      <OptionContainer>
        {quizForm.length === 4 ? (
          <span>최대 4개까지 만들 수 있습니다.</span>
        ) : (
          <button id="addQuiz_bnt" onClick={addAnswer}>
            <span>
              <FontAwesomeIcon icon={faPlus} />
              <font>정답 추가하기</font>
            </span>
          </button>
        )}
      </OptionContainer>
    </SingleTypeContainer>
  );
}

export default SingleType;
