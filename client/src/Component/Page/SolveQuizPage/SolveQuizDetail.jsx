import SolveTypeMulti from "./SolveTypeMulti";
import SolveTypeSingle from "./SolveTypeSingle";
import SolveTypeWord from "./SolveTypeWord";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import bannerContainer from "../../../assets/bannerData";
const QuizDetailContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const BannerAd = styled.div`
  background-color: white;
  width: 15%;
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
  iframe {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 767px) {
    height: 70vh;
  }
`;
const Outlet = styled.div`
  width: 70%;
  padding-left: 2vw;
  padding-right: 2vw;
  border-radius: 3px;
  padding-top: 3vw;
  padding-bottom: 3vw;
  background-color: white;
  border: 1px solid rgba(103, 106, 108, 0.6);
  margin: 0 3vw;
  @media screen and (max-width: 767px) {
    padding-top: 3vh;
    padding-bottom: 3vh;
    width: 70%;
  }
  h2 {
    span {
      font-size: 1.5vw;
      color: #676a6c;
      display: block;
      margin-bottom: 2vw;
      @media screen and (max-width: 767px) {
        font-size: 1.5vh;
        margin-bottom: 1vh;
      }
    }
  }
`;
const QuizDescription = styled.p`
  font-size: 1.2vw;
  color: rgb(103, 106, 108);
  display: flex;
  flex-direction: column;
  margin-bottom: 2vw;
  @media screen and (max-width: 767px) {
    margin-bottom: 2vh;
    font-size: 1.4vw;
  }
  font {
    margin-bottom: 1vw;
    @media screen and (max-width: 767px) {
      margin-bottom: 1vh;
      font-size: 1vh;
    }
    span {
      margin-right: 0.3vw;
    }
  }
  span:nth-child(2) {
    border: 1px solid rgba(103, 106, 10, 0.2);
    border-radius: 3px;
    padding: 1vw 2vw;
    @media screen and (max-width: 767px) {
      padding: 1vh 2vh;
    }
  }
`;
const ImageSecgtion = styled.div`
  margin-top: 1vw;
  margin-bottom: 1vw;
  /* display: flex; */
  display: ${({ imgUrl }) => (imgUrl ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  height: 65vh;
  width: 100%;
  border: 1px solid rgba(103, 106, 108, 0.3);
  border-radius: 3px;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    height: 40vh;
    border: 0.1vw solid rgba(103, 106, 108, 0.3);
    margin-bottom: 1vh;
  }
`;

const QuizImage = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
`;
const NotionSmall = styled.small`
  display: block;
  margin-bottom: 0.5vw;
  font-size: 1.2vw;
  color: rgba(103, 106, 108, 0.9);
  span {
    display: flex;
    justify-content: space-between;
    font:nth-child(2) {
      color: ${({ correctRate }) => {
        if (Number(correctRate) > 0.8) {
          return "#03C988 ";
        } else if (correctRate > 0.45) {
          return "#7286D3";
        } else {
          return "#D61355";
        }
      }};
      /* D61355 빨강 */
      /* 7286D3 파랑 */
      /* 03C988 */
    }
  }
`;
function SolveQuizDetail({
  imgUrl,
  type,
  questions,
  quizNum,
  quizLenth,
  onClick,
  quizDescribe,
  quizCorrectRate,
}) {
  let questionType, notion;
  if (type === "single") {
    notion = "하나의 답을 선택해주세요";
    questionType = (
      <SolveTypeSingle
        questions={questions}
        quizNum={quizNum}
        quizLenth={quizLenth}
        onClick={onClick}
      />
    );
  } else if (type === "multi") {
    notion = "두개 이상의 답을 선택해주세요 (두 개 이상입니다.)";
    questionType = (
      <SolveTypeMulti
        questions={questions}
        quizNum={quizNum}
        quizLenth={quizLenth}
        onClick={onClick}
      />
    );
  } else if (type === "word") {
    notion = "단어를 입력해주세요.";
    questionType = (
      <SolveTypeWord
        questions={questions}
        quizNum={quizNum}
        quizLenth={quizLenth}
        onClick={onClick}
      />
    );
  } else {
    questionType = null;
  }
  return (
    <QuizDetailContainer>
      <BannerAd>{bannerContainer[Math.floor(Math.random() * 4)]}</BannerAd>
      <Outlet>
        <h2>
          <span>문제 {quizNum + 1}번</span>
        </h2>
        <QuizDescription>
          <font>
            <span>문제</span>
            <FontAwesomeIcon icon={faVolumeLow}></FontAwesomeIcon>{" "}
          </font>
          <span>{quizDescribe}</span>
        </QuizDescription>
        <ImageSecgtion imgUrl={imgUrl}>
          {imgUrl ? (
            <QuizImage
              src={`https://aquizbuket.s3.ap-northeast-2.amazonaws.com/${imgUrl}`}
              alt="문제에 쓰이는 사진들입니다."
            />
          ) : null}
        </ImageSecgtion>
        <NotionSmall correctRate={Number(quizCorrectRate)}>
          <span>
            <font>{notion}</font>
            <font>정답률:{`${Number(quizCorrectRate * 100).toFixed(1)}%`}</font>
          </span>
        </NotionSmall>
        {questionType}
      </Outlet>
      <BannerAd>{bannerContainer[Math.floor(Math.random() * 4)]}</BannerAd>
    </QuizDetailContainer>
  );
}

export default SolveQuizDetail;
