import { useState } from "react";
import styled from "styled-components";
const OrderButton = styled.button`
  border: 0.1vw solid rgba(103, 106, 108, 0.4);
  background-color: ${({ color }) => (color ? `#ff8b13` : `white`)};
  border-radius: 0.7vw;
  font-size: 1vw;
  font-family: "Gowun Batang", serif;
  font-weight: 500;
  padding: 0.4vw 0.5vw;
  color: #3f4244;
  &:hover,
  &:active {
    box-shadow: 0px 0.1vw 0.3vw gray;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    font-size: 1.4vh;
    width: 100%;
  }
`;
const ThemaButton = styled.button`
  border: 0.1vw solid rgba(103, 106, 108, 0.4);
  background-color: ${({ color, themaColor }) =>
    themaColor.includes(color) ? `#ff8b13` : `white`};
  border-radius: 0.7vw;
  font-size: 1vw;
  font-family: "Gowun Batang", serif;
  font-weight: 500;
  padding: 0.4vw 0.5vw;
  color: #3f4244;
  &:hover,
  &:active {
    box-shadow: 0px 0.1vw 0.3vw gray;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    font-size: 1.4vh;
    width: 100%;
  }
`;
const RatingButton = styled.button`
  border: 0.1vw solid rgba(103, 106, 108, 0.4);
  background-color: ${({ color }) => (color ? `#ff8b13` : `white`)};
  border-radius: 0.7vw;
  font-size: 1vw;
  font-family: "Gowun Batang", serif;
  font-weight: 500;
  padding: 0.4vw 0.5vw;
  color: #3f4244;
  &:hover,
  &:active {
    box-shadow: 0px 0.1vw 0.3vw gray;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    font-size: 1.4vh;
  }
`;

const OptionArea = styled.div`
  display: flex;
  width: 40%;
  background-color: #fffbf5;
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    padding: 0.4vw 0.6vw;
    border-right: 1px solid rgba(63, 66, 68, 0.2);
    @media screen and (max-width: 767px) {
      border-right: none;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    border: 1px solid blue;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & > div:nth-child(1) ${OrderButton}:nth-child(1) {
    margin-right: 0.1vw;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 0.5vh 0.6vh;
  }
`;
const StyledForm = styled.form`
  display: flex;
  justify-content: flex-end;
  width: 60%;
  input:nth-child(1) {
    width: 100%;
    border-radius: 3px 0px 0px 3px;
    border-right: none;
    border: 0.5px solid rgba(0, 0, 0, 0.3);
    font-size: 1vw;
    color: #3f4244;
    padding-left: 1vw;
  }

  input:nth-child(2) {
    font-size: 1.1vw;
    padding: 0.5vw 0.6vw;
    border-radius: 0px 3px 3px 0px;
    background-color: #ff8b13;
    border: none;
    color: #3f4244;
    font-family: "Gowun Batang", serif;
    font-weight: 500;
    @media (max-width: 500px) {
      padding: 0.5vh 0.6vh;
    }
  }
  input:nth-child(1):focus {
    outline: none;
    border-color: #ff8b13;
  }
  input:nth-child(2):hover {
    cursor: pointer;
  }
`;
const ThemaSelectBox = styled.div`
  display: flex;
  margin-bottom: 0.2vw;
  & > button {
    margin-right: 0.2vw;
  }
`;
const CorrectRateSelectBox = styled.div`
  display: flex;
  & > button {
    margin-right: 0.2vw;
  }
`;
function SerchArea({
  className,
  setOrder,
  loading,
  setThema,
  setRating,
  quizSearchInput,
  setQuizSearchInput,
  handleSearchQuiz,
}) {
  const [orderColor, setOrderColor] = useState(true);
  const [themaColor, setThemaColor] = useState([""]);
  const [ratingColor, setRationColor] = useState(true);
  const toggleOrderColor = (event) => {
    setOrderColor(!orderColor);
    const order = event.target.dataset.order;
    setOrder(order);
  };

  const toggleThemaColor = (event) => {
    const thema = event.target.dataset.thema;
    if (themaColor.includes(thema)) {
      const targetIndex = themaColor.indexOf(thema);
      themaColor.splice(targetIndex, 1);
      setThemaColor([...themaColor]);
      setThema([...themaColor]);
    } else {
      themaColor.push(thema);
      setThemaColor([...themaColor]);
      setThema([...themaColor]);
    }
  };
  const toggleRatingColor = () => {
    setRationColor(!ratingColor);
    if (ratingColor) {
      setRating("low");
    } else {
      setRating("high");
    }
  };
  const handleSearchInput = (event) => {
    setQuizSearchInput(event.target.value);
  };
  return (
    <div className={className}>
      <OptionArea>
        <div>
          <OrderButton
            onClick={toggleOrderColor}
            color={orderColor}
            data-order="solved"
            disabled={loading}
          >
            인기순
          </OrderButton>
          <OrderButton
            onClick={toggleOrderColor}
            color={!orderColor}
            data-order="createAt"
            disabled={loading}
          >
            최신순
          </OrderButton>
        </div>
        <div>
          <ThemaSelectBox>
            <ThemaButton
              onClick={toggleThemaColor}
              themaColor={themaColor}
              color="BJ"
              data-thema="BJ"
            >
              BJ
            </ThemaButton>
            <ThemaButton
              onClick={toggleThemaColor}
              color="아이돌"
              themaColor={themaColor}
              data-thema="아이돌"
            >
              아이돌
            </ThemaButton>
            <ThemaButton
              onClick={toggleThemaColor}
              color="연예인"
              themaColor={themaColor}
              data-thema="연예인"
            >
              연예인
            </ThemaButton>
            <ThemaButton
              onClick={toggleThemaColor}
              color="애니캐릭터"
              themaColor={themaColor}
              data-thema="애니캐릭터"
            >
              애니
            </ThemaButton>
            <ThemaButton
              onClick={toggleThemaColor}
              color="기타"
              themaColor={themaColor}
              data-thema="기타"
            >
              기타
            </ThemaButton>
          </ThemaSelectBox>
          <CorrectRateSelectBox>
            <RatingButton onClick={toggleRatingColor} color={ratingColor}>
              정답률 높은순
            </RatingButton>
            <RatingButton onClick={toggleRatingColor} color={!ratingColor}>
              정답률 낮은순
            </RatingButton>
          </CorrectRateSelectBox>
        </div>
      </OptionArea>

      <StyledForm onSubmit={handleSearchQuiz}>
        <input
          type="text"
          placeholder="찾고자 하는 퀴즈 제목을 입력해주세요"
          onChange={handleSearchInput}
          value={quizSearchInput}
        />
        <input type="submit" value="검색" />
      </StyledForm>
    </div>
  );
}

export default SerchArea;
