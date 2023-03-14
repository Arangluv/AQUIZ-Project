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

function ArticleShare() {
  return (
    <MainContainer>
      <ReactHelmet
        description="내가 만든 퀴즈를 다른사람에게 공유하는 여러가지 방법을 담은 칼럼페이지 입니다."
        title="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
        pageTitle="AQUIZ - 퀴즈메이커 | 나만의 퀴즈 만들기"
      />
      <MainArticle>
        <ArticleTitle>내가 만든 퀴즈를 공유하는 방법에 대해</ArticleTitle>
        <ArticleParagraph>
          내가 만든 퀴즈가 사람들의 이목을 끌어 많은 사람들이 풀면 좋겠지만,
          그렇지 않은 경우가 대다수 일 것이다. 이목을 끌지 못했다면 대부분의
          경우 자신이 만든 퀴즈의 주제가 많은 사람들이 관심있어 하는 주제와
          거리가 멀어서 였을 수도 있다. 이때 나와 관심사가 동일한 커뮤니티의
          사람들이 있는 곳이나, SNS에 내가 만든 퀴즈를 공유하는 것도 하나의
          방법일 수도 있다. 침착맨을 예로들자면, 나는 삼국지를 읽은적도 없고
          삼국지에 관한 이야기에는 정말 무지한편이다. 흥미가 있냐 없냐고 누군가
          물어본다면 없다고 하는게 맞을것이다. 하지만 침착맨 방송에서 삼국지
          이야기를 한다면 평균시청자 수 만큼은 아니지만 많은 사람들이 침착맨의
          삼국지 이야기를 듣는다. 퀴즈도 마찬지로 자신과 비슷한 취미 혹은 흥미를
          가지고 있는 사람들이 많은 곳에 퀴즈를 공유한다면 내가 정성스럽게 만든
          퀴즈를 풀어주는 사람들이 많을 것이다.
        </ArticleParagraph>
        <ArticleSubTile>1. 트위터에 내 퀴즈 공유하기</ArticleSubTile>
        <ArticleParagraph>
          먼저 트위터에서 자신이 관심있어하는 분야 혹은 장르에 대해 "#"
          해쉬태그를 붙여 검색을 해본다. 그 후 최근 게시물 혹은 "latest"를 눌러
          내가 만든 퀴즈 장르에 대해 얼마나 많은 활성화가 이루어졌는지 확인할 수
          있다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-shares/example1.png"
            alt="트위터의 최근 게시물 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          AQUIZ 사이트의 홈에서 자신이 마음에 드는 퀴즈의 '공유하기' 버튼을
          누르면 퀴즈에 대한 링크가 알아서 복사된다. 이후 자신이 공유할 사이트
          혹은 SNS에 붙혀넣기만 하면 끝이난다. 이때 웹사이트에 링크를 공유한다면
          오픈그래프 이미지와 타이틀이 잘 나타나지만, 트위터의 경우 그렇지 않다.
          이건 개발자가 개발할때 사용한 언어의 특성때문에 그런데, 하루 빨리
          방법을 찾아 개선해야할 부분이다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-shares/example2.png"
            alt="트위터에 퀴즈를 공유하는 방법에 대한 사진"
          />
        </ArticleImageSection>
        <ArticleSubTile>2. 커뮤니티에 공유하기</ArticleSubTile>
        <ArticleParagraph>
          자신과 취미가 맞는 사람이 많은 곳이 어디냐고 물어본다면 아마 그것은
          특정 커뮤니티 일 것이다. 그것은 자신이 흥미있어하는 주제에 맞게
          운영되는 네이버 카페일 수도 있으며, 대형 커뮤니티인 디시인사이드가 될
          수도 있다. 게임, 애니메이션을 좋아하는 사람들이 많은 아카라이브일 수
          도 있고 bj, 스트리머를 좋아하는 사람들이 많은 에펨코리아 일 수도 있다.
          그곳이 어디던 다른사람의 심기를 건드리는 내용의 퀴즈가 아닌 모든
          사람들이 즐겁고 편견없게 이용가능한 퀴즈라면 누구던지 즐겁게 퀴즈를
          풀어줄 것이다.
        </ArticleParagraph>
        <ArticleImageSection>
          <img
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/article-shares/example3.png"
            alt="외부 커뮤니티에 퀴즈를 공유하는 사진"
          />
        </ArticleImageSection>
        <ArticleParagraph>
          사진은 외부 커뮤니티에 퀴즈를 공유하는 방법이 나와 있다. 트위터와
          마찬가지로 퀴즈의 공유하기 버튼을 눌러 외부의 다른 커뮤니티에 링크를
          붙혀넣기만 하면 된다. 트위터와 다르게 웹사이트에 링크를 붙혀넣기를
          하면 퀴즈에 대한 링크를 알기 쉽게 설명해주는 오픈그래프 사진과,
          사이트의 이름, 짧은 설명글이 보이는것을 알 수 있다.
        </ArticleParagraph>
        <ArticleSubTile>3. 기타 SNS에 공유하기</ArticleSubTile>
        <ArticleParagraph>
          퀴즈가 반드시 자신의 취미에만 국한될 필요는 없다. 나에 대한 퀴즈라던지
          특정 대학교를 다니고 있는 신입생들이 풀 수 있는 문제 등 다양한 퀴즈를
          낼 수 있다. 따라서 자신이 만든 퀴즈가 내가 아는 사람들이 풀기를
          원한다면 페이스북, 인스타그램과 같은 sns에 내가 만든 퀴즈를 공유하며
          즐거움을 나눌 수 있다.
        </ArticleParagraph>
      </MainArticle>
    </MainContainer>
  );
}

export default ArticleShare;
