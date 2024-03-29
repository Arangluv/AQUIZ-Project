import SolveTypeMulti from "./SolveTypeMulti";
import SolveTypeSingle from "./SolveTypeSingle";
import SolveTypeWord from "./SolveTypeWord";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import GoogleAdvertise from "../../GoogleAdvertise";
import GoogleAdvertise2 from "../../GoogleAdvertise2";
// import bannerContainer from "../../../assets/bannerData";
const QuizDetailContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
`;
const BannerAd = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1vw;
  @media screen and (max-width: 767px) {
    height: 20vh;
    margin-top: 1vh;
  }
  ins {
    width: 100%;
    height: 30vh;
    display: block;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: center;
    &[data-ad-status="unfilled"] {
      display: none !important;
    }
    @media screen and (max-width: 767px) {
      height: 20vh;
    }
  }
`;
const Outlet = styled.div`
  width: 70%;
  padding-left: 2vw;
  padding-right: 2vw;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  padding-top: 3vw;
  padding-bottom: 3vw;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.textColor};
  margin: 0 3vw;
  @media screen and (max-width: 767px) {
    padding-top: 3vh;
    padding-bottom: 3vh;
    width: 70%;
    margin: 0 2vh;
  }
  h2 {
    span {
      font-size: 1.5vw;
      color: ${(props) => props.theme.textColor};
      display: block;
      margin-bottom: 2vw;
      @media screen and (max-width: 767px) {
        font-size: 2vh;
        margin-bottom: 1vh;
        font-weight: 600;
      }
    }
  }
`;
const QuizDescription = styled.p`
  font-size: 1.2vw;
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  margin-bottom: 2vw;
  @media screen and (max-width: 767px) {
    margin-bottom: 2vh;
    font-size: 1.5vh;
  }
  font {
    display: flex;
    align-items: center;
    margin-bottom: 1vw;
    @media screen and (max-width: 767px) {
      margin-bottom: 1vh;
      font-size: 1.5vh;
    }
    span {
      margin-right: 0.3vw;
    }
  }
  span:nth-child(2) {
    border: 1px solid ${(props) => props.theme.textColor};
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
    height: 30vh;
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
  color: ${(props) => props.theme.textColor};
  @media screen and (max-width: 767px) {
    font-size: 1.5vh;
  }
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
    notion = "두개 이상의 답을 선택해주세요.";
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
        <BannerAd>
          <GoogleAdvertise
            client="ca-pub-3501932649640285"
            slot="7872706221"
            // slot="4427930012"
            format="auto"
            responsive="true"
          />
        </BannerAd>
      </Outlet>
    </QuizDetailContainer>
  );
}

export default SolveQuizDetail;
