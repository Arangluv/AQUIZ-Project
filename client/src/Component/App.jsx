import { useState } from "react";
import { Outlet } from "react-router-dom";
import { UserInformation } from "../Content/UserInformation";
import Header from "./Header";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import styled from "styled-components";
// 색깔은 두개 -> #ECECEC -> rgb(236, 236, 236)
// #ff8b13 -> rgb(255, 139, 19)
const Wrapper = styled.div`
  /* height: auto;
  min-height: 100%; */
  min-height: calc(100vh - 5vh);
  padding-bottom: 8vh;
  position: relative;
`;
const StyledHeader = styled(Header)`
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 6vh;
  @media screen and (max-width: 767px) {
    height: 5vh;
  }
`;
const MainAd = styled.div`
  width: 100%;
  background-color: #ececec;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 2vw;
    font-weight: 600;
  }
`;
function App() {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    if (cookies.token) {
      const getToken = cookies.token.token;
      if (cookies.token) {
        fetch("http://localhost:4001/api/login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
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
            setUser(result);
          })
          .catch((error) => {
            console.log("토큰이 만료되었거나, 유효하지않은 토큰입니다.");
            setUser(null);
          });
      }
    }
  }, [cookies]);

  return (
    <UserInformation.Provider value={{ user, setUser }}>
      <StyledHeader />
      <MainAd>
        <h1>광고 배너가 들어갑니다.</h1>
      </MainAd>
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </UserInformation.Provider>
  );
}

export default App;
