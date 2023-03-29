import styled from "styled-components";
import { useState } from "react";
const AnswerContainer = styled.div`
  label {
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 3px;
    margin-bottom: 0.3vw;
    background-color: ${(props) => props.theme.bgColor};
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
      color: ${(props) => props.theme.textColor};
      font-size: 1vw;
      width: 100%;
      @media screen and (max-width: 767px) {
        font-size: 1.5vh;
      }
    }
    input {
      margin-top: 0;
      margin-right: 0.5vw;
      margin-bottom: 0;
      appearance: none;
      border: 0.1vw solid gray;
      border-radius: 50%;
      width: 1vw;
      height: 1vw;
      @media screen and (max-width: 767px) {
        margin-right: 0.5vh;
        width: 1vh;
        height: 1vh;
        margin-bottom: 0;
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
  }
`;
const CorrectContainer = styled.div`
  margin-top: 1vw;
  border: 1px solid red;
  height: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1vw 1vw;
  align-items: center;
  border: 1px solid;
  border-radius: 5px;
  border-color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
  transition: 0.1s ease-in-out;
  @media screen and (max-width: 767px) {
    padding: 1vh 0;
  }
  small {
    color: ${(props) => props.theme.textColor};
  }
  span {
    color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
    font-size: 1.2vw;
    font-weight: 600;
    display: block;
    margin-bottom: 0.3vw;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      margin-bottom: 0.3vh;
    }
  }
  p {
    color: #676a6c;
    font-size: 1vw;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      font-weight: 600;
    }
  }
`;
const NotCorrectContainer = styled.div`
  margin-top: 1vw;
  border: 1px solid red;
  height: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1vw 1vw;
  align-items: center;
  border: 1px solid;
  border-radius: 5px;
  border-color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
  transition: 0.1s ease-in-out;
  &:hover {
    background-color: #f55050;
    span {
      color: white;
    }
  }
  @media screen and (max-width: 767px) {
    padding: 1vh 0;
  }
  small {
    color: ${(props) => props.theme.textColor};
  }
  span {
    color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
    font-size: 1.2vw;
    font-weight: 600;
    display: block;
    margin-bottom: 0.3vw;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      margin-bottom: 0.3vh;
    }
  }
  p {
    color: #676a6c;
    font-size: 1vw;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      font-weight: 600;
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
function AfterSolveTypeSingle({ questions, inputAnswerToUser, commetary }) {
  const selectedNum = inputAnswerToUser.answers[0];
  const [seeMore, setSeeMore] = useState(false);
  const handleSeeMore = () => {
    setSeeMore((pre) => !pre);
  };
  const isCorrectTrueObj = questions.find((quiz) => {
    return quiz.isCorrect === true;
  });
  const isCorrectTrueIndex = questions.indexOf(isCorrectTrueObj);
  return (
    <div>
      {questions.map((item, idx) => {
        if (idx === selectedNum) {
          return (
            <AnswerContainer key={idx}>
              <label htmlFor={item.number}>
                <input
                  id={item.number}
                  name="question"
                  type="checkbox"
                  value={item.content}
                  checked={true}
                  readOnly
                />
                <span>{item.content}</span>
              </label>
            </AnswerContainer>
          );
        } else {
          return (
            <AnswerContainer key={idx}>
              <label htmlFor={item.number}>
                <input
                  id={item.number}
                  name="question"
                  type="checkbox"
                  value={item.content}
                  checked={false}
                  readOnly
                />
                <span>{item.content}</span>
              </label>
            </AnswerContainer>
          );
        }
      })}
      {isCorrectTrueIndex === selectedNum ? (
        <CorrectContainer isCorrect={isCorrectTrueIndex === selectedNum}>
          {isCorrectTrueIndex === selectedNum ? (
            <span>정답!</span>
          ) : (
            <>
              <span>오답!</span>
              <small>눌러서 정답 보기</small>
            </>
          )}
        </CorrectContainer>
      ) : (
        <NotCorrectContainer
          isCorrect={isCorrectTrueIndex === selectedNum}
          onClick={handleSeeMore}
        >
          {isCorrectTrueIndex === selectedNum ? (
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
          <font>{inputAnswerToUser.answers[0]}번</font>
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

export default AfterSolveTypeSingle;
