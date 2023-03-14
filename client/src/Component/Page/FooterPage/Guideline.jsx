import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactHelmet from "../../ReactHelmet";
const GuideContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10vh;
  @media screen and (max-width: 767px) {
    margin-top: 6vh;
  }
  div > a {
    font-size: 1.5vw;
    display: block;
    border: 1px solid rgba(83, 127, 231, 1);
    padding: 1.2vw 3vw;
    margin-top: 2vw;
    border-radius: 3px;
    color: #537fe7;
    transition: 0.1s ease-in-out;
    @media screen and (max-width: 767px) {
      font-size: 1.5vh;
      padding: 1.2vh 3vh;
    }
  }
  div > a:hover {
    background-color: #537fe7;
    color: white;
    border-color: white;
  }
`;
const GuideSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 3vw;
  border-radius: 3px;
  border: 1px solid rgba(103, 106, 108, 0.3);
  background-color: white;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    padding: 3vh;
  }
  article {
    padding: 1vw;
    margin-bottom: 1vw;
    color: #676a6c;
    @media screen and (max-width: 767px) {
      padding: 2vw;
    }
    h2 {
      font-size: 1.2vw;
      font-weight: 600;
      margin-bottom: 0.8vw;
      color: #537fe7;
      @media screen and (max-width: 767px) {
        font-size: 1.3vh;
        margin-bottom: 0.8vh;
      }
    }
    p {
      font-size: 1.1vw;
      line-height: 1.5vw;
      @media screen and (max-width: 767px) {
        font-size: 1.3vh;
        line-height: 1.5vh;
      }
    }
  }
`;
function Guideline() {
  return (
    <GuideContainer>
      <ReactHelmet
        description="서비스를 이용하면서 준수해야할 부분을 정리한 가이드라인입니다."
        title="AQUIZ, 퀴즈메이커 - 가이드 라인"
        pageTitle="AQUIZ, 퀴즈메이커 - 가이드 라인"
      />
      <GuideSubContainer>
        <article>
          <h2>만들어서는 안되는 퀴즈</h2>
          <p>
            특정 누군가를 비난 혹은 비판하는 내용의 퀴즈, 과도하게 노출이 많은
            컨텐츠, 민감한 주제가 될 수 있는 퀴즈 등은 경고 조치없이 삭제조치를
            받게 됩니다.
          </p>
        </article>

        <article>
          <h2>퀴즈를 만들때 답변에 실수가 있는지 확인해주세요</h2>
          <p>
            이해하기 어려운 정답 혹은 답변에는 퀴즈의 해설을 작성할때 부연설명을
            기입해주시거나, 정답의 출처를 기입해 주시는 등 퀴즈를 플레이하는
            사람들이 보다 알기 쉽게 작성해주시면 감사하겠습니다.
          </p>
        </article>

        <article>
          <h2>명확한 답이 없는 퀴즈는 피하는것이 좋습니다.</h2>
          <p>
            사상 혹은 개인의 주관적인 가치관에 따라 정답이 달라질 수 있는 퀴즈에
            대해서는 출제하지 않는 것이 좋습니다. 모두에게 공개되는 퀴즈인 만큼
            다양한 답을 가질 수 있는 문제에 대해서는 조심히 다루어주셨으면
            좋겠습니다.
          </p>
        </article>

        <article>
          <h2>의도적으로 잘못된 답변을 작성하지 말아주세요</h2>
          <p>
            퀴즈를 즐기는 사람들에게 의도적으로 혼란을 유도하기 위한 답변은
            삼가해주세요. 만약 신고가 누적될 경우, 경고 없이 퀴즈가 삭제될 수
            있습니다. 다만 실수로 혹은 고의성이 없을 경우는 예외입니다. 퀴즈의
            정답을 잘못설정하였다면, 마이페이지에서 퀴즈 정답을 수정할 수
            있습니다.
          </p>
        </article>

        <article>
          <h2>가이드라인 내용 보충</h2>
          <p>
            외설적인 내용이나, 폭력적 혹은 과도한 노출이 있는 컨텐츠를 만드는
            것은 삼가부탁드립니다. 향후, 과도한 노출이 있는 컨텐츠가 있는 경우
            퀴즈를 만드는 사람들로 하여금 선택사항을 부여하여, 자체적으로
            컨텐츠를 가릴 수 있도록 하는 기능을 구현할 예정입니다. 문의 내용이
            많을 경우 즉각적으로 의견을 피드백해드리는 것은 어렵지만, 최대한
            반영해보겠습니다.
          </p>
        </article>
        <article>
          <h2>이런 기능도 만들어주세요</h2>
          <p>
            서비스를 즐기시다가 여러 부족한 부분이 있다고 느껴지거나, 이런
            기능도 있으면 좋겠다고 느끼시면 지체없이 하단의
            <Link to="/contact"> 문의하기</Link>를 누르셔서 '이런 기능도
            만들어주세요' 등의 문의 부탁드립니다. 제 개발능력 안에 있는
            구현내용이면 최대한 반영해보도록 하겠습니다. 소중한 의견 기다리고
            있습니다.
          </p>
        </article>
        <div>
          <Link to="/article">칼럼보러가기</Link>
        </div>
      </GuideSubContainer>
    </GuideContainer>
  );
}

export default Guideline;
