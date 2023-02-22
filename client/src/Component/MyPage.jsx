import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams, Link } from "react-router-dom";
import Quiz from "./Quiz";
import styled from "styled-components";
const SubBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
  margin-top: 1vw;
  margin-bottom: 0.8vw;
  a {
    color: #3e6d9c;
    border: 1px solid rgba(103, 106, 108, 0.6);
    border-radius: 3px;
    background-color: white;
    padding: 0.8vw 0.6vw;
    font-size: 1vw;
    transition: 0.1s ease-in-out;
  }
  a:hover {
    background-color: rgba(62, 109, 156, 0.8);
    border: 1px solid white;
    color: white;
  }
  a:nth-child(1) {
    margin-right: 1vw;
  }
`;
const EditContainer = styled.div``;
const OptionBox = styled.div``;
const OptionButton = styled.button`
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
  }
`;
const MainContainer = styled.main`
  padding-left: 2vw;
  padding-right: 2vw;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const SubContainer = styled.div`
  display: grid;
  margin-bottom: 0.3vw;
  height: 100%;
  padding-bottom: 0.3vw;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(50%, auto));
  row-gap: 0.3vw;
  column-gap: 0.3vw;
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, auto);
    row-gap: 0.6vh;
    column-gap: 0.6vh;
  }
`;
const BannerAD = styled.div`
  width: calc(100% - 0.3vw);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  height: 100%;
  background-color: white;
  grid-column: 2 / span 2;
  @media screen and (max-width: 767px) {
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
    font-size: 10vh;
  }
`;
function MyPage() {
  const [quizList, setQuizList] = useState([]);
  const [mode, setMode] = useState("maked");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [query, setQuery] = useState("");
  const [orderColor, setOrderColor] = useState(true);
  const userId = useParams().id;
  const [cookies] = useCookies("token");
  const navigate = useNavigate();
  // Check Admin
  const [isAdmin, setIsAdmin] = useState(false);

  // Url Params Check
  useEffect(() => {
    const regex = /([0-9a-f]{24})/;
    if (!regex.test(userId)) {
      navigate("/not");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!cookies.token) {
      alert("잘못된 접근 입니다.");
      navigate("/login");
    }
    const getToken = cookies.token.token;
    console.log("query");
    console.log(query);
    fetch(
      `http://localhost:4001/quizzes/maked/${userId}${
        query ? query : "?opt=maked"
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("퀴즈를 불러오는데 실패했습니다");
        }
      })
      .then((result) => {
        const { quizzes, user } = result;
        const { email, username } = user;
        if (
          email === process.env.REACT_APP_ADMIN_EMAIL &&
          username === process.env.REACT_APP_ADMIN_NAME
        ) {
          setIsAdmin(true);
        }
        const mainList = [];
        let subList = [];
        if (mode === "maked") {
          for (let i = 0; i < quizzes.length; i++) {
            // 데이터를 4개 단위로 sub list에 넣음
            if (i % 6 === 0 && i !== 0) {
              mainList.push(subList);
              subList = [];
            }
            if (i % 5 === 0 && i !== 0) {
              subList.push("AD");
            }
            subList.push(quizzes[i]);
            if (i === quizzes.length - 1) {
              mainList.push(subList);
            }
          }
        } else {
          for (let i = 0; i < quizzes.length; i++) {
            if (i % 6 === 0 && i !== 0) {
              mainList.push(subList);
              subList = [];
            }
            if (i % 5 === 0 && i !== 0) {
              subList.push("AD");
            }

            subList.push(quizzes[i].solvedQuiz);

            if (i === quizzes.length - 1) {
              mainList.push(subList);
            }
          }
        }
        setQuizList([...mainList]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error); // 리뷰를 받아오는데 실패하면 error 객체를 assignment해준다.
        console.log("퀴즈를 받아오는데 에러가 발생했습니다 🔴"); // dev Option
      });
  }, [query]);

  const handleGetSolvedProblem = () => {
    setQuery("?opt=solved");
    setOrderColor(!orderColor);
    setMode("solved");
  };
  const handleGetMakedProblem = () => {
    setQuery("?opt=maked");
    setOrderColor(!orderColor);
    setMode("maked");
  };
  const handleDelete = (event) => {
    if (window.confirm("퀴즈를 삭제하시겠습니까?")) {
      const getToken = cookies.token.token;
      const quizIdForDelete = event.target.dataset.quizid;
      fetch(`http://localhost:4001/quizzes/delete/${quizIdForDelete}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: getToken }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("퀴즈를 성공적으로 삭제했습니다.");
            window.location.reload();
          } else {
            throw new Error("퀴즈를 삭제하는데 문제가 발생했습니다.");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("퀴즈를 삭제하는데 문제가 발생했습니다.");
        });
    } else {
      return;
    }
  };
  return (
    <>
      <SubBar>
        <OptionBox>
          <OptionButton onClick={handleGetMakedProblem} color={orderColor}>
            내가 만든 문제
          </OptionButton>
          <OptionButton onClick={handleGetSolvedProblem} color={!orderColor}>
            내가 푼 문제
          </OptionButton>
        </OptionBox>
        <EditContainer>
          <Link to="edit">내 정보 수정하기</Link>
          {isAdmin ? <Link to="/admin">관리자페이지</Link> : null}
        </EditContainer>
      </SubBar>
      <MainContainer>
        {isLoading && isError
          ? null
          : quizList.map((subQuiz) => {
              return (
                <SubContainer quantity={subQuiz.length}>
                  {subQuiz.map((quiz, idx) => {
                    if (idx === 5) {
                      return (
                        <BannerAD>
                          <span>파트너스 광고</span>
                        </BannerAD>
                      );
                    }
                    const { quizDescribe, quizTitle, thumnailUrl, _id, meta } =
                      quiz;
                    const { correctRate, view } = meta;
                    if (mode === "maked") {
                      return (
                        <Quiz
                          key={_id}
                          quizDescribe={quizDescribe}
                          quizTitle={quizTitle}
                          thumnailUrl={thumnailUrl}
                          quizId={_id}
                          correctRate={correctRate}
                          view={view}
                          handleDelete={handleDelete}
                          mode={mode}
                        />
                      );
                    } else {
                      return (
                        <Quiz
                          key={_id}
                          quizDescribe={quizDescribe}
                          quizTitle={quizTitle}
                          thumnailUrl={thumnailUrl}
                          quizId={_id}
                          correctRate={correctRate}
                          view={view}
                        />
                      );
                    }
                  })}
                </SubContainer>
              );
            })}
      </MainContainer>
    </>
  );
}

export default MyPage;
