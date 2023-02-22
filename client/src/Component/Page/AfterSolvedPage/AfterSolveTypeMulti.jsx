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
    }
    span {
      display: flex;
      align-items: center;
      padding: 0.2vw 0.3vw;
      color: #676a6c;
      font-size: 1vw;
      width: 100%;
      @media screen and (max-width: 767px) {
        font-size: 1.2vh;
      }
    }
    input {
      margin-top: 0;
      margin-right: 0.5vw;
      appearance: none;
      border: 0.1vw solid gray;
      border-radius: 50%;
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
function AfterSolveTypeMulti({ questions, inputAnswerToUser, commetary }) {
  const selectedNumArray = inputAnswerToUser.answers;
  selectedNumArray.sort((a, b) => a - b);
  const correctArray = questions
    .map((quiz, idx) => {
      if (quiz.isCorrect === true) {
        return idx;
      }
      return null;
    })
    .filter((item) => {
      return item !== null;
    });
  let isQuizCorrect = true;
  if (correctArray.length !== selectedNumArray.length) {
    isQuizCorrect = false;
  } else {
    correctArray.forEach((item, idx) => {
      if (item !== selectedNumArray[idx]) {
        isQuizCorrect = false;
      }
    });
  }
  let currentIndex = 0;
  return (
    <div>
      {questions.map((item, idx) => {
        const userSelectedNum = selectedNumArray[currentIndex];
        if (idx === userSelectedNum) {
          currentIndex++;
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
                {item.content}
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
                {item.content}
              </label>
            </AnswerContainer>
          );
        }
      })}
      <IsCorrectContainer isCorrect={isQuizCorrect}>
        {isQuizCorrect ? (
          <span>정답!</span>
        ) : (
          <>
            <span>오답!</span>
            <p>{commetary}</p>
          </>
        )}
      </IsCorrectContainer>
    </div>
  );
}

export default AfterSolveTypeMulti;
