import AfterSolvedDetail from "./AfterSolveDetail";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import ReactHelmet from "../../ReactHelmet";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faUser,
  faPen,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import bannerContainer from "../../../assets/bannerData";
import URL from "../../../assets/url";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AfterSolvedContainer = styled.div`
  padding: 2vw 1vw;
  border: 1px solid red;
  width: 80%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(103, 106, 108, 0.6);
  border-radius: 3px;
  h1 {
    font-size: 1.3vw;
    margin-top: 1vw;
    font-weight: 600;
    color: #676a6c;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
      margin-bottom: 0.5vh;
    }
  }
  button {
    width: calc(80% + 1.6vw);
    margin-top: 0.5vw;
    font-size: 1.5vw;
    padding: 1vw 0;
    color: #205295;
    border: 0.1vw solid #205295;
    background-color: white;
    border-radius: 3px;
    transition: 0.1s ease-in-out;
    @media screen and (max-width: 767px) {
      font-size: 1.5vh;
      border: 0.2vw solid #205295;
      padding: 1vh 0;
      width: calc(80% + 1.6vh);
    }
  }
  button:hover {
    background-color: #205295;
    color: white;
    cursor: pointer;
  }
`;
const AdContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1vw;
  height: 20vh;
  iframe {
    height: 20vh;
    width: 100%;
    @media screen and (max-width: 767px) {
      height: 16vh;
    }
  }
`;
const CommunicationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1vw;
  width: calc(80% + 1.6vw);
  padding: 1vw 0;
  background-color: white;
  border-radius: 3px;
  border: 1px solid rgba(103, 106, 108, 0.8);
  min-height: 10vh;
  height: auto;
  @media screen and (max-width: 767px) {
    width: calc(80% + 1.6vh);
    min-height: 6vh;
    padding: 1vh 0;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    label {
      display: flex;
      margin-bottom: 0.6vw;
      width: calc(60% + 1.2vw);
      justify-content: baseline;
      align-items: center;
      @media screen and (max-width: 767px) {
        margin-bottom: 0.6vh;
        width: calc(60% + 1.2vh);
      }
      font {
        margin-right: 0.2vw;
        @media screen and (max-width: 767px) {
          margin-right: 0.2vh;
        }
      }
      span {
        font-size: 1.2vw;
        color: #676a6c;
        @media screen and (max-width: 767px) {
          font-size: 1.2vh;
        }
      }
    }
    input {
      width: 60%;
      margin-bottom: 1vw;
      padding: 0.6vw 0.8vw;
      color: #676a6c;
      @media screen and (max-width: 767px) {
        -webkit-appearance: none;
        -webkit-border-radius: 2px;
        -webkit-border: 0.1vw solid #676a6c;
        padding: 0.4vh 0.6vh;
        font-size: 1vh;
        margin-bottom: 1vh;
      }
    }
    textarea {
      width: 60%;
      padding: 0.6vw 0.8vw;
      color: #676a6c;
      min-height: 10vh;
      margin-bottom: 1vw;
      @media screen and (max-width: 767px) {
        padding: 0.4vh 0.6vh;
        font-size: 1vh;
        -webkit-appearance: none;
        -webkit-border-radius: 2px;
        -webkit-border: 0.1vw solid #676a6c;
      }
    }
    input[type="submit"] {
      width: calc(60% + 1.6vw);
      background-color: white;
      border: 0.1vw solid #205295;
      color: #205295;
      font-size: 1.2vw;
      padding: 1vw 0;
      margin-bottom: 0.6vw;
      border-radius: 3px;
      transition: 0.1s ease-in-out;
      @media screen and (max-width: 767px) {
        width: calc(60% + 1.2vh);
        font-size: 1.1vh;
        padding: 1vh 0;
        margin-bottom: 0.6vh;
      }
    }
    input[type="submit"]:hover {
      color: white;
      cursor: pointer;
      background-color: #205295;
    }
  }
  button:last-child {
    width: calc(60% + 1.6vw);
    background-color: white;
    border: 0.1vw solid #205295;
    color: #205295;
    padding: 0.5vw 0;
    border-radius: 3px;
    transition: 0.1s ease-in-out;
    @media screen and (max-width: 767px) {
      width: calc(60% + 1.2vh);
      font-size: 1.2vh;
      padding: 0.8vh 0;
      margin-top: 0.5vh;
    }
  }
  button:last-child:hover {
    color: white;
    cursor: pointer;
    background-color: #205295;
  }
`;
const Board = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(60% + 1.6vw);
  @media screen and (max-width: 767px) {
    width: calc(60% + 1.2vh);
  }
  font {
    margin-right: 0.2vw;
    @media screen and (max-width: 767px) {
      margin-right: 0.2vh;
    }
  }
  span {
    font-size: 1.2vw;
    color: #676a6c;
    text-align: center;
    width: 100%;
    display: flex;
    @media screen and (max-width: 767px) {
      font-size: 1.2vh;
    }
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(60% + 1.6vw);
  margin-top: 1vw;
  @media screen and (max-width: 767px) {
    width: calc(60% + 1.2vh);
    margin-top: 0.7vh;
  }
`;
const ContentDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border: 0.1vw solid #676a6c;
  border-radius: 3px;
  padding: 0.8vw 0.6vw;
  margin-bottom: 0.2vw;
  @media screen and (max-width: 767px) {
    padding: 0.8vh 0.6vh;
    margin-bottom: 0.2vh;
  }
`;
const UserInfo = styled.div`
  margin-bottom: 0.5vw;
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    margin-bottom: 0.5vh;
  }
  span {
    color: #676a6c;
    font-weight: 600;
    font-size: 1vw;
    margin-right: 0.8vw;
    @media screen and (max-width: 767px) {
      font-size: 1.1vh;
    }
  }
  font {
    color: rgba(103, 106, 108, 0.8);
  }
`;
function AfterSolved() {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState(null);
  const [isError, setIsError] = useState(null);
  const quizId = useParams().id;
  // Community
  const [nickname, setNickname] = useState("익명");
  const [content, setContent] = useState("");
  const [userComments, setUserComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  // User Input Answer
  const { inputAnswerToUser, selectedQuizId } = location.state; // SolveQuiz에서 넘어온 데이터를 받는다.
  // loading State
  const [loading, setLoading] = useState(true);
  // Comment Page Nation
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(true);
  const LIMIT = 10;
  useEffect(() => {
    const regex = /([0-9a-f]{24})/;
    if (!regex.test(quizId)) {
      navigate("/not");
    }
  }, []);
  useEffect(() => {
    setLoading(true);
    if (inputAnswerToUser) {
      fetch(`${URL}quizzes/solve/${selectedQuizId}/?page=0&limit=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("퀴즈 정답을 불러오는데 오류가 발생했습니다.");
          }
        })
        .then((result) => {
          const quizzes = result.quiz.quizzes;
          const view = result.quiz.meta.view;
          const userComment = result.userComment;
          setTotalComments(result.totalComments);
          if (userComment.length === LIMIT) {
            setPage((pre) => pre + 1);
          } else {
            setNextPage(false);
          }
          setUserComments([...userComment]);
          if (result?.username) {
            setNickname(result.username);
          }
          const newQuizList = quizzes.map((quiz, idx) => {
            return (
              <AfterSolvedDetail
                inputAnswerToUser={inputAnswerToUser[idx]}
                key={quiz.id}
                quizCorrectRate={quiz.quizCorrectRate}
                view={view}
                commetary={quiz.commetary}
                title={quiz.quizDescribe}
                imgUrl={quiz.imgUrl}
                questions={quiz.questions}
                type={quiz.type}
              />
            );
          });
          setQuizList(newQuizList);
        })
        .catch((error) => {
          console.log(error);
          setIsError(error);
        });
      // 문제를 풀지 않은 경우만 fetch -> add-quiz
      fetch(`${URL}users/add-quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          quizId: selectedQuizId,
          inputAnswerToUser,
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
    } else {
      // inputAnswerToUser에 답이 없는 경우 -> 사용자가 이미 풀었다.
      fetch(`${URL}quizzes/solve/${selectedQuizId}?page=0&limit=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("퀴즈 정답을 불러오는데 오류가 발생했습니다.");
          }
        })
        .then((result) => {
          return {
            quizzes: result.quiz.quizzes,
            userInput: result.inputAnswersToUser.userInputList,
            username: result?.username,
            userComment: result.userComment,
            totalComments: result.totalComments,
            view: result.quiz.meta.view,
          };
        })
        .then((data) => {
          const {
            quizzes,
            userInput,
            username,
            userComment,
            totalComments,
            view,
          } = data;
          console.log(data);
          setTotalComments(totalComments);
          if (userComment.length === LIMIT) {
            setPage((pre) => pre + 1);
          } else {
            setNextPage(false);
          }
          setUserComments([...userComment]);
          if (username) {
            setNickname(username);
          }
          const newQuizList = quizzes.map((quiz, idx) => {
            return (
              <AfterSolvedDetail
                inputAnswerToUser={userInput[idx]}
                key={quiz.id}
                commetary={quiz.commetary}
                title={quiz.quizDescribe}
                imgUrl={quiz.imgUrl}
                questions={quiz.questions}
                type={quiz.type}
                quizCorrectRate={quiz.quizCorrectRate}
                view={view}
              />
            );
          });
          setQuizList(newQuizList);
        })
        .catch((error) => {
          console.log(error);
          setIsError(error);
        });
    }
    setLoading(false);
  }, []);

  const handleMoreQuizClick = () => {
    return navigate("/");
  };
  const handleNickname = (event) => {
    setNickname(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };
  const handleSaveContent = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `${URL}quizzes/add-comment/${selectedQuizId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          content,
        }),
      }
    );
    if (response.ok) {
      const result = await response.json();
      const { userComment } = result;
      setUserComments([...userComment]);
      setContent("");
      setTotalComments((pre) => pre + 1);
      setNextPage(true);
      setPage(1);
      return;
    } else {
      const error = new Error("댓글을 저장하는데 오류가 발생했습니다.");
      setIsError(error);
    }
  };
  const handleMoreComment = () => {
    fetch(
      `${URL}quizzes/getComment/${selectedQuizId}/?page=${page}&limit=${LIMIT}`
    )
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          throw new Error("댓글을 불러오는데 실패했습니다.");
        }
      })
      .then((result) => {
        const { userComment } = result;
        console.log(result);
        if (!nextPage) {
          return;
        }
        setUserComments([...userComment]);
        if (totalComments - userComment.length === 0) {
          setNextPage(false);
        } else {
          setPage((pre) => pre + 1);
        }
      })
      .catch((error) => {
        setIsError(error);
        console.log(error);
      });
  };
  return loading && isError ? null : (
    <MainContainer>
      <ReactHelmet
        description="내가 풀었던 퀴즈에 대해 틀렸는지 맞았는지 확인할 수 있습니다. 풀었던 퀴즈에 대한 다른사람들의 생각을 자유게시판에서 확인할 수 있으며, 자유롭게 내 생각도 적어볼 수 있습니다."
        title="AQUIZ, 퀴즈메이커 - 정답 확인하기"
        pageTitle="AQUIZ, 퀴즈메이커 - 정답 확인하기"
      />
      <AfterSolvedContainer>
        <h1>나는 얼마나 맞았을까?</h1>
        {quizList === null
          ? null
          : quizList.map((quiz) => {
              return quiz;
            })}
        <button onClick={handleMoreQuizClick}>
          다른 퀴즈 더보기
          <font>
            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
          </font>
        </button>
      </AfterSolvedContainer>
      <AdContainer>
        {bannerContainer[Math.floor(Math.random() * 4)]}
      </AdContainer>
      <CommunicationContainer>
        <form action="POST" onSubmit={handleSaveContent}>
          <label htmlFor="nickname">
            <span>
              <font>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </font>
              닉네임
            </span>
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={handleNickname}
            value={nickname}
            required
          />
          <label htmlFor="">
            <span>
              <font>
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
              </font>
              내용
            </span>
          </label>
          <textarea
            type="text"
            placeholder="내용을 입력해주세요 (퀴즈메이커에 대한 비방은 삼가해주세요)"
            onChange={handleContent}
            value={content}
            required
          />
          <input type="submit" value="저장하기" />
        </form>
        <Board>
          <span>
            <font>
              <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon>
            </font>
            자유게시판
          </span>
        </Board>
        <Content>
          {userComments.map((comment, idx) => {
            return (
              <ContentDetail key={idx}>
                <UserInfo>
                  <span>{comment.nickname}</span>
                  <font>{comment.createAt.slice(0, 10)}</font>
                </UserInfo>
                <div>
                  <p>{comment.content}</p>
                </div>
              </ContentDetail>
            );
          })}
        </Content>
        {totalComments - userComments.length !== 0 ? (
          <button onClick={handleMoreComment}>더보기</button>
        ) : null}
      </CommunicationContainer>
    </MainContainer>
  );
}

export default AfterSolved;
