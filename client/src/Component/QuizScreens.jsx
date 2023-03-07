import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Quiz from "./Quiz";
import SerchArea from "./SerchAera";
import { getQuiz } from "../api";
import styled from "styled-components";
const Test = styled.div`
  width: 100%;
  display: ${({ hasNext, isLoading }) =>
    hasNext && !isLoading ? "block" : "none"};
`;
const StyledSearchArea = styled(SerchArea)`
  display: flex;
  justify-content: space-between;
  height: auto;
  background-color: #fffbf5;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
  @media screen and (max-width: 767px) {
    padding-left: 2vh;
    padding-right: 2vh;
    height: auto;
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
  a {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @media screen and (max-width: 767px) {
    /* 모바일 */
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
    /* height: 3vh; */
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
function QuizScreens() {
  const [quizList, setQuizList] = useState([]);
  const [totalQuiz, setTotalQuiz] = useState([]); // 이렇게 구현해도 될까 메모리 낭비가 심하지는 않을까?
  const [isError, setIsError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(true);
  const LIMIT = 6;
  // User search qurey
  const [order, setOrder] = useState("solved"); // Default value = solved
  const [thema, setThema] = useState([]);
  const [rating, setRating] = useState("high");
  const [ref, inView] = useInView();
  // Search State
  const [quizSearchInput, setQuizSearchInput] = useState("");
  // AD Container
  const bannerContainer = [
    <iframe
      src="https://ads-partners.coupang.com/widgets.html?id=645650&template=carousel&trackingCode=AF1256886&subId=&width=680&height=200"
      width="680"
      height="200"
      frameborder="0"
      scrolling="no"
      referrerpolicy="unsafe-url"
    ></iframe>,
    <iframe
      src="https://ads-partners.coupang.com/widgets.html?id=645649&template=carousel&trackingCode=AF1256886&subId=&width=680&height=200"
      width="680"
      height="200"
      frameborder="0"
      scrolling="no"
      referrerpolicy="unsafe-url"
    ></iframe>,
    <iframe
      src="https://ads-partners.coupang.com/widgets.html?id=645647&template=carousel&trackingCode=AF1256886&subId=&width=680&height=140"
      width="680"
      height="140"
      frameborder="0"
      scrolling="no"
      referrerpolicy="unsafe-url"
    ></iframe>,
    <iframe
      src="https://ads-partners.coupang.com/widgets.html?id=645638&template=carousel&trackingCode=AF1256886&subId=&width=680&height=200"
      width="680"
      height="200"
      frameborder="0"
      scrolling="no"
      referrerpolicy="unsafe-url"
    ></iframe>,
  ];
  const handleLoad = async () => {
    setLoading(true);
    try {
      const quizzes = await getQuiz(page, LIMIT, order, thema, rating);
      console.log(quizzes);
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
      setLoading(false);
    } catch (e) {
      setIsError(e); // 리뷰를 받아오는데 실패하면 error 객체를 assignment해준다.
      console.log("퀴즈를 받아오는데 에러가 발생했습니다 🔴"); // dev Option
    }
  };
  useEffect(() => {
    if (!loading) {
      if (inView && nextPage && quizSearchInput === "") {
        handleLoad();
      }
    }
  }, [inView, order]);

  useEffect(() => {
    setQuizList([]);
    setTotalQuiz([]);
    setPage(0);
    setNextPage(true);
  }, [order, rating, thema]);

  const handleSearchQuiz = async (event) => {
    event.preventDefault();
    try {
      const quizzes = await getQuiz(
        0,
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
      setPage(0);
      setNextPage(true);
      setLoading(false);
    } catch (error) {
      setIsError(error); // 리뷰를 받아오는데 실패하면 error 객체를 assignment해준다.
      console.log("퀴즈를 받아오는데 에러가 발생했습니다 🔴"); // dev Option
    }
  };
  return (
    <>
      <StyledSearchArea
        setOrder={setOrder}
        loading={loading}
        setThema={setThema}
        setRating={setRating}
        quizSearchInput={quizSearchInput}
        setQuizSearchInput={setQuizSearchInput}
        handleSearchQuiz={handleSearchQuiz}
      />
      <MainContainer>
        {!isError ? (
          quizList.map((subQuiz, quizListIdx) => {
            return (
              <SubContainer quantity={subQuiz.length} key={quizListIdx}>
                {subQuiz.map((quiz, idx) => {
                  if (idx === 5) {
                    return (
                      <BannerAD key={idx}>
                        {bannerContainer[Math.floor(Math.random() * 4)]}
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
          <span>
            퀴즈를 불러오는데 실패했습니다. 새로고침 후 다시 이용해주세요
          </span>
        )}
      </MainContainer>
      <Test ref={ref} hasNext={nextPage} isLoading={loading}></Test>
    </>
  );
}

export default QuizScreens;
