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
function ArticleLearning() {
  return (
    <MainContainer>
      <ReactHelmet
        description="퀴즈를 학습자료로 사용하는 방법과 사용했을때 이점을 담은 칼럼페이지 입니다."
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <MainArticle>
        <ArticleTitle>퀴즈를 학습자료로 사용하는 방법에 대해</ArticleTitle>
        <ArticleParagraph>
          앞선 포스팅에서는 퀴즈가 할 수 있는 역할, 퀴즈를 재미있고 능동적을
          만드는 방법에 대해 이야기해보았다. 이번 포스팅에서는 퀴즈를 학습자료로
          사용하는 방법에 대해 열거해보려고 한다. 퀴즈라고 하면 예능방송에서
          보는 오락 느낌의 성향이 강한데, 물론 오락으로도 훌룡한 매개체가 될 수
          있지만 교육자 입장에서 훌룡한 교육도구가 되어주기도 한다. 단순
          시험지를 통한 학생들의 학습평가 혹은 배운 내용까지 얼마나 알고있는지
          등의 테스트는 학습자 입장에서 지루하기도 하고, 성적에 대한 공포감을
          주기도 한다. 하지만 온라인에서 제공되는 퀴즈 서비스는 다양한
          시각자료를 첨부할 수 있으며, 이미 퀴즈를 제공할 수 있는 템플릿을
          서비스에서 제공해주기 때문에 퀴즈메이커가 따로 양식을 만들거나
          하지않아도 되는 장점 역시 있다. 그럼 본격적으로 퀴즈를 학습 자료로
          사용하는 방법에 대해 알아보도록 하자.
        </ArticleParagraph>
        <ArticleSubTile>
          1. 퀴즈 그 자체가 능동적인 참여를 이끌어 낼 수 있는 학습자료가 되기도
          한다.
        </ArticleSubTile>
        <ArticleParagraph>
          제목 그대로 퀴즈 그 자체가 학습자의 자발적인 참여를 이끌어 낼 수 있는
          좋은 학습자료가 되어주기도 합니다. 물론 교육자 입장에서는 퀴즈를 풀지
          못한 학생에게 자존감을 떨어트릴 수 있는 말과 행동은 삼가해주어야
          겠습니다. 예를들어, 본 수업의 진도를 나가기전 학생들에게 미리 사전에
          만든 퀴즈를 풀게 함으로써, 학생들이 어디까지 알고 있고 또 얼마나 알고
          있는지에 대한 척도가 되어 줄 수 있습니다.
        </ArticleParagraph>
        <ArticleParagraph>
          과학을 예를들어 1단원의 어떤 부분까지 오늘 진도를 나갈 예정이라고
          하였을때, 교육자는 진도가 나갈 부분까지 퀴즈를 미리 만든 후 학습자에게
          제공해줄 수 있습니다. 이후 학습자가 퀴즈를 풀고 제출했을때 정답률과
          오답률의 평균을 낸 후 높은 오답률 혹은 낮은 정답률을 가지는 주제에
          대해 더 심도있게 학습자에게 가르쳐 줄 수 있을 것입니다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-learning/example1.png"
            alt="퀴즈를 통한 학습을 하였을 때 성취도가 올라간다는 기사의 내용이 담긴 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          사이언스 타임즈의 과학 정책 기사에 실린 내용에서도 알 수 있듯이,
          퀴즈를 통한 학습이 학생들의 낙제율도 낮춰주며, 중고등 학생의 자퇴율도
          낮추어 주었다고 한다. 또한 퀴즈를 학습자료로 사용했을때에 학생들이
          무엇이 부족한지에 관한 내용을 교사가 즉각적으로 피드백이 가능하기에
          학생들에게 더욱 높은 품질의 교육을 제공해 줄 수 있다는 장점이 있다.
        </ArticleParagraph>
        <ArticleSubTile>
          2. 다양한 시각자료를 통한 학생들의 능동적인 참여
        </ArticleSubTile>
        <ArticleParagraph>
          시험지와는 다르게 온라인에서 제공되는 퀴즈는 다양한 시각자료의 첨부가
          가능하다는 장점이 있다. 물론 시험지에도 사진이 첨부가 가능하지만, 거의
          왠만하면 흑백사진이기 마련이다. 시험지와의 결정적인 시각적 차이는 바로
          움직이는 사진 첨부가 가능하다는 점이다. 예를들어 물리에 관한 퀴즈를
          출제할 때 빗탈면에서 공이 굴러가는 것을 설명하기 위해 여러 조건을
          추가해야 할 것이다. 하지만 공이 굴러가는 이미지와 조건을 추가하지 않고
          빗탈면에서 속력이 일정하게 늘어나는 공을 보고 마찰력이 없다는 것을
          학생 스스로 생각하는 것을 가능하게 해준다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-learning/example2.png"
            alt="시험지에서 제공되는 물리이론의 예시 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          위의 사진처럼 학습자는 딱딱한 시험지 속 사진이 아닌, 직접 움직이는
          물체를 시각적으로 받아드리면서 높은 학습효과를 얻을 수 있는 장점이
          있다.
        </ArticleParagraph>
      </MainArticle>
    </MainContainer>
  );
}

export default ArticleLearning;
