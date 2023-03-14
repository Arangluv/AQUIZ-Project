import styled from "styled-components";
import ReactHelmet from '../../ReactHelmet';
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

function ArticleImportantFactor() {
  return (
    <MainContainer>
      <ReactHelmet
        description="퀴즈를 만들때 스스로에게 질문을 해야하는 이유를 담은 칼럼입니다."
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <MainArticle>
        <ArticleTitle>퀴즈를 만들때 왜가 중요한 이유에 대해서</ArticleTitle>
        <ArticleParagraph>
          일상생활을 할때도 "왜" 라는 질문을 하는것은 중요하다. 왜라고 질문을
          들었을 때 사람은 심도 있는 고민은 하게 된다. 물론 퀴즈를 만드는
          입장에서 왜는 자기 스스로에게 물어야하는 질문일 것이다. 나는 왜 이
          퀴즈를 만들고 있는가는 결국 질적으로 좋은 퀴즈를 만드는데로
          퀴즈메이커를 이끌 것이다. 가령 예를들어 왜 이 퀴즈를 만들고 싶고, 왜
          사람들이 이 퀴즈를 풀까라는 질문을 하면 자연스럽게 한 생각을 귀결되기
          마련이다. 왜 퀴즈를 만들고 싶은지는 많은 이유가 있겠지만, 내가 만든
          퀴즈를 사용자가 즐겁게 즐겨주기 원하기 위해서 만드는 것이고, 더욱
          중요한 것은 왜 사람들이 이 퀴즈를 풀까 라는 질문에 대한 대답이다.
          사람들은 재미가 없으면 풀지 않을 것이다. 따라서 자신이 던진 "이 퀴즈를
          왜 풀까?" 라는 질문에 만족스럽게 대답하기 위해 최선을 다해 퀴즈를
          만들게 될 것이다.
        </ArticleParagraph>
        <ArticleSubTile>1. 질문을 통한 능동적인 퀴즈 만들기</ArticleSubTile>
        <ArticleParagraph>
          가이드라인을 위반하지 않으면서 재미있는 퀴즈를 만들기 위해서는,
          퀴즈메이커 스스로 능동적인 자세를 가진다면 어렵지않게 만들 수 있다.
          위에서 언급했던것 처럼 사람들이 많이 찾게되는 퀴즈를 풀기위해 "왜
          사람들이 내 문제를 풀까?" 라는 질문도 하게 되지만, 어떻게 하면
          호불호가 갈리지 않는 퀴즈를 만들까 라는 질문을 던지는 것 역시
          중요하다.
        </ArticleParagraph>
        <ArticleParagraph>
          예를들어 리그오브레전드에 대한 퀴즈를 만들때 스스로에게 질문을
          던져봅니다. "어떤 퀴즈를 사람들이 재미있게 풀 수 있을까?" 단순 캐릭터
          사진을 보여주고 어떤 캐릭터인지 이름을 맞추는 것 보다는, 다른 재미있는
          부분이 있지 않을까? 스스로에게 던진 질문에 대한 대답은 쉽게 좋은답을
          내놓지는 않지만 가끔은 이런 명쾌한 답을 주기도 합니다. 사람들이
          리그오브레전드의 티어에 민감하니, 티어에 관련한 문제를 내봐야겠다
          하면서 말입니다. 전자가 재미있는 퀴즈냐, 후자가 재미있는 퀴즈냐라고
          물었을때 정답은 존재하지 않지만 제가 만약 롤을 좋아하고, 롤에 관련된
          퀴즈를 푼다면 저는 후자를 선택할 것 같습니다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-answer/example1.png"
            alt="구글에 검색했을때 나오는 질문의 중요성에 대한 검색 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          구글에서 질문을 하는 것에 대한, 의문을 가지는 것에 대한 중요성을
          검색해보았을 때 나오는 화면으로 우리는 은연중에 질문하고, 의문을
          가졌을 때 좋은답을 구할 수 있다는 것을 알 수 있습니다. 퀴즈 역시
          마찬가지 일 것입니다. 남들이 내가 만든 퀴즈를 많이 풀어주고, 관심을
          받기 위해서는 이러한 접근 방법으로 퀴즈를 만드는 것이 도움을 줄 수
          있을 것입니다.
        </ArticleParagraph>
      </MainArticle>
    </MainContainer>
  );
}

export default ArticleImportantFactor;
