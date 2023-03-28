import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import URL from "../../../assets/url";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10vh;
`;
const EditFormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4vw 6vw;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  label {
    margin-bottom: 3vh;
    display: flex;
    width: 100%;
    input {
      width: 20vw;
      padding: 0.6vw 0.8vw;
      color: ${(props) => props.theme.textColor};
      background-color: ${(props) => props.theme.bgColor};
      border: 1px solid ${(props) => props.theme.textColor};
      border-radius: 3px;
      &::placeholder {
        color: ${(props) => props.theme.textColor};
      }
    }
    @media screen and (max-width: 767px) {
      margin-bottom: 2vh;
      input {
        width: 20vh;
        padding: 0.5vh 0.7vh;
      }
    }
  }
  label:nth-child(1) input {
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.textColor};
  }
  label:nth-child(1) input:focus {
    outline-style: none;
  }
  label:nth-child(3) {
    margin-bottom: 2vw;
    @media screen and (max-width: 767px) {
      margin-bottom: 2vh;
    }
  }
  input[type="submit"] {
    background-color: white;
    font-family: "Gowun Batang", serif;
    border-radius: 3px;
    font-weight: 600;
    border: 1px solid ${(props) => props.theme.nextBntColor};
    color: ${(props) => props.theme.nextBntColor};
    background-color: ${(props) => props.theme.bgColor};
    font-size: 1.3vw;
    padding: 0.4vw 0.6vw;
    width: 80%;
    transition: 0.1s ease-in-out;
    box-shadow: 0.05vw 0.05vw 0.1vw gray;
    @media screen and (max-width: 767px) {
      font-size: 1.5vh;
      padding: 1vh 0.8vh;
      -webkit-appearance: none;
      -webkit-border-radius: 3px;
    }
  }
  input[type="submit"]:hover {
    background-color: #3e6d9c;
    border: 1px solid #3e6d9c;
    color: white;
  }
`;
const FontContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  font-size: 1.4vw;
  color: ${(props) => props.theme.textColor};
  font {
    margin-left: 0.5vw;
    margin-right: 1vw;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.5vh;
    width: 40%;
  }
`;
const ErrorMsgSpan = styled.span`
  margin-bottom: 4vh;
  color: #e0144c;
  font-size: 1vw;
  @media screen and (max-width: 767px) {
    margin-bottom: 2vh;
    font-size: 1.3vh;
  }
`;
function Edit() {
  // Url Params
  const userId = useParams().id;
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // user Token

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    const regex = /([0-9a-f]{24})/;
    if (!regex.test(userId)) {
      navigate("/not");
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    // User login check
    fetch(`${URL}api/tokenInspect`, {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        alert("로그인 후 이용해주세요.");
        navigate("/");
      }
      return;
    });
    // set username
    fetch(`${URL}api/userInfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("사용자 정보를 불러오는데 오류가 발생했습니다.");
        }
      })
      .then((result) => {
        setEmail(result.email);
        setUserName(result.username);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        console.log("사용자 정보를 받아오는데 문제가 발생했습니다.");
        setIsLoading(false);
      });
  }, []);
  // handle Method
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePost = (event) => {
    event.preventDefault();
    fetch(`${URL}users/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("사용자 정보를 수정하는데 오류가 발생했습니다.");
        }
      })
      .then((result) => {
        if (result.errorMessage) {
          setErrorMsg(result.errorMessage);
        }
        if (result.message) {
          // token refresh
          fetch(`${URL}api/refresh-token/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((response) => response.json())
            .then(() => console.log("refresh"))
            .then(() => {
              fetch(`${URL}logout`, {
                method: "GET",
                credentials: "include",
              })
                .then((response) => {
                  if (response.ok) {
                    alert("성공적으로 변경하였습니다. 다시 로그인해주세요.");
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
            })
            .catch((error) => {
              console.log("쿠키를 리프레쉬 하는 과정에서 문제가 발생했습니다.");
              console.log(error);
              alert("로그인 후 이용해주세요");
              window.location.replace("/");
            });
          navigate("/");
        }
        return;
      })
      .catch((error) => {
        setErrorMsg("사용자 오류를 수정하는데 오류가 발생했습니다.");
      });
  };
  return (
    <Container>
      {isLoading && errorMsg ? null : (
        <EditFormBox action="POST" onSubmit={handlePost}>
          <label htmlFor="user-email">
            <FontContainer>
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <font>이메일</font>
            </FontContainer>
            <input
              id="user-email"
              name="email"
              type="email"
              readOnly
              value={email}
            />
          </label>
          <label htmlFor="input-username">
            <FontContainer>
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <font>변경할 닉네임</font>
            </FontContainer>
            <input
              id="input-username"
              name="username"
              type="text"
              onChange={handleUsernameChange}
              placeholder="변경할 닉네임"
              value={username}
              required
            />
          </label>
          <label htmlFor="input-password">
            <FontContainer>
              <span>
                <FontAwesomeIcon icon={faLock} />
              </span>
              <font>비밀번호</font>
            </FontContainer>
            <input
              id="input-password"
              name="password"
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              onChange={handlePasswordChange}
              required
            />
          </label>
          {errorMsg ? <ErrorMsgSpan>{errorMsg}</ErrorMsgSpan> : null}
          <input type="submit" value="변경하기" />
        </EditFormBox>
      )}
    </Container>
  );
}

export default Edit;
