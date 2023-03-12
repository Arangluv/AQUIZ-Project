import { useContext, useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { UserInformation } from "../Content/UserInformation";
import ReactHelmet from "./ReactHelmet";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faMarker,
  faHouseUser,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import URL from "../assets/url";
const LogoImageContainer = styled.div`
  height: 6vh;
  width: 14vh;
  @media screen and (max-width: 767px) {
    width: 10vh;
    height: 5vh;
  }
`;
const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const Nav = styled.nav`
  width: 90%;
  display: flex;
  /* border: 1px solid blue; */
  font-size: 1vw;
  align-items: center;
  font-weight: 600;
  padding-left: 2.5vw;
  padding-right: 2vw;
  box-sizing: border-box;
  @media screen and (max-width: 767px) {
    font-size: 1vh;
  }
`;

const Ul = styled.ul`
  display: flex;
  width: 100%;
`;

const QuizContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  @media screen and (max-width: 767px) {
    width: 45%;
  }
  li:nth-child(1) {
    margin-right: 4vw;
  }
  li:nth-child(1):hover {
    a {
      span {
        color: #ffc93c;
      }
    }
  }
  li:nth-child(2):hover {
    a {
      @media screen and (max-width: 767px) {
        font-size: 1.2vh;
      }
      span {
        color: #ff78f0;
      }
    }
  }
  /* #676a6c; */
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #676a6c;
    span {
      margin-right: 0.3vw;
      font-size: 1.1vw;
      @media screen and (max-width: 767px) {
        /* 모바일 */
        font-size: 1.6vh;
      }
    }
  }
  a:hover {
    color: #ff8b13;
  }
  /* emphasis part */
  li:nth-child(1) {
    a {
      color: ${({ emphasis }) =>
        emphasis === "screen" ? "#ff8b13" : "#676a6c"};
    }
    a {
      span {
        color: ${({ emphasis }) =>
          emphasis === "screen" ? "#ffc93c" : "#676a6c"};
      }
    }
  }
  li:nth-child(2) {
    a {
      color: ${({ emphasis }) => (emphasis === "make" ? "#ff8b13" : "#676a6c")};
    }
    a {
      span {
        color: ${({ emphasis }) =>
          emphasis === "make" ? "#ff78f0" : "#676a6c"};
      }
    }
  }
`;
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* border: 1px solid red; */
  width: 50%;
  @media screen and (max-width: 767px) {
    width: 55%;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #676a6c;
    span {
      margin-right: 0.3vw;
      font-size: 1vw;
      @media screen and (max-width: 767px) {
        /* 모바일 */
        font-size: 1.6vh;
      }
    }
  }
  a:hover {
    color: #ff8b13;
  }
  li:nth-child(1) {
    margin-right: 4vw;
  }
  li:nth-child(2) {
    margin-right: 8vw;
  }
  li:nth-child(1) {
    a {
      color: ${({ emphasis }) => {
        if (emphasis === "mypage") {
          return "#ff8b13";
        } else if (emphasis === "login") {
          return "#205295";
        } else {
          return "#676a6c";
        }
      }};
    }
  }
`;

const LogoutButton = styled.button`
  cursor: pointer;
`;
function Header({ className }) {
  const { user } = useContext(UserInformation);
  // Header 강조를 위한 State 선언
  const [emphasis, setEmpahsis] = useState("");
  const { pathname } = useLocation();

  const pathArray = pathname.split("/");
  useEffect(() => {
    if (pathArray[1] === "") {
      setEmpahsis("screen");
    } else if (pathArray.length >= 4) {
      if (pathArray[2] === "quiz" && pathArray[3] === "create_quiz") {
        setEmpahsis("make");
      }
    } else if (pathArray.length >= 3) {
      if (pathArray[1] === "my-page") {
        setEmpahsis("mypage");
      }
    } else if (pathArray[1] === "login") {
      setEmpahsis("login");
    } else {
      setEmpahsis("");
    }
  }, [emphasis, pathname, pathArray]);
  const handleLogOut = () => {
    fetch(`${URL}logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          window.location.replace("/");
          return;
        } else {
          throw new Error(
            "로그아웃을 하는데 문제가 발생했습니다. 다시 로그아웃해주세요"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let _id;
  if (user !== null) {
    _id = user._id;
  } else {
    _id = null;
  }
  const handleClick = (event) => {
    if (!user) {
      event.preventDefault();
      alert("로그인 후 이용해주세요");
      window.location.replace("/login");
    }
  };
  return (
    <header className={className}>
      <Link to="/">
        <LogoImageContainer>
          <LogoImage
            src="https://aquizbuket.s3.ap-northeast-2.amazonaws.com/logo/logo.png"
            alt="로고이미지"
          />
        </LogoImageContainer>
      </Link>

      <Nav>
        <Ul>
          <QuizContainer emphasis={emphasis}>
            <li>
              <NavLink to="/">
                <span>
                  <FontAwesomeIcon icon={faLightbulb} />
                </span>
                퀴즈 보기
              </NavLink>
            </li>
            <li>
              {/* <NavLink to={`${_id}/quiz/create_quiz`} onClick={handleClick}> */}
              <NavLink to={`${_id}/quiz/create_quiz`}>
                <span>
                  <FontAwesomeIcon icon={faMarker} />
                </span>
                퀴즈 만들기
              </NavLink>
            </li>
          </QuizContainer>
          <LoginContainer emphasis={emphasis}>
            {user ? (
              <>
                <li>
                  <NavLink to={`my-page/${_id}`}>
                    <span>
                      <FontAwesomeIcon icon={faHouseUser} />
                    </span>
                    마이페이지
                  </NavLink>
                </li>
                <li>
                  <LogoutButton onClick={handleLogOut} as="a">
                    <span>
                      <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </span>
                    로그아웃
                  </LogoutButton>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="login">
                  <span>
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                  </span>
                  로그인
                </NavLink>
              </li>
            )}
          </LoginContainer>
        </Ul>
      </Nav>
    </header>
  );
}

export default Header;
