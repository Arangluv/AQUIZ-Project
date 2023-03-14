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
function ArticleCaution() {
  return (
    <MainContainer>
      <ReactHelmet
        description="퀴즈를 만들때 주의해야 할 점에 대한 설명을 담은 포스팅"
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <MainArticle>
        <ArticleTitle>퀴즈를 만들때 주의해야 할 점</ArticleTitle>
        <ArticleParagraph>
          많은 사람들이 풀어주기를 원하고 내가 만든 퀴즈에 대해 이런저런
          재미있는 이야기들이 오고가는 것을 보기위해, 다른사람들이 즐거울 할
          만한 나만의 퀴즈를 만드는 것은 누구에게나 중요할 것이다. 하지만 흥미를
          이끌기 위해서 자극적인 사진이나, 컨텐츠를 사용하는 등 좋지 못한
          방법으로 사람들의 이목을 끄는 안좋은 경우가 생긴다. 따라서 그런 일을
          사전에 방지하고, 예방하기 위한 방법은 어떤것이 있을까 생각하다가 내가
          생각하는 퀴즈를 만들때 주의할 점에 대해 정리하고 사람들에게 알려주면
          어떨까라는 생각이 문득 들어서 포스팅을 준비하였다.
        </ArticleParagraph>
        <ArticleSubTile>
          1. 답이 여러개 나올 수 있는 문제에 대해서는 조심하자.
        </ArticleSubTile>
        <ArticleParagraph>
          분쟁을 조성하는 것은 관심을 이끌기 위한 방법 중 하나로 꼽히기때문에
          답이 여러개 나올 수 있는 문제에 대해서는 조심해야한다. 예를들면 어떤
          아이들 그룹이 통계적으로 가장 인기가 많을 수는 있지만, 인기라는 것은
          상대적이기때문에 함부로 누가 1등이라는 타이틀을 붙히거나, 타인에게
          물을때는 조심하고 한번더 생각해볼 필요가 있다. 예를들어 필자의 경우
          LCK(리그오브레전드 국내 대회)를 좋아한다. 통계적으로 현재 1등, 2등인
          팀이 있기에 "2023년 몇월 몇일 기준 1등인 팀은 누구인가?" 했을 때
          여지없이 어떤팀이라고 대답이 나올 것이다. 이는 질문의 범위가
          좁기때문에 가능하다.
        </ArticleParagraph>
        <ArticleParagraph>
          하지만 "현재 가장 잘하는 사람은 누구인가요?" 라고 물었을 때 아주
          다양한 질문이 나올것이다. 누군가는 자신이 좋아하는 팀의 선수가 가장
          먼저 떠오를 것이고, 누군가는 현재 1등인 팀의 선수가 떠오를 것이다.
          이처럼 질문이 상대에 따라 상대적으로 달라질 수 있을때 사람들의 분쟁을
          유발할 수도 있다. 이는 아주 다양한 범위에 적용이 될 수 있는데 비단 LCK
          뿐만 아니라 모든 스포츠에 있어서도 그렇고, 지난 주 뮤직뱅크 1위는
          누구인지는 물어보아도 되지만 가장 예쁘고 잘생긴 여자 남자 아이돌에
          대해 묻는 것 처럼 미의 기준을 물어보는 것 역시 퀴즈의 질문에 있어서는
          잘못된 질문 일 수도 있다. 마치 원더걸스가 예쁘냐 소녀시대가 예쁘냐고
          싸웠던 것 처럼.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-caution/example1.png"
            alt="원더걸스 vs 소녀시대의 구글 검색 사진"
          />
        </ArticleImageSection>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-caution/example2.png"
            alt="사람을 설득하기 어려운이유의 구글 검색 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          구글에 검색해 보아도, 비록 소녀시대, 원더걸스가 필자의 시대에서의 대세
          아이돌이었지만 아직도 추천검색어에 있을만큼 뜨거웠던 주제다. 또한
          사람을 설득하기위한 좋은방법을 알려주는 책이 있을정도로 나의 생각을
          타인에게 설득하는 일은 어렵다는 것을 저런 자료로도 알 수 있으며,
          우리가 살면서 아주 당연하게 느끼는 보편적인 감정일 것이다. 이를 모르고
          퀴즈를 만들었다면 앞으로 퀴즈를 만들때 참고하여 만들면 될 것이고, 알고
          있다면 당연히 악용해서는 안될 것이다.
        </ArticleParagraph>
        <ArticleSubTile>
          2. 민감한 주제를 다루는 퀴즈를 조심하자.
        </ArticleSubTile>
        <ArticleParagraph>
          사람마다 느끼는 민감한 주제는 각자 다르겠지만, 보편적으로 호불호가
          갈리는 주제는 몇몇있다. 그것은 정치이야기 일 수도 있고 대학, 경제,
          회사에 대한 자신만의 가치관일 수도 있다. 모두 생각이 다를 수 있으며
          다양한 생각을 가지고 사는 것을 비판할 수는 없을 것이다. 하지만 그것을
          퀴즈의 형태로 답을 강제하여 누군가에게 강요한다면 그 문제를 틀렸을때,
          자신이 틀렸다고 부정당한 상대의 입장은 화가 날 것이다. 이것은 앞서
          이야기했던 분노를 조장하여 관심을 끄는것과 다르지않다. 생각이 다른것은
          존중하지만 이를 남에게 강요한다면 그것을 비판받을 행동임은 분명하다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-caution/example3.png"
            alt="싸우지 말자라는 의미의 귀여운 햄스터 캐릭터 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          사람들이 싸울 수 있는 민감한 주제를 다루는 퀴즈는 되도록이면 피하자.
          분노를 통해 조장된 관심은 그리 오래갈 수도 없으며, 건강하지도 않다.
          민감한 주제를 통해 퀴즈를 만들지 않아도 세상에는 퀴즈를 만들 수 있는
          다양한 주제들이 있다. 그게 무엇이라고 콕찝어서 이야기할 수 없을만큼
          우리는 다양한 관점과 흥미를 가지고 살고 있기에 그 중에서 다른사람들이
          싸우지않고 즐겁게 만들 수 있는 퀴즈를 골라보는 것은 어떨까?
        </ArticleParagraph>
        <ArticleSubTile>3. 과도한 노출이 많은 사진은 피하자.</ArticleSubTile>
        <ArticleParagraph>
          퀴즈를 만들때는 지나치게 노출이 많은 썸네일 혹은 퀴즈사진은 피하자.
          남녀 가릴 것 없이 다양한 연령대의 사람들이 퀴즈를 풀고 만들고 하는
          장소이기에, 관심을 끌기위해 다소 자극적인 사진은 사용할 수 있으나
          그것이 남들이 보았을때 눈쌀이 찌뿌려진다면 그것은 잘못되었다고 이야기
          할 수 있다. 굳이 노출이 없어도 이목을 집중시킬만한 퀴즈 사진들은
          얼마던지 있다. 예를들면 아이돌 직캠을 보았을때 아이돌마다 가지고 있는
          귀여운 부분들이 많이 있을 것이다. 이를 GIF로 만들어 사람들에게
          보여준다면 많은 공감을 이끌어 낼 수 있다고 생각한다.
        </ArticleParagraph>
      </MainArticle>
    </MainContainer>
  );
}

export default ArticleCaution;
