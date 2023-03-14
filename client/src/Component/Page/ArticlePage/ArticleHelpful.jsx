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
function ArticleHelpful() {
  return (
    <MainContainer>
      <ReactHelmet
        description="다른 사람에게 도움이 되는 퀴즈를 만드는 것에 대한 중요성을 담은 칼럼 페이지입니다."
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <MainArticle>
        <ArticleTitle>도움이 되는 퀴즈를 만들기</ArticleTitle>
        <ArticleParagraph>
          우리는 퀴즈를 통해 누군가를 도와줄 수도 있다는 사실을 잊으면 안된다.
          어렸을때 패널티를 주는 퀴즈는 정말 싫어했는데, 1등을 하면 보상을 얻고,
          선생님께 칭찬을 받는 그런 퀴즈는 누구보다 열심히 풀었었던 기억이
          어렴풋이 있다. 또한 퀴즈를 틀렸을때 별다른 패널티가 없다면, 학습한
          내용을 더블 체크하는 용도로 퀴즈를 사용할 수 있다. 예를들어 오늘
          수학1의 수열 부분을 그룹스터디를 했다고 하자. 그래프를 퀴즈를 만들때
          그릴 수는 없지만, 각자 수열에 대한 부분을 퀴즈로 만들어 그룹스터디
          인원과 공유하며 내가 무엇을 알고, 무엇을 모르는지에 대한 부분은 어렵지
          않게 체크할 수 있다.
        </ArticleParagraph>
        <ArticleSubTile>1. 퀴즈를 통해 학습효과 증대 기대하기.</ArticleSubTile>
        <ArticleParagraph>
          앞서 이야기했던 것 처럼 퀴즈는 내가 학습한 부분에 대해 더블체크를
          해주는 역할을 해줄 수 있다. 이러한 퀴즈를 만드는 것은 현재 내가 어떤
          입장에서 퀴즈를 만드냐에 따라 좌지우지되는데, 내가 만약 누군가를
          가르치고 있는 선생님의 입장이라면 너무 어려운 내용이 아닌 문제를
          풀기위한 기본 개념을 학생들에게 퀴즈로 묻는것이 학생들의 공부 흥미를
          떨어트리지 않고 학습효과를 증대시키는 좋은 방법일 것이다. 퀴즈를 다
          맞은 학생에게 적절한 보상을 주고, 틀린 학생들은 나무라하는 것이 아닌
          교육자 입장에서 부족한 부분이 무엇인지 파악하고, 놓친 부분에 대해
          추가적인 학습을 시키는 것으로 접근할 수 있다.
        </ArticleParagraph>
        <ArticleParagraph>
          만약 자신이 학습자의 입장이고, 여러 사람들과 지식을 공유해야하는
          사람이면 오늘 학습한 부분에 대해 다같이 학습 파트에 대한 퀴즈를
          만들고, 각자 다른 관점에서 만든 퀴즈를 서로 풀어보고 내가 틀린 문제를
          맞힌 친구가 있을것이고, 내가 맞힌 문제를 틀린 친구가 있을 것이다.
          부족한 부분을 더 잘아는 사람들이 채워주고, 내가 잘 아는 부분을 부족한
          친구를 채워주는 방식으로 학습하는 방식으로 접근하면 퀴즈에 대한 좋은
          시너지를 불러일으키기 충분할 것이다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-helpful/example1.png"
            alt="아이들의 학습효과를 증대시키기 위해 사용된 퀴즈 사진의 예시 첫번째 사진"
          />
        </ArticleImageSection>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-helpful/example2.png"
            alt="아이들의 학습효과를 증대시키기 위해 사용된 퀴즈 사진의 예시 두번째 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          비록 공부와 관련된 문제에 대해서만 퀴즈를 내는 것은 아니다. 사진 속의
          예시처럼 심폐소생술에 대한 퀴즈를 참여자에게 제공하면, 퀴즈를 풀기위해
          참여자는 심폐소생술에 대한 이런저런 정보를 찾아보게 될 것이다. 이처럼
          지진시 대피요령, 우리나라 문화재, 생활 속 상식 등 과 같은 문제를
          출제하여 사용자가 알지 못했거나, 퀴즈를 풀면서 알게되었을때 도움이
          되는 지식을 퀴즈에 대한 형태로 참여자에게 전달할 수 있게 된다.
        </ArticleParagraph>
        <ArticleSubTile>
          2. 공익성을 띄는 문제를 퀴즈로 만들어 전달하기
        </ArticleSubTile>
        <ArticleParagraph>
          대한민국의 역사에 관련된 문제나, 잊어버리면 안되는 우리나라의 역사
          등을 참여자에게 제공하면서 도움을 줄 수 있다. 예를들면 대한민국의
          해방의 역사에서 해방운동을 펼친 열사들에 관한 문제를 제공하고, 설령
          참여자의 실수로 퀴즈를 틀렸다고 하더라도, 퀴즈를 풀면서 사용자가
          알게된 부분이 분명 있을 것 이다. 퀴즈를 출제하는 사람은 퀴즈를 내는
          도중 다시한번 역사에 대해 알게되는 귀중한 시간이 될 것이고, 퀴즈를
          푸는 사람 역시, 문제를 접하면서 내가 몰랐던 부분이 있다면 잊지
          말아야하는 우리나라의 역사에 대해 알게되게 될 것이다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-helpful/example3.png"
            alt="호기심에 대한 나무위키의 상세글에 대한 캡쳐 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          어쩌면 삶이 너무 바빠 이것저것 전부 챙기기 어려운 사람들에게 많은
          시간을 내지 않고, 지루하지않게 정보를 전달 받을 수 있게끔 하는 좋은
          매체 중 하나가 퀴즈가 아닐까 필자는 생각한다. 정보성이 짙은 퀴즈는
          문제를 내는 사람 입장에서 단순히 재미를 위해 만들어진 퀴즈보다 퀴즈를
          만드는데 시간이 많이 들어가는 건 어쩔 수 없을 것이다. 하지만 내가
          출제한 퀴즈가 누군가에게 도움이 된다면 그것대로 출제자 입장에서 뿌듯한
          순간이 아닐까 생각한다.
        </ArticleParagraph>
        <ArticleSubTile>
          3. 빠른 현대문화에 적응이 어려운 어르신들 도와주기
        </ArticleSubTile>
        <ArticleParagraph>
          현대사회에서 나이를 드신 분들이 어려워 하는 것중 하나가 키오스크라고
          한다. 우리에게는 너무나 익숙한 것들이 누군가에게는 당연하지 않다는
          이야기이다. 퀴즈는 남녀노소 가릴 것 없이 너무나 직관적이기 때문에
          접근성이 용이한 편에 속한다. 따라서 나이를 먹어 현대 사회에 적응이
          어려우신 분들을 위해, 어려워 하는 것들을 일일히 이론으로 가르쳐 주는
          것이 아닌 퀴즈를 풀게함으로써 스스로 생각하고, 문제에 대한 상황을
          학습시켜드리는 방법도 퀴즈의 순기능이 될 것이라고 생각한다.
        </ArticleParagraph>
      </MainArticle>
    </MainContainer>
  );
}

export default ArticleHelpful;
