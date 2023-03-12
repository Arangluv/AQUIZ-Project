import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactHelmet from "./ReactHelmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  h1 {
    font-size: 3vw;
    color: rgba(103, 106, 108, 1);
    margin-bottom: 1vw;
    @media screen and (max-width: 767px) {
      font-size: 3vh;
      margin-top: 1.5vh;
      margin-bottom: 2vh;
    }
  }
  span {
    margin-bottom: 1vw;
    font-size: 10vw;
    color: #cd0404;
    @media screen and (max-width: 767px) {
      font-size: 10vh;
      margin-bottom: 2vh;
    }
  }
  a {
    font-size: 2vw;
    background-color: white;
    padding: 1vw 0.6vw;
    border: 1px solid #0081c9;
    border-radius: 5px;
    color: #0081c9;
    transition: 0.1s ease-in-out;
    @media screen and (max-width: 767px) {
      font-size: 3vh;
      padding: 1vh 0.6vh;
    }
  }
  a:hover {
    background-color: #0081c9;
    color: white;
  }
`;
function NotFound() {
  return (
    <>
      <ReactHelmet
        description="요청을 처리하는 도중 오류가 발생하였거나, 네트워크에 문제가 발생하여 정상적으로 페이지 이동이 불가합니다. 새로고침 후 다시 이용해주시거나, 홈화면에서 다시 이동해주세요."
        title="페이지를 찾을 수 없습니다."
        pageTitle="페이지를 찾을 수 없습니다."
      />
      <NotFoundContainer>
        <h1>페이지를 찾을 수 없습니다 </h1>
        <span>
          <font>
            <FontAwesomeIcon icon={faFaceMeh}></FontAwesomeIcon>
          </font>
        </span>
        <Link to="/">홈으로 가기</Link>
      </NotFoundContainer>
    </>
  );
}

export default NotFound;
