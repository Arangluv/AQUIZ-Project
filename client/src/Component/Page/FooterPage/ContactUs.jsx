import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8vh;
  width: 100%;
  @media screen and (max-width: 767px) {
    margin-top: 3vh;
  }
`;
const SubContainer = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  border-radius: 3px;
  background-color: white;
  padding: 2vw 0;
  color: #676a6c;
  @media screen and (max-width: 767px) {
    padding: 1vh 0;
    width: 70%;
  }
  h1 {
    font-size: 1.2vw;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1vw;
    @media screen and (max-width: 767px) {
      font-size: 1.5vh;
      margin-bottom: 1vh;
    }
  }
  form {
    width: 70%;
  }
  div {
    label {
      display: flex;
      flex-direction: column;
      width: 100%;
      font {
        font-size: 1vw;
        margin-bottom: 0.6vw;
        @media screen and (max-width: 767px) {
          font-size: 1vh;
          margin-bottom: 0.6vh;
        }
      }
      input,
      textarea {
        margin-bottom: 0.6vw;
        padding: 0.4vw;
        @media screen and (max-width: 767px) {
          margin-bottom: 0.6vh;
          font-size: 1vw;
          padding: 0.4vh;
        }
      }
      input:focus,
      textarea:focus {
        outline-color: gray;
      }

      textarea {
        min-height: 10vh;
        height: auto;
        overflow: visible;
      }

      input[type="submit"] {
        background-color: white;
        border: 1px solid #205295;
        color: #205295;
        border-radius: 3px;
        padding: 1vw;
        transition: 0.1s ease-in-out;
        @media screen and (max-width: 767px) {
          padding: 1vh;
        }
      }
      input[type="submit"]:hover {
        background-color: #205295;
        color: white;
      }
    }
  }
`;
function ContactUs() {
  // User Input State
  const [userEmail, setUserEmail] = useState(null);
  const [requestReason, setRequestReason] = useState(null);
  const [requestContent, setRequestContent] = useState(null);
  // Navigate
  const navigater = useNavigate();
  // URL
  const URL =
    process.env.NODE_ENV === "production"
      ? "https://api.aquiz.co.kr/"
      : "http://localhost:4001/";
  const handleChange = (event, handleFunction) => {
    handleFunction(event.target.value);
  };
  const handleEmailChange = (event) => {
    handleChange(event, setUserEmail);
  };
  const handleReasonChange = (event) => {
    handleChange(event, setRequestReason);
  };
  const handleContentChange = (event) => {
    handleChange(event, setRequestContent);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`${URL}admins/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, // json형태의 데이터를 서버로 보냅니다.
      body: JSON.stringify({
        userEmail,
        requestReason,
        requestContent,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "문의사항을 처리하는데 실패했습니다. 다시 시도해주세요."
        );
      })
      .then((result) => {
        alert(result.message);
        navigater("/");
      })
      .catch((error) => {
        console.log("문의사항 처리 에러");
        alert(error.message);
      });
  };
  return (
    <Container>
      <SubContainer>
        <h1>문의 사항</h1>
        <form action="post" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">
              <font>답변을 받으실 이메일 주소를 남겨주세요</font>
              <input
                id="email"
                type="email"
                placeholder="답변을 받으실 이메일 주소"
                onChange={handleEmailChange}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="reason">
              <font>사유</font>
              <input
                id="reson"
                type="text"
                placeholder="문의 사유를 적어주세요"
                onChange={handleReasonChange}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="content">
              <font>문의 사항</font>
              <textarea
                id="content"
                placeholder="문의사항을 적어주세요."
                onChange={handleContentChange}
                required
              ></textarea>
            </label>
          </div>
          <div>
            <label htmlFor="submit">
              <input id="submit" type="submit" value="제출하기" />
            </label>
          </div>
        </form>
      </SubContainer>
    </Container>
  );
}

export default ContactUs;
