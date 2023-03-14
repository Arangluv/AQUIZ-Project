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
function ArticleCommonUsage() {
  return (
    <MainContainer>
      <ReactHelmet
        description="퀴즈를 다양하게 활용하는 방법에 대한 이야기를 담은 칼럼입니다."
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <MainArticle>
        <ArticleTitle>퀴즈를 활용하는 방법은 어떤것이 있을까?</ArticleTitle>
        <ArticleParagraph>
          이번 주제에서는 퀴즈를 만들고 어떻게 활용할 수 있는지에 대해
          알아보겠습니다. 퀴즈라고 하면 왠지 낯설게 느껴집니다. 조금은 따분한
          놀이 같기도 하며, 어쩌면 시험전에 간간히 나의 성적을 평가하는
          도구라고도 생각이 듭니다. 하지만 인터넷에 사람들과 공유하며 즐겁게
          소통할 수 있는 다른 소통도구, 즉 예를 들면 mbti 검사, 나의 퍼스널컬러
          찾아보기 등의 많은 도구가 있지만 퀴즈를 만들고 푸는 것 역시 나의
          공감과 즐거움을 공유하는 좋은 도구가 될 것입니다.
        </ArticleParagraph>
        <ArticleSubTile>
          1. 나의 관심사를 퀴즈를 만들어 공감 이끌어 내기
        </ArticleSubTile>
        <ArticleParagraph>
          앞선 포스팅에서는 재미있는 퀴즈를 만드는 방법에 대해 다루었습니다.
          사람들이 많이 보는 재미있는 퀴즈도 중요하지만, 나의 관심사를 공유하고
          같이 즐거워하는 경험 역시 가치있는 일 입니다. 저 역시 수학문제를 푸는
          것, 우주에 관한 문제를 보는것을 좋아하지만 다수의 사람에게 수학과
          과학을 좋아하냐고 물어보면 그렇지 않다고 대답할 것 입니다.
        </ArticleParagraph>
        <ArticleParagraph>
          수학, 과학 혹은 기타 다른 사람들이 많이 좋아하지 않을 것 같은 분야도
          니즈가 있는 부분이 있다고 생각합니다. 예를 들어, 해설이 없는
          수학문제가 간혹 있는데 고등학생들이 이용해주기를 바라면서 런칭한
          수학어플이 있습니다. 처음에는 해설을 대신 써줄 사람이 없어, 어플을
          런칭한 선생님들이 수학 해설문제를 풀어주었는데 나중가서 수학문제를
          풀기 좋아하는 사람들이 아무런 보상없이 문제를 풀고 해설을 올려주는
          일도 있었습니다. 즉 어떤 퀴즈 장르라도 누군가는 분명 즐거워 해줄 수
          있는 사람이 있습니다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-commonUsage/example1.png"
            alt="다양한 주제로 퀴즈를 만들 수 있다는 예시의 사진1"
          />
        </ArticleImageSection>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-commonUsage/example2.png"
            alt="다양한 주제로 퀴즈를 만들 수 있다는 예시의 사진2"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          위의 사진은 AQUIZ 서비스에서 이미 만들어진 퀴즈 4개의 사진이다. 사진에
          보이는 것만 해도, 스포츠, 게임, 애니메이션, 영화 등 다양한 퀴즈가
          있다. 여러 사람이 보고, 모일 수 있는게 웹사이트의 특징이므로 분야가
          좁아도 내가 만든 문제를 풀어줄 사람이 존재하기 마련이다.
        </ArticleParagraph>
        <ArticleSubTile>
          2. 친구들과 있는 자리에서 술게임으로도 사용할 수 있다
        </ArticleSubTile>
        <ArticleParagraph>
          퀴즈를 친구들과 있는 자리에서 술게임으로 사용한다는 말은 다소 억지로
          들릴 수 있다. 하지만 필자는 그런 경험이 있다. 예능에서 보았던 퀴즈
          맞추기를 술게임으로 하면 재미있을거같아서 친구들과 했었다. 당시에
          영화의 한 장면을 보면서 영화의 제목을 맞추는 게임을 했는데 친구들과
          재미있게 했던 경험이 있다. 가령 예능에서 혹은 다른 프로그램에서 보았던
          무엇가를 맞추기 게임을 한다면 퀴즈를 이용하는것도 한가지 방법일 수 도
          있다. 만약 그때 당시 이러한 퀴즈 웹사이트가 있다는걸 알았다면 퀴즈를
          만들고 친구들과 있는 단톡방에서 퀴즈의 링크를 공유하는 방식으로
          접근했었을 것 같다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-commonUsage/example3.png"
            alt="스타크래프트 유즈맵 중 하나인 노래맞추기 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          예시의 사진은 스타크래프트의 노래 맞추기 사진을 가져와보았다. 위의
          유즈맵은 스타크래프트에서 꽤 유명한 유즈맵으로 노래가 흘러나오면
          채팅을 통해 노래 제목을 맞추는 것이다. 우리는 무엇가를 맞추는 것에
          대해 익숙해져있고, 그것을 푸는것 역시 재미있어한다. 또한 문제를
          푸는것에 국한되지 않고, 그것을 맞췄을때 오는 기분 역시 무시하지 못할
          것이다. 온라인 뿐만 아니라 오프라인 역시 이 틀에서 크게 벗어나지
          않으며, 친구들과 마음만 맞다면 술자리에서 사용해보는것은 어떨까?
        </ArticleParagraph>
        <ArticleSubTile>3. 마케팅으로 사용할 수 있다.</ArticleSubTile>
        <ArticleParagraph>
          사실 퀴즈를 마케팅에 이용하는 것은 우리는 다소 생소하다고 생각할 수 도
          있지만, 우리는 이미 많이 노출되어 있다. 마케팅 퀴즈의 예시로는 어떤
          문제를 풀고 맞추면 경품을 준다. 혹은 사은품을 나눠주거나 포인트를
          적립해주거나 하는 식의 광고를 언젠가 한번은 본적이 있을 것이다. 실제
          우리가 익히 알고 있는 캐시워크에서 이런 예시를 실제로 볼 수 있다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-commonUsage/example4.png"
            alt="퀴즈를 마케팅에 사용한다는 예시를 들기위해 사용된 캐시워크 이미지"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          이렇게 퀴즈를 부여하고 어떤 조건을 걸면서 상품을 준다고 한다면,
          사용자는 스스로 퀴즈를 풀기위해 시간을 내고 상품에 참여하며 광고에
          대한 높은 전환률을 얻을 수 있을 것이다.
        </ArticleParagraph>
      </MainArticle>
    </MainContainer>
  );
}
export default ArticleCommonUsage;
