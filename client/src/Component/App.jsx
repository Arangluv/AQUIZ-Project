import { useState } from "react";
import { Outlet } from "react-router-dom";
import { UserInformation } from "../Content/UserInformation";
import Header from "./Header";
import Footer from "./Footer";
import { CookiesProvider } from "react-cookie";
import { useEffect } from "react";
import styled from "styled-components";
import bannerContainer from "../assets/bannerData";
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
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vw;
  iframe {
    height: 15vh;
    width: 100%;
  }
`;
function App() {
  const [user, setUser] = useState(null);
  const URL =
    process.env.NODE_ENV === "production"
      ? "https://api.aquiz.co.kr/"
      : "http://localhost:4001/";
  console.log("수정됐습니다.");
  console.log("23차 수정");
  // aws s3 sync ./build s3://aquizfront --profile=AQUIZ-Front

  useEffect(() => {
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
        setUser(result);
      })
      .catch((error) => {
        console.log(error);
        console.log("토큰이 만료되었거나, 유효하지않은 토큰입니다.");
        setUser(null);
      });
  }, []);
  return (
    <UserInformation.Provider value={{ user, setUser }}>
      <CookiesProvider>
        <StyledHeader />
        <MainAd>{bannerContainer[Math.floor(Math.random() * 4)]}</MainAd>
        <Wrapper>
          <Outlet />
        </Wrapper>
        <Footer />
      </CookiesProvider>
    </UserInformation.Provider>
  );
}

export default App;
