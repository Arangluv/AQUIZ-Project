import { useState } from "react";
import styled from "styled-components";

const CorrectContainer = styled.div`
  height: 3vw;
  margin-top: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1vw 1vw;
  align-items: center;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 5px;
  border-color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
  @media screen and (max-width: 767px) {
    padding: 1vh 0;
  }
  span {
    color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
    font-size: 1vw;
    font-weight: 600;
    margin-bottom: 0.3vw;
    display: block;
    margin-bottom: 0.3vw;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      margin-bottom: 0.3vh;
    }
  }
  p {
    color: ${(props) => props.theme.textColor};
    font-size: 0.8vw;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      font-weight: 600;
    }
  }
`;
const NotCorrectContainer = styled.div`
  height: 3vw;
  margin-top: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1vw 1vw;
  align-items: center;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 5px;
  border-color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
  @media screen and (max-width: 767px) {
    padding: 1vh 0;
  }
  &:hover {
    background-color: #f55050;
    span {
      color: white;
    }
  }
  small {
    color: ${(props) => props.theme.textColor};
  }
  span {
    color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
    font-size: 1vw;
    font-weight: 600;
    margin-bottom: 0.3vw;
    display: block;
    margin-bottom: 0.3vw;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      margin-bottom: 0.3vh;
    }
  }
  p {
    color: ${(props) => props.theme.textColor};
    font-size: 0.8vw;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      font-weight: 600;
    }
  }
`;
const WordTypeLabel = styled.label`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 1vw;
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 3px;
    padding: 0.6vw 0.8vw;
    color: ${(props) => props.theme.textColor};
    @media screen and (max-width: 767px) {
      font-size: 1.4vh;
      padding: 0.3vh 0.8vh;
      margin-left: 0;
      margin-right: 0;
      /* width: 100%; */
    }
  }
  span {
    font-size: 1vw;
    color: ${(props) => props.theme.textColor};
    font-weight: 600;

    margin-top: 1vw;
    font {
      font-weight: 500;
      font-size: 1vw;
      margin-top: 0.3vw;
      @media screen and (max-width: 767px) {
        font-size: 1.4vh;
      }
    }
    @media screen and (max-width: 767px) {
      font-size: 1.4vh;
    }
  }
`;
const SeeAnswerBox = styled.div`
  height: auto;
  width: 100%;
  display: ${(props) => (props.seeMore ? "block" : "none")};
  box-sizing: border-box;
  border: 0.1vw solid ${(props) => props.theme.textColor};
  border-radius: 5px;
  margin-top: 1vw;
  padding: 1vw;
  div {
    display: flex;
    align-items: center;
    padding: 0;
    &:nth-child(1) {
      margin-bottom: 1vw;
    }
    font {
      margin: 0;
    }
    font:nth-child(1) {
      font-size: 1.3vw;
    }
    font:nth-child(2) {
      font-size: 1.3vw;
      margin-left: 0.5vw;
    }
  }
`;
function AfterSolveTypeWord({ questions, inputAnswerToUser, commetary }) {
  const userAnswer = inputAnswerToUser.answers;
  const isQuizCorrect = questions[0].isCorrect === userAnswer;
  const [seeMore, setSeeMore] = useState(false);
  console.log(inputAnswerToUser);
  const handleSeeMore = () => {
    setSeeMore((pre) => !pre);
  };
  return (
    <div>
      <WordTypeLabel htmlFor="word-quiz">
        {/* <font>{questions[0].content}</font> */}
        <input
          id="word-quiz"
          type="text"
          value={userAnswer}
          required
          readOnly
        />
        {/* <span>
          정답 : <font>{questions[0].content}</font>
        </span> */}
      </WordTypeLabel>
      {isQuizCorrect ? (
        <CorrectContainer isCorrect={isQuizCorrect}>
          {isQuizCorrect ? (
            <span>정답!</span>
          ) : (
            <>
              <span>오답!</span>
              <small>눌러서 정답 보기</small>
            </>
          )}
        </CorrectContainer>
      ) : (
        <NotCorrectContainer isCorrect={isQuizCorrect} onClick={handleSeeMore}>
          {isQuizCorrect ? (
            <span>정답!</span>
          ) : (
            <>
              <span>오답!</span>
              <small>눌러서 정답 보기</small>
            </>
          )}
        </NotCorrectContainer>
      )}
      <SeeAnswerBox seeMore={seeMore}>
        <div>
          <font>정답 :</font>
          <font>{questions[0].content}</font>
        </div>
        <div>
          <font>해설 :</font>
          <font>
            {commetary ? commetary : "퀴즈메이커가 입력한 해설이 없습니다"}
          </font>
        </div>
      </SeeAnswerBox>
    </div>
  );
}

export default AfterSolveTypeWord;
