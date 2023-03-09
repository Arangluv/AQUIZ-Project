import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCheck,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
const CreateTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const NotionPart = styled.div`
  background-color: rgba(123, 143, 161, 0.2);
  border-radius: 4px;
  display: block;
  font-size: 0.8vw;
  width: 80%;
  padding-top: 1.5vh;
  padding-bottom: 1.5vh;
  /* padding-left: 1vw;
  padding-right: 1vw; */
  margin-bottom: 1vw;
  margin-top: 0.6vw;
  text-align: center;
  @media screen and (max-width: 767px) {
    margin-bottom: 1.5vh;
    p {
      span {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      font:nth-child(2) {
        font-size: 0.8vh;
      }
      font:nth-child(1) {
        font-size: 1vh;
      }
    }
  }
  h4 {
    font-size: 1.1vw;
    font-weight: 600;
    color: #676a6c;
    margin-bottom: 0.8vh;
    @media screen and (max-width: 767px) {
      font-size: 1.1vh;
    }
  }
  p {
    margin-top: 0.6rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
  }
  span {
    display: block;
  }
  p span:nth-child(1) {
    /* display: block; */
    margin-bottom: 0.6vw;
  }
  p span font:nth-child(1) {
    margin-right: 5px;
  }
`;
const TitleDescription = styled.div`
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
    font-size: 0.5vw;
    color: #676a6c;
    @media screen and (max-width: 767px) {
      font-size: 1vh;
    }
  }
`;
const UserInputTitle = styled.div`
  display: flex;
  flex-direction: column;
  input {
    height: 5vh;
    border-radius: 3px;
    border: 0.1vw solid #676a6c;
    padding-left: 0.8vw;
    font-family: "Gowun Batang", serif;
    font-size: 0.9vw;
    margin-bottom: 2vh;
    @media screen and (max-width: 767px) {
      height: 3vh;
      font-size: 1vh;
    }
  }
  input:focus {
    outline: 1px solid #676a6c;
  }
`;
const Title = styled.div`
  display: flex;
  width: 100%;
  color: #676a6c;
  font-size: 1vw;
  justify-content: space-between;
  margin-bottom: 0.8vh;
  @media screen and (max-width: 767px) {
    font-size: 1vh;
  }
`;
function CreateTitle({
  changeTitle,
  changeDescribe,
  title = "",
  describe = "",
  mainTite,
}) {
  const [length, setLength] = useState(0);
  const [describeLen, setDescribeLen] = useState(0);

  const handleChangeTitle = (event) => {
    changeTitle(event.target.value);
  };

  const handleChangeDescribe = (event) => {
    changeDescribe(event.target.value);
  };

  const handleTitleLength = (event) => {
    setLength(event.target.value.length);
  };

  const handleDescribeLen = (event) => {
    setDescribeLen(event.target.value.length);
  };
  useEffect(() => {
    if (title !== "" && describe !== "") {
      setDescribeLen(title.length);
      setLength(describe.length);
      return;
    } else {
      return;
    }
  }, []);
  return (
    <>
      <NotionPart>
        <h4>퀴즈를 만드는 사람들에게 : </h4>
        <p>
          <span>
            <font>
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </font>
            <font>논란이 될 만한 요소가 있는 부분은 최대한 지양해주세요.</font>
          </span>
          <span>
            <font>
              <FontAwesomeIcon icon={faCheck} />
            </font>
            <font>"퀴즈 공개하기"를 누르면 퀴즈가 공개 및 저장됩니다.</font>
          </span>
        </p>
      </NotionPart>
      <CreateTitleContainer id="mainTitle" ref={mainTite}>
        <TitleDescription>
          <h2>
            <span>
              <FontAwesomeIcon icon={faCaretRight} />
            </span>
            퀴즈 제목 설정
          </h2>
          <small>모두가 알아볼 수 있는 퀴즈제목이면 더 좋아요!</small>
        </TitleDescription>
        <UserInputTitle>
          <Title>
            <span>
              제목<sup>*필수</sup>
            </span>
            <span>{length}/30</span>
          </Title>
          <input
            onInput={handleTitleLength}
            onChange={handleChangeTitle}
            type="text"
            maxLength="30"
            placeholder="예) 장원영 퀴즈"
            value={title}
          />
        </UserInputTitle>
        <UserInputTitle>
          <div>
            <Title>
              <span>
                퀴즈에 대한 짧은 설명<sup>*필수</sup>
              </span>
              <span>{describeLen}/50</span>
            </Title>
          </div>
          <input
            onInput={handleDescribeLen}
            onChange={handleChangeDescribe}
            type="text"
            maxLength="50"
            placeholder="예) 당신은 장원영을 얼마나 잘 아나요?"
            value={describe}
          />
        </UserInputTitle>
      </CreateTitleContainer>
    </>
  );
}

export default CreateTitle;
