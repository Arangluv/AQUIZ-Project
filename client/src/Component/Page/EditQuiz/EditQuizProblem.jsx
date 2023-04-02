import { useEffect, useState } from "react";
import QuizImageInput from "../CreatePage/QuizImageInput";
import EditWordType from "./EditWordType";
import EditMultiType from "./EditMultiType";
import EditSingleType from "./EditSingleType";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faTrash,
  faPen,
  faLightbulb,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../../assets/atom";
const QuizFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1vw solid ${(props) => props.theme.textColor};
  padding: 1.5vw;
  border-radius: 5px;
  margin-top: 1vw;
  background-color: ${(props) =>
    props.isDark ? props.theme.bgColor : "#fffbf5"};
  @media screen and (max-width: 767px) {
    border: 0.2vw solid black;
    margin-top: 1vh;
  }
`;

const ProblemNumber = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
  @media screen and (max-width: 767px) {
    margin-bottom: 1vh;
  }
  h4 {
    font-size: 1.5vw;
    color: ${(props) => props.theme.textColor};
    @media screen and (max-width: 767px) {
      font-size: 1.5vh;
    }
  }
`;
const QuizDeleteButton = styled.button`
  background-color: ${(props) =>
    props.isDark ? props.theme.bgColor : "white"};
  border: 1px solid rgba(245, 80, 80, 0.8);
  color: black;
  padding: 0.4vw 0.6vw;
  border-radius: 3px;
  font-size: 0.9vw;
  transition: 0.1s ease-in-out;
  display: flex;
  @media screen and (max-width: 767px) {
    padding: 0.4vh 0.6vh;
  }
  font {
    margin-left: 0.3vw;
    font-size: 1vw;
  }
  & span {
    color: rgba(245, 80, 80, 0.8);
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: rgba(245, 80, 80, 0.8);
    span {
      color: white;
    }
  }
  @media (max-width: 500px) {
    font-size: 1vh;
    font {
      margin-left: 0.3vh;
      font-size: 0.8vh;
    }
  }
`;

const QuizDescription = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  margin-bottom: 1vw;

  label {
    margin-bottom: 0.8vw;

    @media screen and (max-width: 767px) {
      margin-bottom: 1vh;
    }
  }
  label:nth-child(1) span {
    color: ${(props) => props.theme.textColor};
    font-size: 1vw;
    @media screen and (max-width: 767px) {
      font-size: 1.1vh;
    }
  }
  label:nth-child(1) span font {
    margin-left: 0.3vw;
    @media screen and (max-width: 767px) {
      margin-left: 0.3vh;
    }
  }
  textarea {
    border-radius: 5px;
    height: 8vh;
    border: 0.1vw solid ${(props) => props.theme.textColor};
    padding: 1vw;
    color: ${(props) => props.theme.textColor};
    font-size: 1vw;
    margin-bottom: 10px;
    background-color: ${(props) => props.theme.bgColor};
    @media screen and (max-width: 767px) {
      height: 4vh;
      padding: 1vh;
      font-size: 1vh;
    }
  }
  textarea::placeholder {
    color: ${(props) => props.theme.textColor};
    font-size: 0.8vw;
    @media screen and (max-width: 767px) {
      font-size: 1vh;
    }
  }
  textarea:focus {
    outline: 0.01vw solid #676a6c;
    @media (max-width: 500px) {
      outline: 0.005vw solid #676a6c;
    }
  }
`;

const AnswerTypeBox = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.6vw;
    @media screen and (max-width: 767px) {
      margin-bottom: 1vh;
    }
  }
  label span {
    font-size: 1vw;
    color: ${(props) => props.theme.textColor};
    @media screen and (max-width: 767px) {
      font-size: 1.1vh;
    }
  }
  label span font {
    margin-left: 0.3vw;
    @media screen and (max-width: 767px) {
      margin-left: 0.3vh;
    }
  }
  select {
    -moz-appearance: none;
    background-color: ${(props) => props.theme.bgColor};
    border: 0.1vw solid ${(props) => props.theme.textColor};
    border-radius: 4px;
    font-size: 1vw;
    margin-bottom: 2vw;
    color: ${(props) => props.theme.textColor};
    padding: 0.4vw 0.6vw;
    @media screen and (max-width: 767px) {
      font-size: 1.3vh;
    }
  }
`;
const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    border-radius: 5px;
    height: 15vh;
    padding: 10px;
    color: ${(props) => props.theme.textColor};
    border: 0.1vw solid ${(props) => props.theme.textColor};
    font-size: 1vh;
    margin-bottom: 10px;
    background-color: ${(props) => props.theme.bgColor};
    @media (max-width: 500px) {
      height: 4vh;
      font-size: 1vh;
    }
  }
  textarea::placeholder {
    color: ${(props) => props.theme.textColor};
    font-size: 1vw;
    @media screen and (max-width: 767px) {
      font-size: 1vh;
    }
  }
  textarea:focus {
    outline: 0.05vw solid #676a6c;
  }
`;
const OptionLabel = styled.label`
  margin-bottom: 8px;
  span {
    display: flex;
    color: ${(props) => props.theme.textColor};
    font-size: 1vw;
    justify-content: space-between;
    width: 100%;
    font:nth-child(1) {
      white-space: nowrap;
      font-size: 1vh;
      color: #7286d3;
    }
    @media (max-width: 500px) {
      font:nth-child(2) {
        display: none;
      }
    }
  }
`;
function MakeQuizForm({
  quizNumber,
  setQuizNumber,
  setQuizDescribe,
  setQuizType,
  imgUrl,
  setImgUrl,
  setQuestion,
  quizzes,
  changeQuiz,
  setCommentary,
  setQuizForm,
  quizForm,
  keyId,
  setKeyId,
  setLoadingQuizForm,
  setDeletedQuizUrl,
  quizProblem,
}) {
  const isDark = useRecoilValue(isDarkAtom);
  const quizToModify = quizzes[quizNumber - 1]; // 이 컴포넌트에 해당하는 퀴즈
  const [length, setLength] = useState(0);
  const [type, setType] = useState("");
  const [editDescribe, setEditDescribe] = useState("");
  const [existingThumnail, setExistingThumnail] = useState("");
  const [isSetting, setIsSetting] = useState(false);
  const [initComentary, setInitComentary] = useState("");
  useEffect(() => {
    // 초기 Length, Type Setting
    setIsSetting(false);
    if (quizToModify) {
      if (quizToModify.commentary !== null) {
        setLength(quizToModify.commentary.length);
      }
      setType(quizToModify.quizType);
      setEditDescribe(quizToModify.quizProblemDescribe);
      if (quizToModify.commentary === null) {
        setInitComentary("");
      } else {
        setInitComentary(quizToModify.commentary);
      }
      if (quizToModify.imgUrl !== undefined) {
        setExistingThumnail(quizToModify.imgUrl);
      }
      setIsSetting(true);
    }
    setIsSetting(true);
  }, []);
  const handleLength = (event) => {
    const inputLength = event.target.value.length;
    setLength(inputLength);
  };
  const handleChangeCommnetary = (event) => {
    if (quizzes[quizNumber - 1] !== undefined) {
      quizzes[quizNumber - 1].commentary = event.target.value;
    }
    setInitComentary(event.target.value);
    setCommentary(event.target.value);
  };
  const handleSelect = (event) => {
    setType(event.target.value);
    if (quizzes[quizNumber - 1] !== undefined) {
      quizzes[quizNumber - 1].quizType = event.target.value;
      quizzes[quizNumber - 1].questions = [];
    } else {
      setQuizType(event.target.value);
    }
  };
  const handleDescribeChange = (event) => {
    setEditDescribe(event.target.value);
    if (quizzes[quizNumber - 1] !== undefined) {
      quizzes[quizNumber - 1].quizProblemDescribe = event.target.value;
    } else {
      setQuizDescribe(event.target.value);
    }
  };

  let seletedQuizForm;
  if (type === "single") {
    seletedQuizForm = (
      <EditSingleType
        quizNumber={quizNumber}
        setQuestion={setQuestion}
        quizzes={quizzes}
      />
    );
  } else if (type === "multi") {
    seletedQuizForm = (
      <EditMultiType
        quizNumber={quizNumber}
        setQuestion={setQuestion}
        quizzes={quizzes}
      />
    );
  } else if (type === "word") {
    seletedQuizForm = (
      <EditWordType
        quizNumber={quizNumber}
        setQuestion={setQuestion}
        quizzes={quizzes}
      />
    );
  }
  const handleQuizDelete = (event) => {
    event.preventDefault();
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // 삭제시 QuizUrl 검사
      if (quizzes[quizNumber - 1] !== undefined) {
        if (quizzes[quizNumber - 1].imgUrl) {
          if (typeof quizzes[quizNumber - 1].imgUrl === "string") {
            const deletedQuizUrl = quizzes[quizNumber - 1].imgUrl;
            setDeletedQuizUrl((pre) => [...pre, deletedQuizUrl]);
          }
        }
      }
      const newQuizForm = quizForm.filter((quizNum) => quizNum !== quizNumber);
      const newKeyId = [...keyId];
      newKeyId.splice(quizNumber - 1, 1);
      setKeyId(newKeyId);
      let newQuizzes;
      if (!(quizzes[quizNumber] === undefined)) {
        newQuizzes = quizzes.filter((quiz) => quiz.id !== quizNumber);
        setQuizNumber((pre) => pre - 1);
        changeQuiz(newQuizzes);
      } else {
        // 지우는 부분이 undefinded이다.
        newQuizzes = quizzes.filter((quiz) => quiz.id !== quizNumber);
        changeQuiz(newQuizzes);
        setQuizNumber((pre) => pre - 1);
      }
      setQuizForm(newQuizForm);
    }
    return;
  };

  return isSetting ? (
    <QuizFormContainer
      id={String(quizNumber) + "-quiz"}
      ref={(el) => (quizProblem.current[quizNumber - 1] = el)}
      isDark={isDark}
    >
      <ProblemNumber>
        <h4>문제 {quizNumber}</h4>
        {quizForm.length > 1 ? (
          <QuizDeleteButton onClick={handleQuizDelete} isDark={isDark}>
            <span>
              <FontAwesomeIcon icon={faTrash} />
              <font>삭제</font>
            </span>
          </QuizDeleteButton>
        ) : null}
      </ProblemNumber>
      <QuizDescription>
        <label htmlFor="problem_describe">
          <span>
            <FontAwesomeIcon icon={faPen} />
            <font>문제 서술하기</font>
          </span>
        </label>
        <textarea
          value={editDescribe}
          id="problem_describe"
          placeholder="예) 아래 사진은 '어떤 캐릭터의' 일부 사진입니다. 어떤 캐릭터인가요?"
          onChange={handleDescribeChange}
        />
        <QuizImageInput
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          existingThumnail={existingThumnail}
          quizzes={quizzes}
          quizNumber={quizNumber}
        />
      </QuizDescription>

      <AnswerTypeBox>
        <label htmlFor="answer_type">
          <span>
            <FontAwesomeIcon icon={faLightbulb} />
            <font>정답 유형을 선택해주세요</font>
          </span>
        </label>
        <select
          value={type}
          onChange={handleSelect}
          name="answer_type"
          id="answer_type"
        >
          <option value="">정답 유형을 선택해주세요</option>
          <option value="single">정답이 하나인 경우</option>
          <option value="multi">정답이 여러개인 경우</option>
          <option value="word">정답이 '단어'인 경우</option>
        </select>
      </AnswerTypeBox>
      {seletedQuizForm}
      <OptionContainer>
        <OptionLabel htmlFor="solution">
          <span>
            <font>선택사항 : 정답을 틀리 시 보여 줄 해설을 입력합니다.</font>
            <font>{length}/300</font>
          </span>
        </OptionLabel>
        <textarea
          onInput={handleLength}
          id="solution"
          maxLength="300"
          onChange={handleChangeCommnetary}
          cols="3"
          rows="10"
          value={initComentary}
          placeholder="예) 문제에 나오는 꼬리는 이상해씨의 꼬리입니다"
        ></textarea>
      </OptionContainer>
    </QuizFormContainer>
  ) : null;
}
// EditQuizProblem Part

const EditProblemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 4vh;
  @media screen and (max-width: 767px) {
    margin-top: 2vh;
  }
`;

const EditProblemDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3vw;
  margin-bottom: 1.3vh;
  @media screen and (max-width: 767px) {
    margin-bottom: 0.3vh;
  }
  h2 {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 0.4vh;
    @media screen and (max-width: 767px) {
      font-size: 1.5vh;
    }
  }
  span {
    color: ${(props) => props.theme.accentColor};
    font-size: 1.6vw;
    margin-right: 0.5vw;
    @media screen and (max-width: 767px) {
      font-size: 2vh;
    }
  }
  small {
    @media screen and (max-width: 767px) {
      font-size: 1vh;
      color: ${(props) => props.theme.textColor};
    }
    color: #676a6c;
  }
`;
const AddQuizContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  button {
    width: 100%;
    text-align: center;
    font-size: 1.7vw;
    background-color: white;
    color: #44bd32;
    border: 0.15vw solid #44bd32;
    padding: 1vw 0px;
    @media screen and (max-width: 767px) {
      /* all: initial; */
      padding: 1vh 0px;
    }
    border-radius: 5px;
    font {
      margin-left: 1vh;
    }
    span {
      color: #44bd32;
    }
    transition: 0.1s ease-in-out;
  }
  button:hover {
    background-color: #44bd32;
    border: 0.15vw solid #44bd32;
    color: white;
    span {
      color: white;
    }
  }
`;
const MaxProblemAlert = styled.span`
  font-size: 1vw;
  color: #f55050;
  @media screen and (max-width: 767px) {
    font-size: 1vh;
  }
`;
function EditQuizProblem({
  changeQuiz,
  quizzes,
  quizNumber,
  setQuizNumber,
  quizForm,
  setQuizForm,
  setQuizType,
  setQuizDescribe,
  imgUrl,
  setImgUrl,
  questions,
  setQuestion,
  setCommentary,
  addQuiz,
  keyId,
  setKeyId,
  setDeletedQuizUrl,
  quizProblem,
}) {
  useEffect(() => {
    if (quizNumber === 1) {
      setQuizForm([1]);
    } else {
      let newQuizForm = [];
      let count = 1;
      for (let i = 1; i <= quizNumber; i++) {
        newQuizForm.push(count);
        count++;
      }
      setQuizForm(newQuizForm);
    }
  }, [quizNumber]);
  useEffect(() => {
    let newQuizForm = [];
    let count = 1;
    for (let i = 1; i <= quizNumber; i++) {
      newQuizForm.push(count);
      count++;
    }
    setQuizForm(newQuizForm);
  }, []);

  useEffect(() => {
    setQuizNumber(quizzes.length);
    const newQuizId = [];
    for (let i = 0; i < quizzes.length; i++) {
      const id = uuidv4();
      newQuizId.push(id);
    }
    setKeyId(newQuizId);
  }, []);
  return (
    <EditProblemContainer>
      <EditProblemDescription>
        <h2>
          <span>
            <FontAwesomeIcon icon={faCaretRight} />
          </span>
          퀴즈 만들기
        </h2>
        <small>퀴즈에 대한 질문과 정답을 작성해주세요 (최대 10문제)</small>
      </EditProblemDescription>
      {quizForm.map((item, idx) => {
        return (
          <MakeQuizForm
            quizForm={quizForm}
            setQuizNumber={setQuizNumber}
            setQuizForm={setQuizForm}
            key={keyId[idx]}
            questions={questions}
            quizNumber={item}
            setQuizDescribe={setQuizDescribe}
            imgUrl={imgUrl}
            setQuizType={setQuizType}
            setImgUrl={setImgUrl}
            setQuestion={setQuestion}
            quizzes={quizzes}
            changeQuiz={changeQuiz}
            setCommentary={setCommentary}
            keyId={keyId}
            setKeyId={setKeyId}
            setDeletedQuizUrl={setDeletedQuizUrl}
            quizProblem={quizProblem}
          />
        );
      })}
      <AddQuizContainer>
        {quizNumber < 20 ? (
          <button onClick={addQuiz}>다음 질문 만들기</button>
        ) : (
          <MaxProblemAlert>최대 20문제 까지 만들 수 있습니다.</MaxProblemAlert>
        )}
      </AddQuizContainer>
    </EditProblemContainer>
  );
}

export default EditQuizProblem;
