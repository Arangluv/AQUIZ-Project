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
    border: 1px solid #676a6c;
    border-radius: 3px;
    margin-bottom: 0.3vw;
    background-color: white;
    padding: 0.5vw 0.4vw;
    display: flex;
    align-items: center;
    @media screen and (max-width: 767px) {
      margin-bottom: 0.4vh;
    }
    span {
      display: flex;
      align-items: center;
      padding: 0.2vw 0.3vw;
      color: #676a6c;
      font-size: 1vw;
      width: 100%;
    }
    input {
      margin-top: 0;
      margin-bottom: 0;
      margin-right: 0.5vw;
      appearance: none;
      border: 0.1vw solid gray;
      border-radius: 2px;
      width: 1vw;
      height: 1vw;
      @media screen and (max-width: 767px) {
        margin-right: 0.5vh;
        width: 0.7vh;
        height: 0.7vh;
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
    border-radius: 5px;
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
function SolveTypeMulti({ questions, quizNum, onClick, quizLenth }) {
  const [answer, setAnswer] = useState();
  const handleChange = (event) => {
    const seletedQuizNumber = Number(event.target.dataset.number);
    if (answer === undefined) {
      const newAnswer = {
        num: quizNum, // 문제 번호에 해당
        answers: [seletedQuizNumber],
      };
      setAnswer(newAnswer); // 초기 객체
    } else {
      // 문제가 한문제 이상 체크되었다.
      if (!answer.answers.includes(seletedQuizNumber)) {
        answer.answers.push(seletedQuizNumber);
        const newAnswer = {
          num: quizNum, // 문제 번호에 해당
          answers: answer.answers,
        };
        setAnswer(newAnswer);
      } else {
        const findIndex = answer.answers.indexOf(seletedQuizNumber);
        answer.answers.splice(findIndex, 1);
        const newAnswer = {
          num: quizNum, // 문제 번호에 해당
          answers: answer.answers,
        };
        setAnswer(newAnswer);
      }
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (answer !== undefined) {
      if (answer.answers.length === 1) {
        alert("정답을 두개 이상 체크해야합니다 🤣");
      } else {
        onClick(answer, event);
      }
    } else {
      alert("정답을 두개 이상 체크해야합니다 🤣");
    }
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
                  type="checkbox"
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

export default SolveTypeMulti;
