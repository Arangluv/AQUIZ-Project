import styled from "styled-components";

const IsCorrectContainer = styled.div`
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
function AfterSolveTypeWord({ questions, inputAnswerToUser, commetary }) {
  const userAnswer = inputAnswerToUser.answers;
  const isQuizCorrect = questions[0].isCorrect === userAnswer;
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
        <span>
          정답 : <font>{questions[0].content}</font>
        </span>
      </WordTypeLabel>
      <IsCorrectContainer isCorrect={isQuizCorrect}>
        {isQuizCorrect ? (
          <span>정답!</span>
        ) : (
          <>
            <span>오답!</span>
            <p>해설 : {commetary}</p>
          </>
        )}
      </IsCorrectContainer>
    </div>
  );
}

export default AfterSolveTypeWord;
