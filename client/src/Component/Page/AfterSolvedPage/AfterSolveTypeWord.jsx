import styled from "styled-components";

const IsCorrectContainer = styled.div`
  margin-top: 1vw;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1vw 1vw;
  align-items: center;
  border: 1px solid #676a6c;
  border-radius: 5px;
  border-color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
  span {
    color: ${({ isCorrect }) => (isCorrect ? "#AACB73" : "#F55050")};
    font-size: 1vw;
    font-weight: 600;
    margin-bottom: 0.3vw;
  }
  p {
    color: #676a6c;
    font-size: 0.8vw;
  }
`;
const WordTypeLabel = styled.label`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 1vw;
    border: 1px solid rgba(103, 106, 108, 0.7);
    border-radius: 3px;
    padding: 0.5vw 0.5vw;
    color: #676a6c;
    @media screen and (max-width: 767px) {
      padding: 0.4vw 0.4vw;
      font-size: 1.2vh;
    }
  }
  span {
    font-size: 1vw;
    color: #676a6c;
    font-weight: 600;
    font {
      font-weight: 500;
      font-size: 1vw;
      margin-top: 0.3vw;
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
