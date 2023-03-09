import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
const WordTypeContainer = styled.div`
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
  small {
    font-size: 1vw;
    color: #676a6c;
    margin-bottom: 0.5vw;
    margin-top: 1vw;
    span {
      margin-left: 0.5vw;
      font-weight: 500;
    }
    @media (max-width: 500px) {
      font-size: 0.9vh;
      display: flex;
      flex-direction: column;
      span {
        margin-top: 0.3vh;
        margin-left: 0;
      }
    }
  }
  input[type="text"] {
    padding: 0.6vw 0.8vw;
    color: #676a6c;
    height: 1vh;
    @media screen and (max-width: 767px) {
      padding: 0.8vh 0.6vh;
      font-size: 1vh;
      margin-top: 0.6vh;
      margin-bottom: 1vh;
      -webkit-appearance: none;
      -webkit-border-radius: 3px;
    }
  }
  input[type="text"]:focus {
    border: 0.12vw solid #676a6c;
    border-radius: 2px;
    outline: none;
  }
`;
const SpaceHint = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-size: 1.2vw;
  margin-bottom: 2vh;
  @media screen and (max-width: 767px) {
    margin-bottom: 1vh;
    font-size: 1vh;
  }
`;
function EditWordType({ setQuestion, quizzes, quizNumber }) {
  const [answer, setAnswer] = useState("");
  const [userSpacingHint, setUserSpacingHint] = useState("");
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    setIsSetting(false);
    if (quizzes[quizNumber - 1]) {
      if (quizzes[quizNumber - 1].questions.length > 0) {
        setAnswer(quizzes[quizNumber - 1].questions[0].content);
        setUserSpacingHint(quizzes[quizNumber - 1].questions[0].spacingHint);
      }
    }
    setIsSetting(true);
  }, []);
  const handleWordChange = (event) => {
    if (quizzes[quizNumber - 1] !== undefined) {
      // SpacingHint 전처리
      const spacingHint = handleSpacingHint(event.target.value);
      setUserSpacingHint(spacingHint);
      setAnswer(event.target.value);
      if (quizzes[quizNumber - 1].questions.length === 0) {
        const newQuestion = {
          number: 0,
          isCorrect: event.target.value.trim(),
          content: event.target.value.trim(),
          spacingHint: spacingHint.trim(),
        };
        quizzes[quizNumber - 1].questions[0] = newQuestion;
      } else {
        quizzes[quizNumber - 1].questions[0].isCorrect = event.target.value;
        quizzes[quizNumber - 1].questions[0].content = event.target.value;
        quizzes[quizNumber - 1].questions[0].spacingHint = spacingHint;
      }
    } else {
      const spacingHint = handleSpacingHint(event.target.value);
      setUserSpacingHint(spacingHint);
      setAnswer(event.target.value);
      const newQuestion = {
        number: 0,
        isCorrect: event.target.value.trim(),
        content: event.target.value.trim(),
        spacingHint: spacingHint.trim(),
      };
      setQuestion([newQuestion]);
    }
  };
  const handleSpacingHint = (word) => {
    const newWord = word.split("").map((char) => {
      if (char === " ") {
        return " ";
      } else {
        return "O";
      }
    });
    return newWord.join("");
  };
  return (
    <WordTypeContainer>
      <QuizLabel htmlFor="#">
        <font>정답 설정하기 | 정답을 적어주세요</font>
      </QuizLabel>
      <QusetionContainer>
        <small>
          정답에 해당하는 단어나 문장을 적어주세요.
          <span>띄어쓰기를 구분해주면 좋습니다.</span>
        </small>
        <input
          type="text"
          placeholder="정답 내용"
          onChange={handleWordChange}
          value={answer}
        />
        <small>띄어 쓰기 힌트는 다음과 같이 나옵니다.</small>
        <SpaceHint>Ex) {userSpacingHint} </SpaceHint>
      </QusetionContainer>
    </WordTypeContainer>
  );
}

export default EditWordType;
