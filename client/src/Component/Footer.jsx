import { NavLink } from "react-router-dom";
import styled from "styled-components";
const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  transform: translateY(-100%);
  background-color: white;
  padding-top: 1vw;

  height: 5vh;
  width: 100%;
  small {
    text-align: center;
    font-size: 0.8vh;
    color: #676a6c;
    opacity: 0.9;
  }
  @media (max-width: 500px) {
    padding-top: 1vh;
  }
`;
const StyledNav = styled.nav`
  margin-bottom: 0.8vw;
  @media (max-width: 500px) {
    margin-bottom: 0.8vh;
  }
  ul {
    display: flex;
    justify-content: center;
  }
  ul li {
    font-size: 0.8vw;
    font-weight: 600;
    margin-left: 3vw;
    margin-right: 3vw;
    a {
      color: #676a6c;
      opacity: 0.8;
    }
    a:hover {
      color: #ff8b13;
    }
  }
`;
function Footer() {
  return (
    <StyledFooter>
      <StyledNav>
        <ul>
          <li>
            <NavLink to="/faq">자주하는 질문</NavLink>
          </li>
          <li>
            <NavLink to="/guideline">가이드라인</NavLink>
          </li>
          <li>
            <NavLink to="/contact">문의하기</NavLink>
          </li>
          <li>
            <NavLink to="/about">AQUIZ에 대해</NavLink>
          </li>
        </ul>
      </StyledNav>
      <small>Dev Arang Copyright © 2022 All rights reserved.</small>
    </StyledFooter>
  );
}

export default Footer;
