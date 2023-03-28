import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactHelmet from "../../ReactHelmet";
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    margin-top: 10vh;
  }
`;
const MainArticle = styled.article`
  width: 80%;
  border: 1px solid rgba(83, 127, 231, 0.8);
  background-color: white;
  border-radius: 3px;
  padding: 3vw 3vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ArticleSubContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1vw;
  a {
    width: 33%;
    height: 30vw;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid #ffcd4a;
    border-radius: 3px;
    transition: 0.1s ease-in-out;
    div {
      height: 20vw;
      object-fit: cover;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h2 {
      text-align: center;
      margin-top: 3vw;
      font-weight: 600;
      font-size: 1.5vw;
      color: #676a6c;
      @media screen and (max-width: 767px) {
        font-size: 1.5vh;
      }
    }
  }
  a:hover {
    box-shadow: 1px 1px 1px 1px gray;
  }
`;
function ArticleMainPage() {
  return (
    <MainContainer>
      <ReactHelmet
        description="퀴즈를 재미있게 만들거나, 다양한 방법으로 사용할 수 있다는 내용의 칼럼을 모아둔 페이지입니다."
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <MainArticle>
        <ArticleSubContainer>
          <Link to="make-funny">
            <div>
              <img
                src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-thumbnail/title1.png"
                alt="재밌는 퀴즈를 만들기 위한 article의 대표 썸네일"
              />
            </div>
            <h2>퀴즈를 재미있게 만드는 방법에 대해서</h2>
          </Link>
          <Link to="common-usage">
            <div>
              <img
                src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-thumbnail/title2.png"
                alt="퀴즈를 활용하는 여러가지 방법에 대한 article의 대표 썸네일"
              />
            </div>
            <h2>퀴즈를 활용하는 여러가지 방법</h2>
          </Link>
          <Link to="shares">
            <div>
              <img
                src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-thumbnail/title3.png"
                alt="퀴즈를 공유하는 여러가지 방법에 대한 article의 대표 썸네일"
              />
            </div>
            <h2>퀴즈를 공유하는 방법</h2>
          </Link>
        </ArticleSubContainer>

        <ArticleSubContainer>
          <Link to="caution">
            <div>
              <img
                src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-thumbnail/title4.png"
                alt="퀴즈를 만들때 주의해야 할 점에 대한 대표 썸네일"
              />
            </div>
            <h2>퀴즈를 만들 때 주의해야 할 점</h2>
          </Link>
          <Link to="marketing">
            <div>
              <img
                src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-thumbnail/title5.png"
                alt="퀴즈를 마케팅에 사용하는 방법에 대한 article의 대표 썸네일"
              />
            </div>
            <h2>퀴즈를 마케팅에 활용하는 방법</h2>
          </Link>
          <Link to="helpful">
            <div>
              <img
                src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-thumbnail/title6.png"
                alt="도움이 되는 퀴즈를 만들기에 대한 article의 대표 썸네일"
              />
            </div>
            <h2>도움이 되는 퀴즈를 만들기</h2>
          </Link>
        </ArticleSubContainer>

        <ArticleSubContainer>
          <Link to="important-factor">
            <div>
              <img
                src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-thumbnail/title7.png"
                alt="재밌는 퀴즈를 만들기 위한 article의 대표 썸네일"
              />
            </div>
            <h2>퀴즈를 만들때 왜가 중요한 이유</h2>
          </Link>
          <Link to="learning">
            <div>
              <img
                src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-thumbnail/title8.png"
                alt="퀴즈를 학습자료로 사용하는 방법에 대한 article의 대표 썸네일"
              />
            </div>
            <h2>퀴즈를 학습자료로 사용하는 방법</h2>
          </Link>
        </ArticleSubContainer>
      </MainArticle>
    </MainContainer>
  );
}

export default ArticleMainPage;
