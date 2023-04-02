import { useState } from "react";
import styled from "styled-components";
const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1vw;
`;
const UserInputPart = styled.fieldset`
  display: flex;
  flex-direction: column;
  span {
    color: ${(props) => props.theme.textColor};
    margin-bottom: 0.4vw;
    margin-top: 0.2vw;
    font-size: 1.1vw;
    @media screen and (max-width: 767px) {
      font-size: 1.4vh;
      margin-top: 0.5vh;
    }
  }
  input {
    margin-bottom: 1vw;
    padding: 0.6vw 0.4vw;
    color: ${(props) => props.theme.textColor};
    font-family: "Gowun Batang", serif;
    border: 0.1vw solid ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 3px;
    font-size: 1.2vw;
    &::placeholder {
      color: ${(props) => props.theme.textColor};
    }
    @media screen and (max-width: 767px) {
      font-size: 1.4vh;
      padding: 0.3vh 0.8vh;
    }
  }
  input:focus {
    outline: 0.1vw solid rgba(103, 106, 108, 1);
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
  @media screen and (max-width: 767px) {
    padding: 1vh 0vh;
    font-size: 1.3vh;
  }
  &:hover {
    background-color: #aacb73;
    color: white;
    border: 0.1vw solid #aacb73;
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
function SolveTypeWord({ questions, quizNum, onClick, quizLenth }) {
  const [answer, setAnswer] = useState();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClick(answer, event);
    }
  };
  const handleChangeInput = (event) => {
    const newAnswer = {
      num: quizNum,
      answers: event.target.value,
    };
    setAnswer(newAnswer);
  };
  const handleClick = (event) => {
    onClick(answer, event);
  };
  return (
    <TypeContainer>
      <UserInputPart>
        <span>(띄어쓰기 힌트 : {questions[0].spacingHint})</span>
        <input
          id="word-quiz"
          type="text"
          placeholder="정답을 입력해주세요"
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          required
        />
      </UserInputPart>
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

export default SolveTypeWord;
