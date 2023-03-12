import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactHelmet from "../../ReactHelmet";
const FaqContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10vh;
  @media screen and (max-width: 767px) {
    margin-top: 6vh;
  }
`;
const FaqSubContainer = styled.div`
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
    padding: 4vh;
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
      @media screen and (max-width: 767px) {
        font-size: 1.3vh;
        margin-bottom: 0.8vh;
      }
      span {
        color: #537fe7;
        margin-right: 0.2vw;
        @media screen and (max-width: 767px) {
          margin-right: 0.4vh;
        }
      }
    }
    p {
      font-size: 1.1vw;
      line-height: 1.5vw;
      @media screen and (max-width: 767px) {
        font-size: 1.3vh;
        line-height: 1.5vh;
      }
      span {
        font-size: 1.2vw;
        font-weight: 600;
        color: #e90064;
        margin-right: 0.2vw;
        @media screen and (max-width: 767px) {
          margin-right: 0.4vh;
        }
      }
    }
  }
`;
function Faq() {
  return (
    <FaqContainer>
      <ReactHelmet
        description="퀴즈를 풀거나 혹은 만들거나 할 때 의문이 들 수 있는 부분들을 볼 수 있습니다."
        title="AQUIZ, 퀴즈메이커 - 자주 묻는 질문"
        pageTitle="AQUIZ, 퀴즈메이커 - 자주 묻는 질문"
      />
      <FaqSubContainer>
        <article>
          <h2>
            <span>Q.</span>AQUIZ는 무엇인가요?
          </h2>
          <p>
            <span>A. </span>
            AQUIZ는 자유롭게 퀴즈를 만들어, 다른사람들이 자신이 만들 퀴즈를 풀
            수 있게끔 장소를 빌려드리고 있습니다. 퀴즈의 주제는 자유이며, 각
            퀴즈마다 있는 "공유하기" 버튼을 눌러 다른사람들과 퀴즈를 공유할 수
            있습니다.
          </p>
        </article>

        <article>
          <h2>
            <span>Q.</span>퀴즈를 만드는데 돈이드나요?
          </h2>
          <p>
            <span>A. </span>
            아니요. 완전히 무료입니다. 하지만 곳곳에 광고정도는 붙여둘 수는
            있습니다. AQUIZ 개발자의 커피값에 보태주신다는 생각으로 눈감아
            주시면 감사하겠습니다.
          </p>
        </article>

        <article>
          <h2>
            <span>Q.</span>회원가입이 반드시 필요한가요?
          </h2>
          <p>
            <span>A.</span>
            반드시까지는 아닙니다. 하지만 퀴즈를 만들기 위해서는 로그인이
            필요합니다. 자신이 퀴즈는 만들지는 않고 오직 풀기만 하겠다면
            회원가입은 하지 않으셔도 됩니다. 하지만 본인만의 퀴즈를 만들어
            남들과 공유해보는것은 어떨까요?
          </p>
        </article>

        <article>
          <h2>
            <span>Q.</span>브라우저에서 이용하는데 어려움이 있습니다.
          </h2>
          <p>
            <span>A.</span>
            불편을 드려서 죄송합니다. 대부분의 문제는{" "}
            <Link to="https://www.google.co.kr/chrome/?brand=CHBD&gclid=Cj0KCQiAi8KfBhCuARIsADp-A57DJrtLn3VuUAmKe1jrFTAoJQ5WRoF42JIrDnFiWg42VP8S7K3Jgl8aAq7GEALw_wcB&gclsrc=aw.ds">
              크롬 다운로드
            </Link>
            를 통해 해결이 가능할 것입니다. 해결이 되지 않을 시{" "}
            <Link to="/contact">'문의하기'</Link>를 통해 직접 문의해주시면
            감사하겠습니다.
          </p>
        </article>

        <article>
          <h2>
            <span>Q.</span>퀴즈의 답이 맞았는데, 틀렸다고 나옵니다. 왜그런가요?
          </h2>
          <p>
            <span>A.</span>
            AQUIZ에서 만드는 퀴즈는 모두 각각 다른 개성을 지닌 메이커들이
            만들기때문에, 정답 역시 퀴즈 메이커가 정한대로 설정되게 됩니다..
            퀴즈 메이커가 설정한 정답과 내가 생각한 정답이 일치하지 않을 시 퀴즈
            메이커에게 수정을 요청하는 기능을 추가로 구현할 예정입니다. 당분간은
            불편하시더라도, 퀴즈 결과 화면 하단에 있는 자유게시판을
            이용부탁드립니다!
          </p>
        </article>
        <article>
          <h2>
            <span>Q.</span>수위가 위험하거나, 불편하게 만드는 퀴즈가 있습니다.
          </h2>
          <p>
            <span>A.</span>
            <Link to="/contact">문의하기</Link>를 통해 개발자에게 신고
            부탁드립니다. 신고를 받은 후 해당 퀴즈를 확인하여 판단하에
            '삭제조치'를 하겠습니다. 적극적인 참여 부탁드립니다.
          </p>
        </article>
      </FaqSubContainer>
    </FaqContainer>
  );
}

export default Faq;
