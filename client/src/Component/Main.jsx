import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizScreens from "./QuizScreens";
import LoginPage from "./LoginPage";
import CreateQuiz from "./CreateQuiz";
import SolveQuiz from "./Page/SolveQuizPage/SolveQuiz";
import Faq from "./Page/FooterPage/Faq";
import About from "./Page/FooterPage/About";
import ContactUs from "./Page/FooterPage/ContactUs";
import Guideline from "./Page/FooterPage/Guideline";
import AfterSolved from "./Page/AfterSolvedPage/AfterSolved";
import JoinPage from "./JoinPage";
import MyPage from "./MyPage";
import Edit from "./Page/MyPage/Edit";
import EditQuiz from "./Page/EditQuiz/EditQuiz";
import Admin from "./Admin";
import NotFound from "./NotFound";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
 html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 16px;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
sup {
  font-size: 0.2vw;
  color: #F55050;
  margin-left: 0.3vw;
}
body {
	line-height: 1;
  height: 100%;
  font-family: 'Gowun Batang', serif;
  /* background-color: rgba(236, 236, 236, 0.5); */
  background-color: #fffbf5;
}
html {
  font-size: 10px;
}
a {
  text-decoration: none;
  color: black;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;
function Main() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<QuizScreens />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="admin" element={<Admin />} />
          <Route path="my-page/:id" element={<MyPage />} />
          <Route path="my-page/:id/edit" element={<Edit />} />
          <Route path="/:id/quiz/create_quiz" element={<CreateQuiz />} />
          <Route path="quiz/edit/:id" element={<EditQuiz />} />
          <Route path="quiz/:id" element={<SolveQuiz />} />
          {/* 여기서는 id는 quiz id*/}
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/guideline" element={<Guideline />} />
          <Route path="/about" element={<About />} />
          <Route path="/result/:id" element={<AfterSolved />} />
          <Route path="/not" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
