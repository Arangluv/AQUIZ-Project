import styled from "styled-components";
import ReactHelmet from "../../ReactHelmet";
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainArticle = styled.article`
  width: 80%;
  background-color: white;
  border: 1px solid rgba(83, 127, 231, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #676a6c;
  margin-top: 1vw;
  padding: 2vw 2vw;
`;

const ArticleTitle = styled.h1`
  font-size: 1.8vw;
  color: black;
  font-weight: 600;
  margin-bottom: 2vw;
  @media screen and (max-width: 767px) {
    font-size: 1.5vh;
    margin-bottom: 2vh;
  }
`;
const ArticleSubTile = styled.h2`
  font-size: 1.5vw;
  color: rgba(83, 127, 231, 1);
  margin-top: 2vw;
  margin-bottom: 2vw;
  @media screen and (max-width: 767px) {
    font-size: 1.3vh;
  }
`;
const ArticleParagraph = styled.p`
  margin-top: 1vw;
  margin-bottom: 1vw;
  font-size: 1.1vw;
  width: 60%;
  line-height: 1.5vw;
  @media screen and (max-width: 767px) {
    font-size: 1vh;
    line-height: 1.2vh;
  }
`;
const ArticleImageSection = styled.div`
  width: 60%;
  object-fit: contain;
  margin-top: 1vw;
  margin-bottom: 1vw;
  img {
    width: 100%;
    height: 100%;
  }
`;
function ArticleFunnyQuiz() {
  return (
    <MainContainer>
      <ReactHelmet
        description="재미있는 퀴즈를 만드는 방법에 대한 고찰을 담은 칼럼페이지 입니다."
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <MainArticle>
        <ArticleTitle>
          재밌는 퀴즈는 어떻게 무엇이고 어떻게 만들까?
        </ArticleTitle>
        <ArticleParagraph>
          모두가 그렇다고는 이야기할 수 없지만, 무언가를 내가 만들고
          다른사람들이 재미있게 즐겨주었을때 기분좋음을 느낄겁입니다. 내가
          만드는 퀴즈는 내가 궁금해했었고 나의 관심분야일 확률이 높고 사람들이
          퀴즈를 많이 풀었을때 오는 만족감이 클 것이라 생각하여, 이 서비스를
          만들기도 했습니다. 하지만 다른사람들이 만든 퀴즈가 쌓이다 보면, 열심히
          만든 내 퀴즈가 더 이상 보이지않게되거나, 사람들의 관심에서 멀어진다면
          금방 서비스에 흥미를 잃게 된다는 점이 하나의 단점이라고 생각합니다.
          그럼 어떻게하면 사람들의 관심을 끌 수 있는 재미있는 퀴즈를 만들 수
          있을지에 대해 저 나름의 생각을 정리해보겠습니다.
        </ArticleParagraph>
        <ArticleSubTile>
          1. 많은 사람이 좋아하는 주제일 수록 좋다.
        </ArticleSubTile>
        <ArticleParagraph>
          내가 어떤분야를 정말 관심있게 좋아하지만, 모든 사람들이 그렇다라는
          보장은 없을 것입니다. 사람들이 좋아하는 관심사가 제각기 다르긴
          하겠지만 호와 불호가 많이 갈리지않는, 누구에게 이야기하면 "그렇지!"
          라고 공감을 유발할 수 있는 특정주제들은 있습니다.
        </ArticleParagraph>
        <ArticleParagraph>
          예를들면 내가 좋아하는 아이돌 이야기라던지, 어떤 비제이가 재밌고
          예쁘고 잘생겼다라던지, 요즘 넷플릭스에 나온 어떤 애니메이션이
          재밌다라던지, 애니메이션에 나오는 어떤 캐릭터가 귀엽다라던지, 어떤
          게임이 재밌다 등 이야기를 들었을때 듣는사람이 쉽게 공감할 수 있는
          이야기라면 그러한 주제로 퀴즈를 만들었을때 퀴즈를 푸는 사람들의
          참여도를 많이 늘릴 수 있을거라 생각합니다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-funnyQuiz/example1.png"
            alt="재밌는 퀴즈를 만들기위해 예시로 든 다중퍼셉트론 사진"
          />
        </ArticleImageSection>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-funnyQuiz/example2.png"
            alt="재밌는 퀴즈를 만들기위해 예시로 든 뉴진스 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          위의 두가지 사진이 퀴즈의 썸네일이라고 했을때, 아마 컴퓨터를 좋아하고
          기계학습에 흥미가 있는 사람이라면 첫번째 사진을 눌러 클릭할 수 있지만,
          아마도 뉴진스를 많이 아는사람들이 더 많을 것이라는것을 어렵지않게 알
          수 있습니다.
        </ArticleParagraph>
        <ArticleSubTile>
          2. 사람들의 흥미를 끌 수 있는 썸네일을 사용하자.
        </ArticleSubTile>
        <ArticleParagraph>
          사람에게 있어서 첫인상이 중요하다는 말을 우리는 살면서 종종
          듣곤합니다. 그만큼 사람에게 있어서 시각적으로 전달되는 정보가 처음에는
          무엇보다 중요하다는 의미로 받아들일 수 있습니다. 내용적으로는 내가 더
          알차고 재미있는 퀴즈일 수도 있겠지만, 결국 퀴즈를 클릭하고 들어와야 알
          수 있는 부분이기에 사람들의 이목을 집중시킬 수 없다면 무용지물일 것
          입니다. 사람에게 있어 첫인상은 얼굴, 옷, 신장등 다양한 요소가 있겠지만
          퀴즈 서비스 내부에서의 퀴즈의 첫인상은 아마 썸네일이지 않을까
          싶습니다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-funnyQuiz/example3.png"
            alt="재밌는 퀴즈를 만들기위해 예시로 든 뉴진스 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          위의 사진은 제목 및 퀴즈에 대한 짧은 설명이 모두 같은 상황에서,
          썸네일만 다를 시 차이점을 보여주는 사진입니다. 모두 '장원영 퀴즈'라는
          이름을 가지고 '아 이 퀴즈는 장원영 퀴즈겠구나' 라는 생각이 들지만,
          직관적으로 클릭을 하고 싶은 퀴즈는 왼쪽일 것입니다. 사용자는 퀴즈를
          만들때 직관적이고 서비스 규정을 위반하지 않으며 사람들의 이목을 끌 수
          있는 썸네일을 사용하면 좋을 것 입니다.
        </ArticleParagraph>
        <ArticleSubTile>
          3. 요즘 사람들이 흥미를 가지는 주제를 하는 것도 좋다
        </ArticleSubTile>
        <ArticleParagraph>
          만약 퀴즈는 만들고 싶지만, 내가 아는 주제에 대해 다른사람들이 이미
          작성한 퀴즈가 많다면 고민에 빠질 것입니다. 내가 만들기에는 이미 너무
          많은 인기를 가지고 있어서 내가 만들어도 전혀 새로운 느낌의 퀴즈를
          만들기에는 어려움을 느낄 것 입니다. 이럴때는 요즘 사람들이 무엇에
          관심을 많이 가지는지 파악하고 나와의 관심사와 일치한다면 도전해볼 수
          도 있습니다. 예를들어 2023년을 기준으로 재작년까지만 해도 사람들은
          가상화폐에 대한 관심이 많았습니다. 본인의 흥미와도 맞다면, 그러한
          주제로 퀴즈를 만들어보는 것은 사람들의 관심을 끌 수 있을 것입니다.
        </ArticleParagraph>
      </MainArticle>
    </MainContainer>
  );
}
export default ArticleFunnyQuiz;
