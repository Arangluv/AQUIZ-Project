import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const SingleTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuizLabel = styled.label`
  margin-bottom: 1vh;
  font {
    color: rgba(0, 0, 0, 0.8);
    font-size: 1vw;
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
  border-radius: 5px;
  margin-bottom: 1vh;
  background: rgba(255, 242, 242, 0.8);
  @media (max-width: 500px) {
    margin-bottom: 0.8vh;
  }
  input[type="text"] {
    width: 100%;
    padding: 0.6vw 0.8vw;
    border: none;
    border-left: 1px solid rgba(103, 106, 108, 0.7);
    font-size: 1vw;
    color: rgba(0, 0, 0, 0.8);
    @media (max-width: 500px) {
      padding: 0.6vh 0.8vh;
      font-size: 0.1vh;
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
    @media (max-width: 500px) {
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
  @media (max-width: 500px) {
    margin-bottom: 1vh;
  }
  button {
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #7286d3;
    background-color: #fffbf6;
    font {
      margin-left: 3px;
      color: #7286d3;
      font-size: 1vw;
    }
    span {
      margin-top: 0;
      color: #7286d3;
      font-size: 1vw;
      padding: 0.6vw 0.4vw;
      border-radius: 3px;
      transition: 0.1s ease-in-out;
      @media (max-width: 500px) {
        font-size: 1vh;
        padding: 0.6vh 0.4vh;
      }
    }
  }
  button:hover {
    background-color: white;
  }
`;
function EditSingleType({ quizNumber, setQuestion, quizzes }) {
  const [quizForm, setQuizForm] = useState([1, 2]);
  const [selectionOption, setSelectionOption] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isSetting, setIsSetting] = useState(false);
  useEffect(() => {
    setIsSetting(false);
    if (quizzes[quizNumber - 1]) {
      if (quizzes[quizNumber - 1].questions.length > 0) {
        const quiz = quizzes[quizNumber - 1];
        const newQuizForm = [];
        for (let i = 0; i < quiz.questions.length; i++) {
          newQuizForm.push(i + 1);
        }
        let correctNumber;
        quiz.questions.forEach((question, idx) => {
          if (question.isCorrect) {
            correctNumber = String(idx + 1);
          }
        });
        setQuizForm(newQuizForm);
        setQuestions(quiz.questions);
        setSelectionOption(correctNumber);
      }
    }
    setIsSetting(true);
  }, []);

  const handleAnswerChange = (event) => {
    if (quizzes[quizNumber - 1] !== undefined) {
      // 사용자가 이미 있는 문제를 수정하려고 한다.
      if (quizzes[quizNumber - 1].questions[event.target.id] === undefined) {
        const newQuestion = {
          number: Number(event.target.id),
          content: event.target.value,
          isCorrect: false,
        };
        const newQuestions = [...questions];
        newQuestions[event.target.id] = {
          ...newQuestions[event.target.id],
          ...newQuestion,
        };
        setQuestions(newQuestions);
        quizzes[quizNumber - 1].questions[event.target.id] = newQuestion;
      } else {
        const newQuestions = [...questions];
        newQuestions[event.target.id] = {
          ...newQuestions[event.target.id],
          content: event.target.value,
          number: Number(event.target.id),
        };
        setQuestions(newQuestions);
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
      const newQuestions = [...questions];
      quizzes[quizNumber - 1].questions.forEach(
        (item) => (item.isCorrect = false)
      );
      newQuestions.forEach((question) => (question.isCorrect = false));
      if (quizzes[quizNumber - 1].questions[event.target.id] === undefined) {
        newQuestions[event.target.id] = {
          ...newQuestions[event.target.id],
          isCorrect: true,
        };
        const addQuestion = newQuestions[event.target.id];
        quizzes[quizNumber - 1].questions.push(addQuestion);
        setQuestions(newQuestions);
      } else {
        quizzes[quizNumber - 1].questions.forEach(
          (item) => (item.isCorrect = false)
        );
        quizzes[quizNumber - 1].questions[event.target.id].isCorrect = true;
        newQuestions[event.target.id] = {
          ...newQuestions[event.target.id],
          isCorrect: true,
        };
        setQuestions(newQuestions);
      }
    } else {
      const newQuestions = [...questions];
      if (questions[event.target.id] !== undefined) {
        questions.forEach((item) => (item.isCorrect = false));
        questions[event.target.id].isCorrect = true;
        setQuestions([...questions]);
      } else {
        newQuestions.forEach((question) => {
          question = { ...question, isCorrect: false };
        });
        const newQuestion = {
          number: event.target.id,
          content: "",
          isCorrect: true,
        };
        newQuestions[event.target.id] = newQuestion;
        setQuestions(newQuestions);
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
      const fillteringQuestions = quizzes[quizNumber - 1].questions.filter(
        (item) => Number(item.number) !== Number(event.target.value) - 1
      );
      quizzes[quizNumber - 1].questions = fillteringQuestions;
      setQuestions(fillteringQuestions);
    } else {
      const newQuestions = questions.filter((item) => {
        return Number(item.number) !== Number(event.target.value) - 1;
      });
      setQuestions([...newQuestions]);
    }
  };

  const handleOptionChange = (event) => {
    setSelectionOption(event.target.value);
  };
  const inputName = "singleQuestion" + String(quizNumber);

  useEffect(() => {
    if (quizzes.length + 1 === quizNumber) {
      setQuestion([...questions]);
    }
    return;
  }, [questions]);
  return (
    <SingleTypeContainer>
      <QuizLabel htmlFor="#">
        <font>정답 설정하기 | 정답을 체크해주세요</font>
      </QuizLabel>
      <QusetionContainer>
        {isSetting
          ? quizForm.map((item, idx) => {
              return (
                <Question key={item}>
                  <input
                    id={idx}
                    onClick={handleRadioClick}
                    name={inputName}
                    value={idx + 1}
                    onChange={handleOptionChange}
                    checked={String(idx + 1) === selectionOption ? true : false}
                    type="radio"
                  />
                  <input
                    id={idx}
                    type="text"
                    onChange={handleAnswerChange}
                    value={
                      questions[idx]?.content ? questions[idx].content : ""
                    }
                    placeholder="문제에 대한 정답 및 오답을 입력해주세요"
                  />
                  {idx > 1 ? (
                    <button onClick={handleDelete} value={item}>
                      X
                    </button>
                  ) : null}
                </Question>
              );
            })
          : null}
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
    </SingleTypeContainer>
  );
}

export default EditSingleType;
