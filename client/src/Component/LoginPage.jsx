import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faRightFromBracket,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
//#fffbf5
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
//#ff8b13
const LoginFormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3vw;
  @media screen and (max-width: 767px) {
    margin-bottom: 3vh;
  }
  label:nth-child(1) {
    padding-bottom: 0.14vw;
    border-bottom: 1px solid black;
    display: flex;
    text-align: center;
    margin-bottom: 2vw;
    @media screen and (max-width: 767px) {
      padding-bottom: 0.2vh;
      margin-bottom: 2vh;
    }
    span {
      font-size: 2vw;
      width: 2vw;
      display: block;
      margin-right: 1vw;
      color: #676a6c;
      @media screen and (max-width: 767px) {
        font-size: 2vh;
        width: 2vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      height: 5h;
      border: none;
      background-color: #fffbf5;
      @media screen and (max-width: 767px) {
        width: 13vh;
        font-size: 1.2vh;
      }
    }
  }
  label:nth-child(1):focus-within {
    border-bottom: 1px solid #ff8b13;
    input {
      outline: none;
    }
    span {
      color: #ff8b13;
    }
  }

  label:nth-child(2) {
    padding-bottom: 0.3vw;
    border-bottom: 1px solid black;
    display: flex;
    text-align: center;
    margin-bottom: 2vw;
    @media screen and (max-width: 767px) {
      padding-bottom: 0.2vh;
      margin-bottom: 2vh;
    }
    span {
      width: 2vw;
      font-size: 2vw;
      display: block;
      margin-right: 1vw;
      color: #676a6c;
      @media screen and (max-width: 767px) {
        font-size: 2vh;
        width: 2vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      height: 5h;
      border: none;
      background-color: #fffbf5;
      @media screen and (max-width: 767px) {
        width: 13vh;
        font-size: 1.2vh;
      }
    }
  }
  label:nth-child(2):focus-within {
    border-bottom: 1px solid #ff8b13;
    input {
      outline: none;
    }
    span {
      color: #ff8b13;
    }
  }
  input[type="submit"] {
    width: 19vw;
    display: block;
    height: 5vh;
    background-color: rgba(255, 139, 19, 0.8);
    border: none;
    color: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    @media screen and (max-width: 767px) {
      width: 16vh;
      height: 3vh;
      font-size: 1.2vh;
    }
  }

  input[type="submit"]:hover {
    background-color: #f2cd5c;
    cursor: pointer;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

const LoginDescription = styled.div`
  margin-top: 4vw;
  margin-bottom: 3vw;
  text-align: center;
  @media screen and (max-width: 767px) {
    /* 모바일 */
    margin-top: 4vh;
    margin-bottom: 3vh;
  }
  h3 {
    font-size: 2vw;
    color: #676a6c;
    margin-bottom: 2vw;
    @media screen and (max-width: 767px) {
      font-size: 2vh;
      margin-bottom: 2vh;
    }
  }
  span {
    display: block;
    color: #676a6c;
    font-size: 1vw;
    margin-bottom: 0.5vw;
    @media screen and (max-width: 767px) {
      font-size: 1vh;
      margin-bottom: 0.5vh;
    }
  }
`;
const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  small {
    opacity: 0.6;
    margin-bottom: 1vw;
    font-size: 1.2vw;
    display: block;
    text-align: center;
    width: 19vw;
    @media screen and (max-width: 767px) {
      margin-bottom: 1vh;
      font-size: 1.2vh;
      width: 16vh;
    }
  }
  span {
    font-size: 1.5vw;
    border: 1px solid #205295;
    border-radius: 3px;
    background-color: white;
    display: block;
    width: 19vw;
    text-align: center;
    padding: 0.6vw 0;
    transition: 0.1s ease-in-out;
    a {
      color: #205295;
    }
    @media screen and (max-width: 767px) {
      font-size: 1.5vh;
      width: 16vh;
      padding: 0.8vh 0;
    }
  }
  span:hover {
    a {
      color: white;
    }
    background-color: #205295;
  }
`;
const LoginErrorBox = styled.div`
  margin-bottom: 2.5vw;
  color: rgba(255, 0, 0, 0.8);
  font-weight: 500;
  font-size: 1vw;
  span:nth-child(1) {
    margin-right: 0.5vw;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.1vh;
  }
`;
function LoginForm() {
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${URL}api/tokenInspect`, {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        alert("잘못된 접근입니다.");
        navigate("/");
      }
      return;
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const URL =
      process.env.NODE_ENV === "production"
        ? "https://api.aquiz.co.kr/"
        : "http://localhost:4001/";

    fetch(`${URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, // json형태의 데이터를 서버로 보냅니다.
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("로그인하는데 오류가 발생했습니다.");
        }
      })
      .then(() => {
        window.location.replace("/");
      })
      .catch((error) => {
        console.log("여기가 실행?");
        console.log(error.message);
        setErrorMsg(error.message);
      });
  };
  return (
    <LoginContainer>
      <LoginDescription>
        <h3>AQUIZ를 방문해주셔서 감사합니다.</h3>
        <span>
          AQUIZ에서 제공하는 서비스를 원할하게 이용하기 위해서는 로그인이
          필요합니다.
        </span>
        <span>이메일을 통해 간편하게 회원가입을 진행하실 수 있습니다.</span>
      </LoginDescription>
      <LoginFormBox onSubmit={onSubmit}>
        <label htmlFor="login_email" className="focus-border-email">
          <span>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            id="login_email"
            name="email"
            type="email"
            placeholder="이메일"
            required
          />
        </label>
        <label htmlFor="login_password">
          <span>
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            id="login_password"
            name="password"
            type="password"
            placeholder="비밀번호"
            required
          />
        </label>
        {errorMsg ? (
          <LoginErrorBox>
            <span>이메일 혹은 비밀번호가 맞지 않습니다</span>
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </LoginErrorBox>
        ) : null}
        <input type="submit" value="로그인 하기" />
      </LoginFormBox>
      {/* <button>트위터로 바로 로그인하기</button> */}
      <JoinContainer>
        <small>아직 회원가입 하지 않으셨나요?</small>
        <span>
          <Link to="/join">
            <FontAwesomeIcon icon={faRightFromBracket} />
            회원가입하기
          </Link>
        </span>
      </JoinContainer>
    </LoginContainer>
  );
}

export default LoginForm;
