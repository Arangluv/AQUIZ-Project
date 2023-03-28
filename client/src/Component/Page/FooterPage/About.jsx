import styled from "styled-components";
import ReactHelmet from "../../ReactHelmet";
const AboutContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 15vh;
  @media screen and (max-width: 767px) {
    margin-top: 6vh;
  }
`;
const AboutSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 3vw;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    padding: 3vh;
  }
  article {
    padding: 1vw;
    margin-bottom: 1vw;
    color: ${(props) => props.theme.textColor};
    @media screen and (max-width: 767px) {
      padding: 2vw;
    }
    h2 {
      font-size: 1.4vw;
      font-weight: 600;
      margin-bottom: 0.8vw;
      @media screen and (max-width: 767px) {
        font-size: 1.3vh;
        margin-bottom: 1.5vh;
        line-height: 1.5vh;
      }
    }
    p {
      font-size: 1.3vw;
      margin-bottom: 1vw;
      line-height: 1.6vw;
      @media screen and (max-width: 767px) {
        font-size: 1.3vh;
        line-height: 1.5vh;
        margin-bottom: 1.5vh;
      }
    }
  }
`;
function About() {
  return (
    <AboutContainer>
      <ReactHelmet
        description="AQUIZ, 퀴즈메이커가 어떤 사이트인지 설명해주는 곳입니다. 자신만의 다양한 문제를 만들고 사람들과 즐겨주세요."
        title="AQUIZ, 퀴즈메이커에 대하여"
        pageTitle="AQUIZ, 퀴즈메이커에 대하여"
      />
      <AboutSubContainer>
        <article>
          <h2>
            AQUIZ는 퀴즈를 만들어 다른사람들과 함께 즐길수 있는 플렛폼입니다.
          </h2>
          <p>
            AQUIZ는 퀴즈를 만들고 풀 수 있는 웹 플랫폼입니다. 객관식, 참 거짓,
            주관식, 매칭 등 다양한 유형의 문제를 만들 수 있고, 다른 사람들과
            공유할 수 있습니다.
          </p>
          <p>
            AQUIZ는 지식 테스트, 기술 평가, 또는 단순히 재미를 위해 사용될 수
            있습니다. 학교나 대학 등 교육 분야에서는 물론, 기업 교육, 마케팅
            캠페인, 그리고 엔터테인먼트 분야에서도 사용될 수 있습니다. AQUIZ의
            사용은 매우 쉽고 간단합니다. 카테고리나 키워드를 통해 기존 퀴즈를
            찾거나, 퀴즈 만들기 템플릿을 통해 직접 문제를 만들어 나갈 수
            있습니다. 퀴즈가 완성되면, 다른 사람들에게 링크를 공유하여 함께 풀
            수 있습니다.
          </p>
          <p>
            그리고 물론, AQUIZ 사이트에서는 퀴즈 결과와 통계를 제공해줍니다.
            자신이 만든 퀴즈를 다른 사람들이 얼마나 많이 푸는지, 각 문제의
            정답률이 어떻게 되는지, 그리고 더 나아가서 다른 사람들은 어떤 정답을
            골랐는지에 대한 인사이트를 결과창 아래에 있는 자유게시판을 통해 확인
            할 수 있습니다. 즐겁게 퀴즈를 만들고, 풀고, 공유해보세요!
          </p>
        </article>
      </AboutSubContainer>
    </AboutContainer>
  );
}

export default About;
