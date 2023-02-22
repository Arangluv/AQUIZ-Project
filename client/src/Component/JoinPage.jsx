import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
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
    color: #676a6c;
    margin-bottom: 1.2vw;
    @media screen and (max-width: 767px) {
      font-size: 2.5vh;
      margin-bottom: 1.2vh;
    }
  }
  span {
    display: block;
    font-size: 1vw;
    color: #676a6c;
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
    border-bottom: 1px solid #676a6c;
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
      color: #676a6c;
      @media screen and (max-width: 767px) {
        width: 2.5vh;
        font-size: 2.5vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      background-color: #fffbf5;
      height: 5h;
      border: none;
      @media screen and (max-width: 767px) {
        width: 16vh;
      }
    }
  }
  //.parent:hover > .child
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
    border-bottom: 1px solid #676a6c;
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
      color: #676a6c;
      @media screen and (max-width: 767px) {
        width: 2.5vh;
        font-size: 2.5vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      background-color: #fffbf5;
      height: 5h;
      border: none;
      @media screen and (max-width: 767px) {
        width: 16vh;
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
  label:nth-child(3) {
    padding-bottom: 0.3vw;
    border-bottom: 1px solid #676a6c;
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
      color: #676a6c;
      @media screen and (max-width: 767px) {
        width: 2.5vh;
        font-size: 2.5vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      background-color: #fffbf5;
      height: 5h;
      border: none;
      @media screen and (max-width: 767px) {
        width: 16vh;
      }
    }
  }
  label:nth-child(3):focus-within {
    border-bottom: 1px solid #ff8b13;
    input {
      outline: none;
    }
    span {
      color: #ff8b13;
    }
  }
  label:nth-child(4) {
    padding-bottom: 0.3vw;
    border-bottom: 1px solid #676a6c;
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
      color: #676a6c;
      @media screen and (max-width: 767px) {
        width: 2.5vh;
        font-size: 2.5vh;
        margin-right: 1vh;
      }
    }
    input {
      width: 16vw;
      background-color: #fffbf5;
      height: 5h;
      border: none;
      @media screen and (max-width: 767px) {
        width: 16vh;
      }
    }
  }
  label:nth-child(4):focus-within {
    border-bottom: 1px solid #ff8b13;
    input {
      outline: none;
    }
    span {
      color: #ff8b13;
    }
  }
  input[type="submit"] {
    width: 19.3vw;
    display: block;
    font-size: 1.3vw;
    padding: 1vw 0;
    background-color: rgba(255, 139, 19, 0.8);
    border: none;
    color: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    transition: 0.1s ease-in-out;
    @media screen and (max-width: 767px) {
      width: 19.5vh;
      font-size: 1.6vh;
      padding: 1vh 0;
    }
  }
  input[type="submit"]:hover {
    background-color: #f2cd5c;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
  }
`;
function JoinPage() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const passward1 = event.target.password1.value;
    const passward2 = event.target.password2.value;
    fetch("http://localhost:4001/join", {
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
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("회원가입을 하는데 실패했습니다.");
        }
      })
      .then((result) => {
        const { token, username } = result;
        const expireTime = new Date();
        expireTime.setHours(expireTime.getHours() + 24 * 7); // 유효기간 7일
        setCookie(
          "token",
          {
            token,
            username,
          },
          {
            path: "/",
            expires: expireTime,
            // httpOnly: true,
          }
        );
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
        console.log(error);
      });
  };
  return (
    <JoinContainer>
      {errorMsg ? <span>{errorMsg}</span> : null}
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
        <input type="submit" value="회원가입하기" required />
      </JoinFormBox>
    </JoinContainer>
  );
}

export default JoinPage;
