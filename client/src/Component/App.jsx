import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserInformation } from "../Content/UserInformation";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import styled from "styled-components";
// import bannerContainer from "../assets/bannerData";
import URL from "../assets/url";
import ReactGA from "react-ga";
import GoogleAdvertise from "./GoogleAdvertise";

const Wrapper = styled.div`
  min-height: calc(100vh - 5vh);
  padding-bottom: 8vh;
  position: relative;
`;
const StyledHeader = styled(Header)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 6vh;
  background-color: ${(props) => props.theme.bgColor};
  transition: 0.2s ease-in-out;
  @media screen and (max-width: 767px) {
    height: 5vh;
  }
`;
const MainAd = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ins {
    height: 20vh;
    width: 100%;
  }
`;
function App() {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();
  // aws s3 sync ./build s3://aquizfront --profile=AQUIZ-Front
  // Google Analitics Page view Setting
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
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
  }, [URL]);
  return (
    <UserInformation.Provider value={{ user, setUser }}>
      <StyledHeader />
      <MainAd>
        <GoogleAdvertise
          client="ca-pub-3501932649640285"
          slot="7046903231"
          format="auto"
          responsive="true"
        />
      </MainAd>
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </UserInformation.Provider>
  );
}

export default App;
