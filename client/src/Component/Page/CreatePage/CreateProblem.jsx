import { useEffect, useState } from "react";
import QuizImageInput from "./QuizImageInput";
import SingleType from "./SingleType";
import WordType from "./WordType";
import MultiType from "./MultiType";
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
const QuizFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1vw solid black;
  padding: 1.5vw;
  border-radius: 5px;
  margin-top: 1vw;
  background-color: #fffbf5;
  @media (max-width: 500px) {
    border: 0.2vw solid black;
    margin-top: 1vh;
  }
`;
const ProblemNumber = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
  h4 {
    font-size: 1.5vw;
    color: rgba(0, 0, 0, 0.7);
    @media (max-width: 500px) {
      font-size: 1.5vh;
    }
  }
  @media (max-width: 500px) {
    margin-bottom: 2vh;
  }
`;
const QuizDeleteButton = styled.button`
  background-color: white;
  border: 1px solid rgba(245, 80, 80, 0.8);
  color: black;
  padding: 6px 4px 6px 4px;
  border-radius: 3px;
  font-size: 0.9vw;
  transition: 0.1s ease-in-out;
  font {
    margin-left: 0.3vw;
    font-size: 1vw;
  }
  & span {
    color: rgba(245, 80, 80, 0.8);
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
    @media (max-width: 500px) {
      margin-bottom: 1vh;
    }
  }
  label:nth-child(1) span {
    color: #676a6c;
    font-size: 1vw;
    @media (max-width: 500px) {
      font-size: 1.1vh;
    }
  }
  label:nth-child(1) span font {
    margin-left: 0.3vw;
    @media (max-width: 500px) {
      margin-left: 0.3vh;
    }
  }
  textarea {
    border-radius: 5px;
    height: 8vh;
    padding: 1vw;
    color: #676a6c;
    font-size: 0.5vw;
    margin-bottom: 10px;
    @media (max-width: 500px) {
      height: 4vh;
      padding: 1vh;
      font-size: 0.3vw;
    }
  }
  textarea::placeholder {
    color: #676a6c;
    font-size: 0.8vw;
    @media (max-width: 500px) {
      font-size: 0.8vh;
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
    @media (max-width: 500px) {
      margin-bottom: 1vh;
    }
  }
  label span {
    font-size: 1vw;
    color: #676a6c;
    @media (max-width: 500px) {
      font-size: 1.1vh;
    }
  }
  label span font {
    margin-left: 0.3vw;
    @media (max-width: 500px) {
      margin-left: 0.3vh;
    }
  }
  select {
    -moz-appearance: none;
    /* -webkit-appearance: none; */
    /* appearance: none; */
    border: 1px solid #676a6c;
    border-radius: 4px;
    font-size: 1vw;
    margin-bottom: 2vw;
    color: rgba(0, 0, 0, 0.7);
    padding: 0.4vw 0.6vw;
    @media (max-width: 500px) {
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
    color: #676a6c;
    font-size: 0.5vh;
    margin-bottom: 10px;
    @media (max-width: 500px) {
      height: 4vh;
    }
  }
  textarea::placeholder {
    color: #676a6c;
    font-size: 1vw;
  }
  textarea:focus {
    outline: 0.05vw solid #676a6c;
  }
`;
const OptionLabel = styled.label`
  margin-bottom: 8px;
  span {
    display: flex;
    color: #676a6c;
    font-size: 1vw;
    justify-content: space-between;
    width: 100%;
    font:nth-child(1) {
      white-space: nowrap;
      font-size: 0.5vh;
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
  quizProblem,
}) {
  const [length, setLength] = useState(0);
  const [type, setType] = useState("");
  const handleLength = (event) => {
    const inputLength = event.target.value.length;
    setLength(inputLength);
  };
  const handleChangeCommnetary = (event) => {
    if (quizzes[quizNumber - 1] !== undefined) {
      quizzes[quizNumber - 1].commentary = event.target.value;
    } else {
      setCommentary(event.target.value);
    }
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
    if (quizzes[quizNumber - 1] !== undefined) {
      quizzes[quizNumber - 1].quizProblemDescribe = event.target.value;
    } else {
      setQuizDescribe(event.target.value);
    }
  };

  let seletedQuizForm;
  if (type === "single") {
    seletedQuizForm = (
      <SingleType
        quizNumber={quizNumber}
        setQuestion={setQuestion}
        quizzes={quizzes}
      />
    );
  } else if (type === "multi") {
    seletedQuizForm = (
      <MultiType
        quizNumber={quizNumber}
        setQuestion={setQuestion}
        quizzes={quizzes}
      />
    );
  } else if (type === "word") {
    seletedQuizForm = (
      <WordType
        quizNumber={quizNumber}
        setQuestion={setQuestion}
        quizzes={quizzes}
      />
    );
  }
  const handleQuizDelete = (event) => {
    event.preventDefault();
    if (window.confirm("정말 삭제하시겠습니까?")) {
      keyId.splice(quizNumber - 1, 1);
      setKeyId([...keyId]);
      const newQuizForm = quizForm.filter((quizNum) => quizNum !== quizNumber);
      let newQuizzes;
      if (!(quizzes[quizNumber - 1] === undefined)) {
        newQuizzes = quizzes.filter((quiz) => quiz.id !== quizNumber);
        setQuizNumber((pre) => pre - 1);
        changeQuiz(newQuizzes);
      } else {
        // 지우는 부분이 undefinded이다.
        setQuizNumber((pre) => pre - 1);
      }
      setQuizForm(newQuizForm);
    }
    return;
  };

  return (
    <QuizFormContainer
      id={String(quizNumber) + "-quiz"}
      ref={(el) => (quizProblem.current[quizNumber - 1] = el)}
    >
      <ProblemNumber>
        <h4>문제 {quizNumber}</h4>
        {quizForm.length > 1 ? (
          <QuizDeleteButton onClick={handleQuizDelete}>
            <span>
              <FontAwesomeIcon icon={faTrash} />
              <font>삭제</font>
            </span>
          </QuizDeleteButton>
        ) : null}
      </ProblemNumber>
      <QuizDescription>
        <label htmlFor={`problem_describe${+quizNumber}`}>
          <span>
            <FontAwesomeIcon icon={faPen} />
            <font>
              문제 서술하기<sup>*필수</sup>
            </font>
          </span>
        </label>
        <textarea
          id={`problem_describe${+quizNumber}`}
          placeholder="예) 아래 사진은 '어떤 캐릭터의' 일부 사진입니다. 어떤 캐릭터인가요?"
          onChange={handleDescribeChange}
        />
        <QuizImageInput
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          quizzes={quizzes}
          quizNumber={quizNumber}
        />
      </QuizDescription>
      <AnswerTypeBox>
        <label htmlFor={`answer_type${+quizNumber}`}>
          <span>
            <FontAwesomeIcon icon={faLightbulb} />
            <font>
              정답 유형을 선택해주세요<sup>*필수</sup>
            </font>
          </span>
        </label>
        <select
          value={type}
          onChange={handleSelect}
          name="answer_type"
          id={`answer_type${+quizNumber}`}
        >
          <option value="">
            정답 유형을 선택해주세요 <span>✔</span>
          </option>
          <option value="single">정답이 하나인 경우</option>
          <option value="multi">정답이 여러개인 경우</option>
          <option value="word">정답이 '단어'인 경우</option>
        </select>
      </AnswerTypeBox>
      {seletedQuizForm}
      <OptionContainer>
        <OptionLabel htmlFor={`solution${+quizNumber}`}>
          <span>
            <font>선택사항 : 정답을 틀리 시 보여 줄 해설을 입력합니다.</font>
            <font>{length}/300</font>
          </span>
        </OptionLabel>
        <textarea
          name=""
          onInput={handleLength}
          id={`solution${+quizNumber}`}
          maxLength="300"
          onChange={handleChangeCommnetary}
          cols="3"
          rows="10"
          placeholder="예) 문제에 나오는 꼬리는 이상해씨의 꼬리입니다"
        ></textarea>
      </OptionContainer>
    </QuizFormContainer>
  );
}
// Create Problem Part

const CreateProblemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 4vh;
  @media (max-width: 500px) {
    margin-top: 2vh;
  }
`;

const CreateProblemDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3vw;
  margin-bottom: 1.3vh;
  @media (max-width: 500px) {
    margin-bottom: 0.3vh;
  }
  h2 {
    display: flex;
    align-items: center;
    margin-bottom: 0.4vh;
  }
  span {
    color: rgb(255, 139, 19);
    font-size: 1.6vw;
    margin-right: 0.5vw;
    @media (max-width: 500px) {
      font-size: 1.4vh;
    }
  }
  small {
    @media (min-width: 1200px) {
      font-size: 0.5vw;
    }
    @media (max-width: 500px) {
      /* all: initial; */
      font-size: 0.5vw;
    }
    color: #676a6c;
  }
`;
const AddQuizContainer = styled.div`
  /* margin-left: 1vw;
  margin-right: 1vw; */
  margin-top: 10px;
  width: 100%;
  button {
    width: 100%;
    text-align: center;
    font-size: 2vw;
    background-color: white;
    border: 0.15vw solid rgb(117, 204, 79);
    padding: 1vw 0px;
    @media (max-width: 500px) {
      /* all: initial; */
      padding: 1vh 0px;
    }
    border-radius: 5px;
    font {
      margin-left: 1vh;
    }
    span {
      color: rgb(117, 204, 79);
    }
    transition: 0.1s ease-in-out;
  }

  button:hover {
    background-color: rgba(117, 204, 79, 0.6);
    border: 0.15vw solid rgba(117, 204, 79, 0.6);
    color: white;
    span {
      color: white;
    }
  }
`;
const MaxProblemAlert = styled.span`
  font-size: 1vw;
  color: #f55050;
`;
function CreateProblem({
  changeQuiz,
  quizzes,
  quizNumber,
  setQuizNumber,
  quizForm,
  setQuizForm,
  quizType,
  setQuizType,
  quizDescribe,
  setQuizDescribe,
  imgUrl,
  setImgUrl,
  questions,
  setQuestion,
  commentary,
  setCommentary,
  addQuiz,
  keyId,
  setKeyId,
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
      // if (!quizForm.includes(quizNumber)) {
      //   setQuizForm((pre) => [...pre, quizNumber]);
      // }
    }
  }, [quizNumber]);
  useEffect(() => {
    const id = uuidv4();
    setKeyId([id]);
  }, []);
  return (
    <CreateProblemContainer>
      <CreateProblemDescription>
        <h2>
          <span>
            <FontAwesomeIcon icon={faCaretRight} />
          </span>
          퀴즈 만들기
        </h2>
        <small>퀴즈에 대한 질문과 정답을 작성해주세요 (최대 10문제)</small>
      </CreateProblemDescription>
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
            quizProblem={quizProblem}
          />
        );
      })}
      <AddQuizContainer>
        {quizNumber < 10 ? (
          <button onClick={addQuiz}>
            <span>
              <FontAwesomeIcon icon={faPenToSquare} />
              <font>다음 질문 만들기</font>
            </span>
          </button>
        ) : (
          <MaxProblemAlert>최대 10문제 까지 만들 수 있습니다.</MaxProblemAlert>
        )}
      </AddQuizContainer>
    </CreateProblemContainer>
  );
}

export default CreateProblem;
