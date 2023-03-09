import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";

const CreateThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
  @media screen and (max-width: 767px) {
    margin-top: 0.4vh;
  }
  width: 80%;
`;
const ThumbnailDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3vw;
  margin-bottom: 1.3vh;
  h2 {
    display: flex;
    align-items: center;
    margin-bottom: 0.4vh;
    @media screen and (max-width: 767px) {
      font-size: 1.5vh;
    }
  }
  span {
    color: rgb(255, 139, 19);
    font-size: 1.6vw;
    margin-right: 0.5vw;
    @media screen and (max-width: 767px) {
      font-size: 2vh;
    }
  }
  small {
    color: #676a6c;
    @media screen and (max-width: 767px) {
      font-size: 1vh;
    }
  }
`;
const ButtonBox = styled.div`
  margin-bottom: 1.5vh;
  button {
    margin-right: 1vw;
    background-color: #fffbf5;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0.2vh 0.4vh rgba(0, 0, 0, 0.5);
    padding: 0.2vw;
    padding-left: 0.4vw;
    padding-right: 0.4vw;
    color: rgba(0, 0, 0, 0.8);
    font-family: "Gowun Batang", serif;
    transition: 0.1s ease-in-out;
    font-size: 1.4vw;
    @media screen and (max-width: 767px) {
      /* all: initial; */
      margin-right: 2vw;
      font-size: 1.4vh;
      padding: 0.3vh 0.7vh;
    }
  }
  button:hover {
    background-color: rgba(255, 139, 19, 0.6);
  }
`;
const ThemaContainer = styled.div`
  span {
    font-size: 1vw;
    color: #676a6c;
    display: flex;
    align-items: center;
    margin-bottom: 1vh;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
    }
  }
  span font {
    margin-left: 0.4vw;
  }
`;
const RederingContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`;
const ButtonItem = styled.div`
  margin-right: 1vw;
  @media (max-width: 500px) {
    /* all: initial; */
    margin-right: 1vh;
  }
  button {
    background-color: #fffbf5;
    border: none;
    box-shadow: 0px 0.2vw 1px rgba(0, 0, 0, 0.5);
    padding: 0.2vw;
    padding-left: 0.4vw;
    padding-right: 0.4vw;
    color: rgba(0, 0, 0, 0.8);
    font-family: "Gowun Batang", serif;
    font-size: 1.4vw;
    @media screen and (max-width: 767px) {
      font-size: 1.5vh;
      padding: 0.3vh 0.4vh;
    }
    transition: 0.1s ease-in-out;
  }
  button:nth-child(1) {
    border-radius: 5px 0px 0px 5px;
    border-right: none;
    margin-right: 0;
  }
  button:nth-child(2) {
    border-radius: 0px 5px 5px 0px;
    border-left: none;
    margin-left: 0;
  }
  &:hover {
    button:nth-child(1),
    button:nth-child(2) {
      background-color: rgb(245, 80, 80);
    }
  }
`;
function CreateThema({ themaBox, changeThemaBox, quizThema }) {
  const handleClick = (event) => {
    event.preventDefault();
    const currentBox = event.target.innerText;
    const isEnter = themaBox.includes(currentBox);
    if (isEnter) {
      return;
    } else {
      changeThemaBox((pre) => [...pre, currentBox]);
    }
  };

  const handleBoxDelete = (event) => {
    event.preventDefault();
    const targetValue = event.target.value;
    const deletedThema = themaBox.filter((item) => item !== targetValue);
    changeThemaBox(deletedThema);
  };
  return (
    <CreateThumbnailContainer id="quizThema" ref={quizThema}>
      <ThumbnailDescription>
        <h2>
          <span>
            <FontAwesomeIcon icon={faCaretRight} />
          </span>
          퀴즈 테마 설정<sup>*필수</sup>
        </h2>
        <small>어떤 테마의 퀴즈인지 선택해주세요.</small>
      </ThumbnailDescription>
      <ButtonBox>
        <button onClick={handleClick}>연예인</button>
        <button onClick={handleClick}>BJ</button>
        <button onClick={handleClick}>아이돌</button>
        <button onClick={handleClick}>애니캐릭터</button>
        <button onClick={handleClick}>기타</button>
      </ButtonBox>
      <ThemaContainer>
        <span>
          <FontAwesomeIcon icon={faCartShopping} />
          <font>선택한 테마 </font>{" "}
        </span>
        <RederingContainer>
          {themaBox.map((item, index) => (
            <ButtonItem key={index}>
              <button value={item} onClick={handleBoxDelete}>
                {item}
              </button>
              <button value={item} onClick={handleBoxDelete}>
                x
              </button>
            </ButtonItem>
          ))}
        </RederingContainer>
      </ThemaContainer>
    </CreateThumbnailContainer>
  );
}

export default CreateThema;
