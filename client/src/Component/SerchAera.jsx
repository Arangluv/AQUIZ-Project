import { useRef, useState } from "react";
import styled from "styled-components";
const OrderButton = styled.button`
  border: 0.1vw solid ${(props) => props.theme.dbColor};
  background-color: ${(props) =>
    props.color ? props.theme.accentColor : props.theme.bgColor};
  border-radius: 0.7vw;
  font-size: 1vw;
  font-family: "Gowun Batang", serif;
  font-weight: 500;
  padding: 0.4vw 0.5vw;
  color: ${(props) => props.theme.textColor};
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
  border: 0.1vw solid ${(props) => props.theme.dbColor};
  background-color: ${(props) =>
    props.themaColor.includes(props.color)
      ? props.theme.accentColor
      : props.theme.bgColor};
  border-radius: 0.7vw;
  font-size: 1vw;
  font-family: "Gowun Batang", serif;
  font-weight: 500;
  padding: 0.4vw 0.5vw;
  color: ${(props) => props.theme.textColor};
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
  border: 0.1vw solid ${(props) => props.theme.dbColor};
  background-color: ${(props) =>
    props.color ? props.theme.accentColor : props.theme.bgColor};
  border-radius: 0.7vw;
  font-size: 1vw;
  font-family: "Gowun Batang", serif;
  font-weight: 500;
  padding: 0.4vw 0.5vw;
  color: ${(props) => props.theme.textColor};
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
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4vw 0.6vw;
    border-right: 1px solid rgba(63, 66, 68, 0.2);
    margin-right: 1vw;
    @media screen and (max-width: 767px) {
      border-right: none;
      margin-right: 0;
    }
  }
  & > div:nth-child(2) {
    display: flex;
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
    &::placeholder {
      color: ${(props) => props.theme.textColor};
    }
    width: 100%;
    border-radius: 3px 0px 0px 3px;
    border-right: none;
    border: 0.5px solid ${(props) => props.theme.dbColor};
    background-color: ${(props) => props.theme.bgColor};
    font-size: 1vw;
    color: ${(props) => props.theme.textColor};
    padding-left: 1vw;
    @media screen and (max-width: 767px) {
      font-size: 1.2vh;
      padding: 0vh 1vh;
    }
  }

  input[type="submit"] {
    font-size: 1vw;
    padding: 0.5vw 0.6vw;
    border-radius: 0px 3px 3px 0px;
    background-color: ${(props) => props.theme.accentColor};
    border: none;
    color: ${(props) => props.theme.textColor};
    font-family: "Gowun Batang", serif;
    font-weight: 500;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      padding: 1vh 1vh;
      -webkit-appearance: none;
      -webkit-border-radius: 0px 3px 3px 0px;
      margin-left: 0;
    }
  }
  input:nth-child(1):focus {
    outline: none;
    border-color: ${(props) => props.theme.accentColor};
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
  setQuizSearchInput,
}) {
  const [orderColor, setOrderColor] = useState(true);
  const [themaColor, setThemaColor] = useState([""]);
  const [ratingColor, setRatingColor] = useState("");
  const ref = useRef();
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
  const toggleRatingColor = (event) => {
    if (event.target.dataset.color === ratingColor) {
      setRatingColor("");
      setRating("");
    } else {
      setRatingColor(event.target.dataset.color);
      setRating(event.target.dataset.color);
    }
  };
  const handleSearchInput = (event) => {
    event.preventDefault();
    const value = ref.current?.value;
    setQuizSearchInput(value);
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
            <RatingButton
              onClick={toggleRatingColor}
              data-color="high"
              color={ratingColor === "high"}
            >
              정답률 높은순
            </RatingButton>
            <RatingButton
              onClick={toggleRatingColor}
              data-color="low"
              color={ratingColor === "low"}
            >
              정답률 낮은순
            </RatingButton>
          </CorrectRateSelectBox>
        </div>
      </OptionArea>
      <StyledForm>
        <input
          ref={ref}
          type="text"
          placeholder="찾고자 하는 퀴즈 제목을 입력해주세요"
        />
        <input onClick={handleSearchInput} type="submit" value="검색" />
      </StyledForm>
    </div>
  );
}

export default SerchArea;
