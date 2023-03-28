import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlagCheckered,
  faShare,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const StyledQuiz = styled.article`
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 1%;
  position: relative;
  display: flex;
  width: calc(100% - 0.3vw);
  height: 100%;
  flex-direction: column;
  &:hover {
    box-shadow: 0.1vw 0.1vw 0.1vw ${(props) => props.theme.textColor};
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const ImageSection = styled.div`
  width: 100%;
  height: 40vh;
  overflow: hidden;
  margin-bottom: 1vw;
  @media screen and (max-width: 767px) {
    margin-bottom: 1vh;
    height: 30vh;
  }
`;
const QuizImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;
const QuizDescrptionPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40%;
  padding-left: 0.6vw;
  @media screen and (max-width: 767px) {
    height: 30%;
  }
`;
const QuizTilte = styled.h4`
  color: ${(props) => props.theme.quizTextColor};
  font-weight: 600;
  font-size: 1.5vw;
  margin-bottom: 0.5vw;
  @media screen and (max-width: 767px) {
    font-size: 2vh;
  }
`;
const QuizShortDescrtion = styled.span`
  font-size: 1vw;
  white-space: normal;
  color: ${(props) => props.theme.quizTextColor};
  display: block;
  padding-left: 0.4vw;
  margin-bottom: 1vw;
  @media screen and (max-width: 767px) {
    font-size: 1.4vh;
    padding-left: 0.4vh;
  }
`;
const QuizMetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 0.6vw;
  margin-bottom: 0.5vw;
  span {
    font-size: 1vw;
    color: ${(props) => props.theme.textColor};
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 767px) {
      font-size: 1.4vh;
    }
    font:nth-child(1) {
      margin-right: 0.1vw;
    }
    font:nth-child(1) {
      span {
        display: inline;
        color: ${({ correctRate }) => {
          if (correctRate > 80) {
            return "#82CD47";
          } else if (correctRate > 40) {
            return "#095bbf";
          } else {
            return "#E0144C";
          }
        }};
      }
    }
    font:nth-child(2) {
      span {
        display: inline;
        font-weight: 600;
      }
    }
  }
`;
const UserParticipationArea = styled.div`
  display: flex;
  margin-bottom: 0.6vw;
  @media screen and (max-width: 767px) {
    margin-top: 0.5vh;
    margin-bottom: 1vh;
  }
  a {
    display: block;
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 5%;
    font-size: 1vw;
    padding: 0.3vw 0.4vw;

    font {
      margin-right: 0.3vw;
    }
    @media screen and (max-width: 767px) {
      font-size: 1.6vh;
      padding: 0.4vh 0.6vh;
    }
  }
  a:nth-child(1) {
    border: 0.1px solid #e14d2a;
    color: #e14d2a;
    margin-right: 0.4vw;
    transition: 0.2s ease-in-out;
  }
  a:nth-child(1):hover {
    border: 0.1px solid white;
    color: white;
    background-color: #e14d2a;
  }
  a:nth-child(2) {
    border: 0.1px solid #3e6d9c;
    color: #3e6d9c;
    margin-right: 0.4vw;
  }
  a:nth-child(2):hover {
    border: 0.1px solid white;
    color: white;
    background-color: #3e6d9c;
    margin-right: 0.4vw;
  }
  a:nth-child(3) {
    border: 0.1px solid #1f8a70;
    color: #1f8a70;
    margin-right: 0.4vw;
    transition: 0.2s ease-in-out;
  }
  a:nth-child(3):hover {
    border: 0.1px solid white;
    color: white;
    background-color: #1f8a70;
  }
`;
const DeleteBnt = styled.button`
  position: absolute;
  background-color: white;
  top: 0.3vw;
  right: 0.3vw;
  padding: 0.3vw 0.4vw;
  border: 0.1px solid #e14d2a;
  color: #e14d2a;
  border-radius: 5%;
  transition: 0.1s ease-in-out;
  font {
    margin-right: 0.2vw;
  }
  &:hover {
    border: 0.1px solid #e14d2a;
    color: white;
    background-color: #e14d2a;
  }
  @media screen and (max-width: 767px) {
    font-size: 1vw;
    padding: 0.2vh 0.4vh;
    top: 0.3vh;
    right: 0.3vh;
    font {
      margin-right: 0.2vh;
      font-size: 1vh;
    }
  }
`;
const DIV = styled.div`
  display: flex;
  flex-direction: column;
`;
function Quiz({
  quizDescribe,
  quizTitle,
  thumnailUrl,
  quizId,
  view = 0,
  correctRate = 0,
  mode = "default",
  handleDelete = null,
}) {
  const handleShare = (event) => {
    const BASE_URL = "https://aquiz.co.kr/quiz/";
    const sharedUrl = BASE_URL + event.target.dataset.quizid;
    navigator.clipboard
      .writeText(sharedUrl)
      .then(() => {
        console.log(`Copied ${sharedUrl} to clipboard`);
        alert("링크가 복사되었습니다.");
      })
      .catch((err) => {
        console.error(`Failed to copy ${sharedUrl} to clipboard: ${sharedUrl}`);
      });
  };
  return (
    <StyledQuiz>
      <ImageSection>
        {thumnailUrl ? (
          <QuizImage
            src={`https://aquizbuket.s3.ap-northeast-2.amazonaws.com/${thumnailUrl}`}
            alt="thumbnail"
          />
        ) : null}
      </ImageSection>
      <QuizDescrptionPart>
        <div>
          <QuizTilte>{quizTitle}</QuizTilte>
          <QuizShortDescrtion>{quizDescribe}</QuizShortDescrtion>
        </div>
        <DIV>
          <UserParticipationArea>
            <Link to={`/quiz/${quizId}`}>
              <font>
                <FontAwesomeIcon icon={faFlagCheckered}></FontAwesomeIcon>
              </font>
              시작하기
            </Link>
            <Link onClick={handleShare} data-quizid={quizId}>
              <font>
                <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
              </font>
              공유하기
            </Link>
            {mode === "maked" || mode === "admin" ? (
              <>
                <Link to={`/quiz/edit/${quizId}`}>
                  <font>
                    <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                  </font>
                  수정하기
                </Link>
                <DeleteBnt data-quizid={quizId} onClick={handleDelete}>
                  <font>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </font>
                  삭제
                </DeleteBnt>
              </>
            ) : null}
          </UserParticipationArea>
          <QuizMetaInfo correctRate={correctRate}>
            <span>
              <font>
                정답률 <span>{correctRate.toFixed(1)}%</span>
              </font>
              <font>
                문제를 푼 사람 <span>{view}명</span>
              </font>
            </span>
          </QuizMetaInfo>
        </DIV>
      </QuizDescrptionPart>
    </StyledQuiz>
  );
}

export default Quiz;
