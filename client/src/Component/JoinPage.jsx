import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactHelmet from "./ReactHelmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import URL from "../assets/url";
const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const JoinDescription = styled.div`
  margin-top: 3vw;
  margin-bottom: 3vw;
  text-align: center;
  @media screen and (max-width: 767px) {
    margin-top: 3vh;
    margin-bottom: 3vh;
  }
  h3 {
    font-size: 2.5vw;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 1.2vw;
    @media screen and (max-width: 767px) {
      font-size: 2.5vh;
      margin-bottom: 1.2vh;
    }
  }
  span {
    display: block;
    font-size: 1vw;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 0.5vw;
    @media screen and (max-width: 767px) {
      font-size: 1.2vh;
      margin-bottom: 0.5vh;
    }
  }
`;
const JoinFormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  label:nth-child(1) {
    padding-bottom: 0.3vw;
    border-bottom: 1px solid ${(props) => props.theme.textColor};
    display: flex;
    text-align: center;
    margin-bottom: 2vw;
    @media screen and (max-width: 767px) {
      padding-bottom: 0.3vh;
      margin-bottom: 1.5vh;
    }
    span {
      width: 2.5vw;
      font-size: 2.5vw;
      display: block;
      margin-right: 0.8vw;
      color: ${(props) => props.theme.textColor};
      @media screen and (max-width: 767px) {
        width: 2.5vh;
        font-size: 2.5vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      background-color: ${(props) => props.theme.bgColor};
      transition: background-color 0.2s ease-in-out;
      color: ${(props) => props.theme.textColor};
      height: 5h;
      border: none;
      &::placeholder {
        color: ${(props) => props.theme.textColor};
      }
      @media screen and (max-width: 767px) {
        width: 16vh;
      }
    }
  }
  //.parent:hover > .child
  label:nth-child(1):focus-within {
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
    input {
      outline: none;
    }
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }

  label:nth-child(2) {
    padding-bottom: 0.3vw;
    border-bottom: 1px solid ${(props) => props.theme.textColor};
    display: flex;
    text-align: center;
    margin-bottom: 2vw;
    @media screen and (max-width: 767px) {
      padding-bottom: 0.3vh;
      margin-bottom: 1.5vh;
    }
    span {
      width: 2.5vw;
      font-size: 2.5vw;
      display: block;
      margin-right: 0.8vw;
      color: ${(props) => props.theme.textColor};
      @media screen and (max-width: 767px) {
        width: 2.5vh;
        font-size: 2.5vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      background-color: ${(props) => props.theme.bgColor};
      transition: background-color 0.2s ease-in-out;
      color: ${(props) => props.theme.textColor};
      height: 5vh;
      border: none;
      &::placeholder {
        color: ${(props) => props.theme.textColor};
      }
      @media screen and (max-width: 767px) {
        width: 16vh;
      }
    }
  }
  label:nth-child(2):focus-within {
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
    input {
      outline: none;
    }
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }
  label:nth-child(3) {
    padding-bottom: 0.3vw;
    border-bottom: 1px solid ${(props) => props.theme.textColor};
    display: flex;
    text-align: center;
    margin-bottom: 2vw;
    @media screen and (max-width: 767px) {
      padding-bottom: 0.3vh;
      margin-bottom: 1.5vh;
    }
    span {
      width: 2.5vw;
      font-size: 2.5vw;
      display: block;
      margin-right: 0.8vw;
      color: ${(props) => props.theme.textColor};
      @media screen and (max-width: 767px) {
        width: 2.5vh;
        font-size: 2.5vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      background-color: ${(props) => props.theme.bgColor};
      transition: background-color 0.2s ease-in-out;
      height: 5h;
      border: none;
      color: ${(props) => props.theme.textColor};
      &::placeholder {
        color: ${(props) => props.theme.textColor};
      }
      @media screen and (max-width: 767px) {
        width: 16vh;
      }
    }
  }
  label:nth-child(3):focus-within {
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
    input {
      outline: none;
    }
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }
  label:nth-child(4) {
    padding-bottom: 0.3vw;
    border-bottom: 1px solid ${(props) => props.theme.textColor};
    display: flex;
    text-align: center;
    margin-bottom: 3vw;
    @media screen and (max-width: 767px) {
      padding-bottom: 0.3vh;
      margin-bottom: 2.5vh;
    }
    span {
      width: 2.5vw;
      font-size: 2.5vw;
      display: block;
      margin-right: 0.8vw;
      color: ${(props) => props.theme.textColor};
      @media screen and (max-width: 767px) {
        width: 2.5vh;
        font-size: 2.5vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      background-color: ${(props) => props.theme.bgColor};
      transition: background-color 0.2s ease-in-out;
      height: 5h;
      border: none;
      color: ${(props) => props.theme.textColor};
      &::placeholder {
        color: ${(props) => props.theme.textColor};
      }
      @media screen and (max-width: 767px) {
        width: 16vh;
      }
    }
  }
  label:nth-child(4):focus-within {
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
    input {
      outline: none;
    }
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }
  input[type="submit"] {
    width: 19.3vw;
    display: block;
    font-size: 1.3vw;
    padding: 1vw 0;
    background-color: ${(props) => props.theme.accentColor};
    border: none;
    color: ${(props) => props.theme.textColor};
    border-radius: 5px;
    transition: 0.1s ease-in-out;
    @media screen and (max-width: 767px) {
      width: 21.5vh;
      font-size: 1.6vh;
      padding: 1.4vh 0;
      -webkit-appearance: none;
      -webkit-border-radius: 3;
    }
  }
  input[type="submit"]:hover {
    background-color: #f2cd5c;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;
const ErrorMsg = styled.span`
  font-size: 1.1vw;
  color: #df2e38;
  margin-bottom: 1.3vw;
  @media screen and (max-width: 767px) {
    font-size: 1.1vh;
    margin-bottom: 1.3vh;
  }
`;
const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.bgColor};
  opacity: 0.6;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  img {
    position: fixed;
    top: 30%;
    width: 10vw;
    height: 10vw;
    @media screen and (max-width: 767px) {
      width: 10vh;
      height: 10vh;
    }
  }
`;
function JoinPage() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
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
    setIsSubmit(true);
    const email = event.target.email.value;
    const username = event.target.username.value;
    const passward1 = event.target.password1.value;
    const passward2 = event.target.password2.value;
    fetch(`${URL}join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, // json형태의 데이터를 서버로 보냅니다.
      body: JSON.stringify({
        email,
        username,
        passward1,
        passward2,
      }),
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result?.errorMessage) {
          throw new Error(result.errorMessage);
        }
        window.location.replace("/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
        setIsSubmit(false);
        console.log(error);
        console.log("------");
      });
  };
  return (
    <>
      <ReactHelmet
        description="AQUIZ 퀴즈메이커의 회원가입 페이지 입니다."
        title="AQUIZ, 퀴즈메이커 - 회원가입"
        pageTitle="AQUIZ, 퀴즈메이커 - 회원가입"
      />
      <JoinContainer>
        <JoinDescription>
          <h3>AQUIZ를 방문해주셔서 감사합니다.</h3>
          <span>이메일을 통해 간편하게 회원가입을 진행하실 수 있습니다.</span>
          <span>별도의 인증은 요구하지 않습니다!</span>
        </JoinDescription>
        <JoinFormBox onSubmit={onSubmit}>
          <label htmlFor="join_email">
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              id="join_email"
              name="email"
              type="email"
              placeholder="이메일"
              required
            />
          </label>
          <label htmlFor="join_username">
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              id="join_username"
              name="username"
              type="text"
              placeholder="닉네임"
              required
              maxLength={10}
            />
          </label>
          <label htmlFor="join_password1">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              id="join_password1"
              name="password1"
              type="password"
              placeholder="비밀번호"
              required
            />
          </label>
          <label htmlFor="join_password2">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              id="join_password2"
              name="password2"
              type="password"
              placeholder="비밀번호 확인"
              required
            />
          </label>
          {errorMsg ? <ErrorMsg>{errorMsg}</ErrorMsg> : null}
          <input type="submit" value="회원가입하기" required />
        </JoinFormBox>
      </JoinContainer>
      {isSubmit ? (
        <Background>
          <img src="/loading.gif" alt="스피너 이미지" />
        </Background>
      ) : null}
    </>
  );
}

export default JoinPage;
