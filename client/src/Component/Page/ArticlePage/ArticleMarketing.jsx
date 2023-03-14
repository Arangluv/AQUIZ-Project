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
function ArticleMarketing() {
  return (
    <MainContainer>
      <ReactHelmet
        description="퀴즈를 마케팅에 활용하는 방법에 대한 고찰이 담긴 페이지 입니다."
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <MainArticle>
        <ArticleTitle>퀴즈를 마케팅에 활용하는 방법</ArticleTitle>
        <ArticleParagraph>
          이번 포스팅에서는 퀴즈를 마케팅에 활용하는 방법에 대해 알아보겠습니다.
          퀴즈를 단순히 오락, 엔터테인먼트의 용도로 사용할 수 있지만,
          마케팅으로도 사용할 수 있습니다. 비록 우리에게는 익숙하지는 않지만
          고객 마케팅 부분에서 종사하고 있는 사람이라면 한번쯤 보거나 혹은
          실제로 사용한 적이 있을 겁니다. 퀴즈를 마케팅으로 이용했을때 이점에
          대한 정확한 수치는 필자가 마케팅업에 종사하지 않아 정확한 리서치는
          어려우나, 한가지 확실한 점은 퀴즈로도 마케팅을 하고 있는 사람들이
          있다는 것입니다.
        </ArticleParagraph>
        <ArticleSubTile>
          1. 퀴즈를 통해 프로모션 이벤트 진행하기.
        </ArticleSubTile>
        <ArticleParagraph>
          프로모션 이벤트란 서비스를 판매하고 있는 업체의 상품에 대한 소비자의
          인지도나 호감도, 로열티를 올려주는 모든 활동을 의미합니다. 가령
          예를들면 헬스장은 프로모션 이벤트로 매년 초가되면 할인이벤트로
          자신들의 상품을 소비자에게 알리기도 하며, 어떤 업체는 특정한 날짜를
          이벤트삼아 브랜드와 일치시킨 후 소비자들이 자연스럽게 상품과 서비스를
          맵핑시키게 유도한 후 상품에 대한 전환율을 이끌어내기도 합니다. 또한
          마찬가지로 서비스 판매자의 브랜드 인지도를 높히기위해 퀴즈를 사용할 수
          있습니다.
        </ArticleParagraph>
        <ArticleParagraph>
          조금은 생소할 수도 있지만 퀴즈를 통해 프로모션 이벤트를 진행하는 일은
          그렇게 어렵지 않습니다. 가령 예를들면 현재 내가 팔고 있는 상품이 음식
          계열이라고 했을때, 그 음식에 대한 혹은 브랜드에 대한 퀴즈를 만든 후
          사용자가 참여하게 유도합니다. 이때 퀴즈를 다 맞힌 사람에게는 소정의
          상품 혹은 포인트를 제공한다고 한다면 참여자의 호기심을 이끌어 낼 수
          있고 상품에 대한 인지도를 쌓을 수 있게 됩니다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-marketing/example1.png"
            alt="퀴즈를 통해 프로모션 이벤트를 진행하는 예시를 든 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          퀴즈를 통한 프로모션 이벤트를 진행할 때 주의사항도 몇가지 있습니다.
          그것은 너무 노골적으로 내가 지금 이 상품에 대한 광고를 퀴즈를 통해
          하고 있다라는 느낌을 퀴즈 참여자가 느끼게 하면 안됩니다. 퀴즈를 통한
          자연스러운 참여를 통해 사용자가 흥미를 느끼며 퀴즈를 풀게하고,
          자연스럽게 제품을 사용자에게 노출 시키는 방법으로 접근하여, 퀴즈를
          통해 사용자의 전환율을 높이는 것이 가장 효율적인 일 일것입니다. 가령
          예를들어 '이것은 어떤 브랜드의 닭가슴살입니다. 무엇인가요?' 보다는
          '이것은 어떤 인플루언서가 먹고 있는 닭가슴살입니다. 어떤 브랜드
          일까요?' 가 퀴즈로 접근할 수 있는 사용자 친화적인 광고 방법일 것이다.
        </ArticleParagraph>
        <ArticleSubTile>
          2. 퀴즈를 통해 상대방의 궁금증 일으키기.
        </ArticleSubTile>
        <ArticleParagraph>
          어떤 마케팅이 효과적으로 진행되기 위해서는 정말 많은 요소가 있겠지만,
          그 중 하나가 바로 사용자의 궁금증을 일으키는 것이다. 퀴즈는 사용자의
          궁금증을 유발시키는데 특화되어 있다고 할 수 있는데, 가령 4지선다형
          객관식 퀴즈에서 2번이 정답이라고 하자. 이때 사용자가 2번이 아닌 다른
          정답을 체크하고 제출했을때 정답이 아니라고 나와 있을 것이다. 이때
          정답을 바로 알려주는 것이 아닌 정답을 내가 상품을 팔고 있는 사이트에서
          찾을 수 있다고 하고, 정답을 찾고 다시한번 퀴즈를 제출하고 정답을
          맞췄을때 추첨식의 이벤트를 진행한다면 자연스럽게 사용자의 전환을
          이끌어 낼 수 있다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-marketing/example2.png"
            alt="호기심에 대한 나무위키의 상세글에 대한 캡쳐 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          호기심에는 연령제한이 없다고 나무위키에 나와있다. 그만큼 사람의
          호기심은 본능적이고 사람의 다른 부분과 결합했을때 좋은 시너지를 낼
          것이다. 비단 광고라고하면 사용자 입장에서는 이미 좋지않은 경험들을
          많이 했기때문에 부정적인 시선으로 바라볼 수 밖에 없을 것이다. 하지만
          사람의 심리를 잘 알고 퀴즈를 통해 상대방의 호기심을 유발시켜 사용자가
          자연스럽게 광고에 유입될 수 있는 이러한 방법이라면 퀴즈 참여자가
          상품의 고객이 될 수 있는 좋은 기회를 마련할 수 있을 것이다.
        </ArticleParagraph>
        <ArticleSubTile>3. 퀴즈를 통한 포인트식 마케팅</ArticleSubTile>
        <ArticleParagraph>
          사람들은 부가적인 수익을 좋아한다. 그 돈이 5원, 10원하더라도 내가
          큰일을 하지 않아도 이렇게라도 돈을 주니 뭐 언제가는 쌓이겠지라는
          심리가 있다. 이러한 심리를 이용하여 내 제품에 대한 퀴즈 광고를
          진행하고 문제를 맞췄을때의 소정의 포인트를 참여자에게 지급함으로써
          마케팅 효과를 낼 수 있다. 당연히 포인트는 퀴즈를 제공하는 업체와
          제휴를 맺은 다른 기업에서 현금처럼 사용 가능하여야 할 것이다. 이렇게
          되면 사용자는 남는 시간에 퀴즈나 한번 참여해볼까? 라는 심리로 우리가
          만든 퀴즈에 참여할 수도 있다.
        </ArticleParagraph>
      </MainArticle>
    </MainContainer>
  );
}

export default ArticleMarketing;
