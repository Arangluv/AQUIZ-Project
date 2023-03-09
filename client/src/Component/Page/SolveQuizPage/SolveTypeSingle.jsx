import { useState } from "react";
import styled from "styled-components";
const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1vw;

  @media screen and (max-width: 767px) {
    margin-top: 0.6vh;
  }
`;
const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
`;
const AnswerContainer = styled.div`
  label {
    border: 1px solid rgba(103, 106, 108, 0.8);
    border-radius: 3px;
    margin-bottom: 0.3vw;
    background-color: white;
    padding: 0.5vw 0.4vw;
    display: flex;
    align-items: center;
    @media screen and (max-width: 767px) {
      margin-bottom: 0.4vh;
      padding: 0.6vh 0.4vh;
    }
    span {
      display: flex;
      align-items: center;
      padding: 0.2vw 0.3vw;
      color: #676a6c;
      font-size: 1vw;
      width: 100%;
      @media screen and (max-width: 767px) {
        font-size: 1.5vh;
      }
    }
    input {
      margin-top: 0;
      margin-bottom: 0;
      margin-right: 0.5vw;
      appearance: none;
      border: 0.1vw solid gray;
      border-radius: 50%;
      width: 1vw;
      height: 1vw;
      @media screen and (max-width: 767px) {
        margin-right: 0.5vh;
        width: 1vh;
        height: 1vh;
        -webkit-appearance: none;
        -webkit-border-radius: 50%;
      }
    }
    input:checked {
      background-color: #cde990;
      padding: 0.1vw 0.2vw;
      border: 0.15vw solid white;
      outline: 1px solid #cde990;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;
const NextQuizButton = styled.button`
  padding: 1vw 0;
  background-color: white;
  border: 0.1vw solid rgba(103, 106, 108, 0.5);
  color: #aacb73;
  border-radius: 5px;
  font-size: 1.3vw;
  transition: 0.1s ease-in-out;
  &:hover {
    background-color: #aacb73;
    color: white;
    border: 0.1vw solid #aacb73;
  }
  @media screen and (max-width: 767px) {
    padding: 1vh 0;
    font-size: 1.3vh;
  }
`;
const QuizSubmitForm = styled.form`
  width: 100%;
  input[type="submit"] {
    width: 100%;
    padding: 1vw 0;
    background-color: white;
    border: 0.1vw solid rgba(103, 106, 108, 0.5);
    color: #aacb73;
    -webkit-appearance: none;
    -webkit-border-radius: 3;
    font-size: 1.3vw;
    transition: 0.1s ease-in-out;
    @media screen and (max-width: 767px) {
      padding: 1vh 0;
      font-size: 1.3vh;
    }
  }
  input[type="submit"]:hover {
    background-color: #aacb73;
    color: white;
    border: 0.1vw solid #aacb73;
  }
`;
function SolveTypeSingle({ questions, quizNum, quizLenth, onClick }) {
  // const [ischecked, setIsChecked] = useState(checked);
  const [answer, setAnswer] = useState();
  const handleChange = (event) => {
    const seletedQuizNumber = Number(event.target.dataset.number);
    const newAnswer = {
      num: quizNum,
      answers: [seletedQuizNumber],
    };
    setAnswer(newAnswer);
  };
  const handleClick = (event) => {
    onClick(answer, event);
  };
  return (
    <TypeContainer>
      <FieldSet>
        {questions.map((item, idx) => {
          return (
            <AnswerContainer key={idx}>
              <label htmlFor={item.number}>
                <input
                  id={item.number}
                  name="question"
                  type="radio"
                  value={item.content}
                  onChange={handleChange}
                  data-number={idx}
                />
                <span>{item.content}</span>
              </label>
            </AnswerContainer>
          );
        })}
      </FieldSet>
      {quizNum + 1 === quizLenth ? (
        <QuizSubmitForm action="POST" onSubmit={handleClick}>
          <input type="submit" value="제출하기" />
        </QuizSubmitForm>
      ) : (
        <NextQuizButton onClick={handleClick}>다음 퀴즈 보기</NextQuizButton>
      )}
    </TypeContainer>
  );
}

export default SolveTypeSingle;
