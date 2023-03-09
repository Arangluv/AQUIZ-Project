import AfterSolveTypeSingle from "./AfterSolveTypeSingle";
import AfterSolveTypeMulti from "./AfterSolveTypeMulti";
import AfterSolveTypeWord from "./AfterSolveTypeWord";
import styled from "styled-components";
const SolvedDetailContainer = styled.div`
  border: 1px solid rgba(103, 106, 108, 0.3);
  background-color: white;
  border-radius: 3px;
  padding: 0.8vw 0.8vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
  width: 80%;
  @media screen and (max-width: 767px) {
    padding: 0.8vh 0.8vh;
  }
  h2 {
    margin-bottom: 1vw;
    color: #676a6c;
    font-size: 1.3vw;
    @media screen and (max-width: 767px) {
      font-size: 2vh;
    }
    span:nth-child(1) {
      font-weight: 600;
      display: block;
      font-size: 1.5vw;
      margin-bottom: 1vw;
      @media screen and (max-width: 767px) {
        font-size: 2vh;
      }
    }
    span:nth-child(2) {
      padding-left: 1vw;
      display: block;
      margin-bottom: 1vw;
      @media screen and (max-width: 767px) {
        padding-left: 1vh;
        margin-bottom: 1vh;
      }
    }
  }
  font {
    font-size: 1vw;
    display: block;
    margin-bottom: 1vw;
    color: rgba(103, 106, 108, 1);
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
    }
    span {
      color: ${({ quizCorrectRate }) => {
        if (Number(quizCorrectRate) > 0.8) {
          return "#03C988 ";
        } else if (quizCorrectRate > 0.45) {
          return "#7286D3";
        } else {
          return "#D61355";
        }
      }};
    }
  }
`;
const ImageSection = styled.div`
  height: 40vh;
  display: ${({ imgUrl }) => (imgUrl ? "flex" : "none")};
  margin-bottom: 1vw;
  @media screen and (max-width: 767px) {
    height: 24vh;
  }
`;
const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
function AfterSolvedDetail({
  title,
  imgUrl,
  type,
  questions,
  inputAnswerToUser,
  commetary,
  view,
  quizCorrectRate,
}) {
  let questionType;
  if (type === "single") {
    questionType = (
      <AfterSolveTypeSingle
        questions={questions}
        inputAnswerToUser={inputAnswerToUser}
        commetary={commetary}
      />
    );
  } else if (type === "multi") {
    questionType = (
      <AfterSolveTypeMulti
        questions={questions}
        inputAnswerToUser={inputAnswerToUser}
        commetary={commetary}
      />
    );
  } else if (type === "word") {
    questionType = (
      <AfterSolveTypeWord
        questions={questions}
        inputAnswerToUser={inputAnswerToUser}
        commetary={commetary}
      />
    );
  } else {
    questionType = null;
  }
  return (
    <SolvedDetailContainer
      quizCorrectRate={quizCorrectRate / (view === 0 ? 1 : view)}
    >
      <h2>
        <span>문제 내용</span>
        <span>{title}</span>
      </h2>
      <font>
        퀴즈 평균 정답률 :
        <span>{`${((quizCorrectRate / (view === 0 ? 1 : view)) * 100).toFixed(
          1
        )} %`}</span>
      </font>
      <ImageSection imgUrl={imgUrl}>
        {imgUrl ? (
          <Image
            src={`https://aquizbuket.s3.ap-northeast-2.amazonaws.com/${imgUrl}`}
            alt="문제에 쓰이는 사진들입니다."
          />
        ) : null}
      </ImageSection>
      {questionType}
    </SolvedDetailContainer>
  );
}

export default AfterSolvedDetail;
