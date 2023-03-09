import styled from "styled-components";
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
  @media screen and (max-width: 767px) {
    padding: 1vh 0;
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
function AfterSolveTypeSingle({ questions, inputAnswerToUser, commetary }) {
  const selectedNum = inputAnswerToUser.answers[0];
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
      <IsCorrectContainer isCorrect={isCorrectTrueIndex === selectedNum}>
        {isCorrectTrueIndex === selectedNum ? (
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

export default AfterSolveTypeSingle;
