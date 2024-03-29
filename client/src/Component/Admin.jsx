import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import ReactHelmet from "./ReactHelmet";
import { useState } from "react";
import URL from "../assets/url";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
  color: #676a6c;
  h3 {
    margin-bottom: 1vh;
    font-size: 1.2vw;
    font-weight: 600;
    a {
      position: absolute;
      right: 1vw;
    }
  }
`;
const RequestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RequestionSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1vw;
  font-size: 1vw;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: white;
  border: 1px solid #676a6c;
  border-radius: 3px;
  padding: 1vw;
  span,
  p {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-weight: 600;
    font {
      margin-top: 0.5vw;
      font-weight: 500;
    }
  }
  span {
    margin-bottom: 0.5vw;
  }
  p {
    text-align: center;
  }
`;
function Admin() {
  const [loading, setLoading] = useState(true);
  const navigater = useNavigate();
  const [reqList, setReqList] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`${URL}api/tokenInspect`, {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        alert("잘못된 접근입니다.");
        navigater("/");
      }
      return;
    });
    fetch(`${URL}api/login`, {
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
          throw new Error("Token is no longer valid");
        }
      })
      .then((result) => {
        const { username, email } = result;
        if (
          email === process.env.REACT_APP_ADMIN_EMAIL &&
          username === process.env.REACT_APP_ADMIN_NAME
        ) {
          setLoading(false);
        } else {
          navigater("/");
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch(`${URL}api/user-contacts`, {
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
          throw new Error("문의사항을 불러오는데 실패했습니다.");
        }
      })
      .then((result) => {
        const { userReqList } = result;
        setReqList([...userReqList]);
      })
      .catch((error) => {
        console.log("문의사항을 불러오는데 오류가 발생했습니다.");
        console.log(error);
      });
  }, []);

  return loading ? null : (
    <Container>
      <ReactHelmet
        description="AQUIZ 관리자 페이지 입니다. 사용자들의 문의사항을 확인 할 수 있습니다."
        title="AQUIZ, 퀴즈메이커 - 관리자 페이지"
        pageTitle="AQUIZ, 퀴즈메이커 - 관리자 페이지"
      />
      <h3>
        문의 내용
        <Link to="quiz-list">퀴즈 리스트 보기</Link>
      </h3>
      <RequestionContainer>
        {reqList.map((req) => {
          return (
            <RequestionSubContainer>
              <span>
                연락받을 이메일 <font>{req.email}</font>
              </span>
              <span>
                문의 사유<font>{req.reason}</font>
              </span>
              <p>
                문의 내용
                <font>{req.content}</font>
              </p>
            </RequestionSubContainer>
          );
        })}
      </RequestionContainer>
    </Container>
  );
}

export default Admin;
