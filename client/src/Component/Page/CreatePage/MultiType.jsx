import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const MultiTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const QuizLabel = styled.label`
  margin-bottom: 1vh;
  font {
    color: rgba(0, 0, 0, 0.8);
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
  border: 1px solid rgba(103, 106, 108, 0.7);
  display: flex;
  align-items: center;
  border-radius: 3px;
  margin-bottom: 1vh;
  background: rgba(255, 242, 242, 0.8);
  @media screen and (max-width: 767px) {
    border: 0.2vw solid rgba(103, 106, 108, 0.7);
    margin-bottom: 0.8vh;
  }
  input[type="text"] {
    width: 100%;
    padding: 0.6vw 0.8vw;
    border: none;
    border-left: 1px solid rgba(103, 106, 108, 0.7);
    font-size: 1vw;
    color: rgba(0, 0, 0, 0.8);
    @media screen and (max-width: 767px) {
      border-left: 0.1vw solid rgba(103, 106, 108, 0.9);
      padding: 0.6vh 0.8vh;
      -webkit-appearance: none;
      -webkit-border-radius: 0;
      font-size: 1vh;
      font-family: "Gowun Batang", serif;
    }
  }
  input[type="checkbox"] {
    appearance: none;
    border-radius: 20%;
    border: 0.1vw solid rgba(103, 106, 108, 0.4);
    background-color: white;
    padding: 0.4vw;
    width: 0.5vw;
    height: 0.5vw;
    margin: 0.5vw;
    @media (max-width: 500px) {
      padding: 0.4vh;
      width: 0.5vh;
      height: 0.5vh;
      margin: 0.5vh;
    }
  }
  input[type="checkbox"]:checked {
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
  @media (max-width: 500px) {
    margin-bottom: 1vh;
  }
  button {
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
function MultiType({ quizNumber, setQuestion, quizzes }) {
  const [quizForm, setQuizForm] = useState([1, 2]);
  const [questions, setQuestions] = useState([]);
  const inputName = "MultiQuestion" + String(quizNumber);
  const handleAnswerChange = (event) => {
    if (quizzes[quizNumber - 1] !== undefined) {
      // 시용자가 이미 있는 문제를 수정하려고 하고있다.
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

  const handleCheckBoxClick = (event) => {
    if (quizzes[quizNumber - 1] !== undefined) {
      // tkdyd
      if (quizzes[quizNumber - 1].questions[event.target.id] === undefined) {
        const newQuestion = {
          number: event.target.id,
          content: "",
          isCorrect: true,
        };
        quizzes[quizNumber - 1].questions[event.target.id] = newQuestion;
      } else {
        if (
          quizzes[quizNumber - 1].questions[event.target.id].isCorrect === true
        ) {
          quizzes[quizNumber - 1].questions[event.target.id].isCorrect = false;
        } else {
          quizzes[quizNumber - 1].questions[event.target.id].isCorrect = true;
        }
      }
    } else {
      if (questions[event.target.id] !== undefined) {
        if (questions[event.target.id].isCorrect === true) {
          questions[event.target.id].isCorrect = false;
          setQuestions([...questions]);
        } else {
          questions[event.target.id].isCorrect = true;
          setQuestions([...questions]);
        }
      } else {
        const newQuestion = {
          number: event.target.id,
          content: "",
          isCorrect: true,
        };
        questions[event.target.id] = newQuestion;
        setQuestions([...questions]);
      }
    }
  };
  const addAnswer = (event) => {
    event.preventDefault();
    setQuizForm((pre) => [...pre, quizForm[quizForm.length - 1] + 1]);
  };
  const handleDelete = (event) => {
    event.preventDefault();
    const deletedForm = quizForm.filter(
      (item) => item !== Number(event.target.value)
    );
    setQuizForm(deletedForm);
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

  useEffect(() => {
    setQuestion([...questions]);
  }, [questions]);
  return (
    <MultiTypeContainer>
      <QuizLabel htmlFor="#">
        <font>
          정답 설정하기 | 정답을 체크해주세요<sup>*필수</sup>
        </font>
      </QuizLabel>
      <QusetionContainer>
        {quizForm.map((item, idx) => {
          return (
            <Question key={item}>
              <input
                onClick={handleCheckBoxClick}
                id={idx}
                name={inputName}
                type="checkbox"
              />
              <input
                id={idx}
                onChange={handleAnswerChange}
                type="text"
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
          <button onClick={addAnswer}>
            <span>
              <FontAwesomeIcon icon={faPlus} />
              <font>정답 추가하기</font>
            </span>
          </button>
        )}
      </OptionContainer>
    </MultiTypeContainer>
  );
}

export default MultiType;
