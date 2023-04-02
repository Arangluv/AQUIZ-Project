import { useState, useEffect } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import ReactHelmet from "./ReactHelmet";
import Quiz from "./Quiz";
import SerchArea from "./SerchAera";
import { getQuiz } from "../api";
import styled from "styled-components";
import GoogleAdvertise from "./GoogleAdvertise";
// import bannerContainer from "../assets/bannerData";
const Test = styled.div`
  width: 100%;
  display: ${({ hasNext, isLoading }) =>
    hasNext && !isLoading ? "block" : "none"};
`;
const StyledSearchArea = styled(SerchArea)`
  display: flex;
  justify-content: space-between;
  height: auto;
  background-color: ${(props) => props.theme.bgColor};
  transition: 0.2s ease-in-out;
  margin-bottom: 1vw;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
  @media screen and (max-width: 767px) {
    padding-left: 2vh;
    padding-right: 2vh;
    height: auto;
    margin-bottom: 1vh;
  }
`;
const BannerAD = styled.div`
  width: calc(100% - 0.3vw);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};
  border: 0.1vw solid ${(props) => props.theme.textColor};
  grid-column: 2 / span 2;
  ins {
    display: block;
    height: 40vh;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: center;
    &[data-ad-status="unfilled"] {
      display: none !important;
    }
    @media screen and (max-width: 767px) {
      /* 모바일 */
      height: 30vh;
    }
  }

  @media screen and (max-width: 767px) {
    /* 모바일 */
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
    font-size: 10vh;
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
    /* 모바일 */
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, auto);
    row-gap: 0.6vh;
    column-gap: 0.6vh;
  }
`;
const ErrorMsg = styled.span`
  font-size: 2vw;
  margin-top: 10vw;
  text-align: center;
  display: block;
  @media screen and (max-width: 767px) {
    font-size: 1.5vh;
  }
`;

function QuizScreens() {
  const [quizList, setQuizList] = useState([]);
  const [totalQuiz, setTotalQuiz] = useState([]); // 이렇게 구현해도 될까 메모리 낭비가 심하지는 않을까?
  // Next page Validation
  const [nextPage, setNextPage] = useState(true);
  // User search qurey
  const [page, setPage] = useState(0);
  const LIMIT = 6;
  const [order, setOrder] = useState("solved"); // Default value = solved
  const [thema, setThema] = useState([]);
  const [rating, setRating] = useState("high");
  const [ref, inView] = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Search State
  const [quizSearchInput, setQuizSearchInput] = useState("");
  const handleLoad = async () => {
    setIsLoading(true);
    if (quizSearchInput) {
      try {
        const quizzes = await getQuiz(
          page,
          LIMIT,
          order,
          thema,
          rating,
          quizSearchInput
        );
        setNextPage(quizzes.length === 6);
        if (quizzes.length > 0) {
          setPage((pre) => pre + 1);
        }
        const newQuizzes = [...quizzes];
        const mainList = [];
        let subList = [];
        let count = 0;
        for (let i = 0; i < newQuizzes.length; i++) {
          // 데이터를 4개 단위로 sub list에 넣음
          if (count % 6 === 0 && count !== 0) {
            mainList.push(subList);
            subList = [];
            count = 0;
          }
          if (count % 5 === 0 && count !== 0) {
            subList.push("AD");
          }
          subList.push(newQuizzes[i]);
          if (i === newQuizzes.length - 1) {
            if (count === 4) {
              subList.push("AD");
            }
            mainList.push(subList);
          }
          count++;
        }
        setQuizList([...mainList]);
        setTotalQuiz([...newQuizzes]);
      } catch (error) {
        console.log("퀴즈를 받아오는데 에러가 발생했습니다 🔴"); // dev Option
      }
    } else {
      try {
        const quizzes = await getQuiz(
          page,
          LIMIT,
          order,
          thema,
          rating,
          quizSearchInput
        );
        setNextPage(quizzes.length === 6);
        if (quizzes.length > 0) {
          setPage((pre) => pre + 1);
        }
        const newQuizzes = [...totalQuiz, ...quizzes];
        const mainList = [];
        let subList = [];
        let count = 0;
        for (let i = 0; i < newQuizzes.length; i++) {
          // 데이터를 4개 단위로 sub list에 넣음
          if (count % 6 === 0 && count !== 0) {
            mainList.push(subList);
            subList = [];
            count = 0;
          }
          if (count % 5 === 0 && count !== 0) {
            subList.push("AD");
          }
          subList.push(newQuizzes[i]);
          if (i === newQuizzes.length - 1) {
            if (count === 4) {
              subList.push("AD");
            }
            mainList.push(subList);
          }
          count++;
        }
        setQuizList([...mainList]);
        setTotalQuiz([...newQuizzes]);
      } catch (e) {
        console.log("퀴즈를 받아오는데 에러가 발생했습니다 🔴"); // dev Option
        setError(e);
      }
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (inView && nextPage) {
        handleLoad();
      }
    }
    setIsLoading(false);
  }, [inView, order, nextPage, quizSearchInput]);

  useEffect(() => {
    setQuizList([]);
    setTotalQuiz([]);
    setPage(0);
    setNextPage(true);
  }, [order, rating, thema, quizSearchInput]);

  return (
    <>
      <ReactHelmet
        description="나만의 퀴즈를 만들고 사람들과 공유하며 풀 수 있는 공간으로, 연예인, 아이돌, 애니메이션 캐릭터 등 각종 다양한 퀴즈를 만들고 풀 수 있습니다."
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <StyledSearchArea
        setOrder={setOrder}
        loading={isLoading}
        setThema={setThema}
        setRating={setRating}
        quizSearchInput={quizSearchInput}
        setQuizSearchInput={setQuizSearchInput}
      />
      <MainContainer>
        {!error ? (
          quizList.map((subQuiz, quizListIdx) => {
            return (
              <SubContainer quantity={subQuiz.length} key={quizListIdx}>
                {subQuiz.map((quiz, idx) => {
                  if (idx === 5) {
                    return (
                      <BannerAD key={idx}>
                        <GoogleAdvertise
                          client="ca-pub-3501932649640285"
                          slot="4427930012"
                          format="auto"
                          responsive="true"
                        />
                      </BannerAD>
                    );
                  }

                  const { quizDescribe, quizTitle, thumnailUrl, _id, meta } =
                    quiz;
                  const { correctRate, view } = meta;
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
                })}
              </SubContainer>
            );
          })
        ) : (
          <ErrorMsg>
            퀴즈를 불러오는데 실패했습니다. 새로고침 후 다시 이용해주세요
          </ErrorMsg>
        )}
      </MainContainer>
      <Test ref={ref} hasNext={nextPage} isLoading={isLoading}></Test>
    </>
  );
}

export default QuizScreens;
