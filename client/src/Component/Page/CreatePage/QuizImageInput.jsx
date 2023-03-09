import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
const ProblemImageSection = styled.div`
  width: 100%;
  border: 1px solid rgba(103, 106, 108, 0.2);
  height: 60vh;
  border-radius: 1vw;
  margin-bottom: 1vh;
  text-align: center;
  position: relative;
  display: ${({ imageUpload }) => (imageUpload ? "block" : "none")};
  @media (max-width: 500px) {
    height: 30vh;
  }
`;
const ProblemImageLabel = styled.label`
  display: flex;
  input {
    display: none;
  }
  span font {
    margin-left: 0.3vw;
  }
  span {
    color: #7286d3;
    font-size: 1vw;
    border: 1.5px solid #7286d3;
    padding: 0.6vw 0.8vw;
    border-radius: 3px;
    transition: 0.1s ease-in-out;
    @media (max-width: 500px) {
      border: 0.15vh solid #7286d3;
      font-size: 1.3vh;
      font {
        font-size: 1vh;
      }
    }
  }
  span:hover {
    background-color: white;
  }
`;
const ProblemImageImage = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 0.3vw;
  right: 0.3vw;
  display: block;
  font-size: 0.8vw;
  background-color: white;
  border: 1px solid rgba(245, 80, 80, 0.8);
  color: rgba(245, 80, 80, 0.8);
  padding: 0.6vw 0.8vw;
  border-radius: 3px;
  transition: 0.1s ease-in-out;
  font {
    margin-left: 0.4vw;
  }

  @media screen and (max-width: 767px) {
    padding: 0.4vh 0.6vh;
    span {
      font-size: 1vh;
    }
    span font {
      font-size: 1vh;
    }
  }
  &:hover {
    background-color: rgba(245, 80, 80, 0.8);
    color: white;
  }
`;
function QuizImageInput({ setImgUrl, quizNumber, quizzes, existingThumnail }) {
  const fileNode = useRef();
  const [preview, setPreview] = useState(existingThumnail || "");
  const [currentFile, setCurrentFile] = useState(null);
  const [fileImgUrl, setFileImgUrl] = useState(null);
  const imageLabelName = "problem_image" + quizNumber;
  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    if (quizzes[quizNumber - 1] !== undefined) {
      quizzes[quizNumber - 1].imgUrl = selectedFile;
      setFileImgUrl(selectedFile);
    } else {
      setFileImgUrl(selectedFile);
      setImgUrl(selectedFile);
    }
    setPreview(URL.createObjectURL(selectedFile));
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const handleDelete = (event) => {
    event.preventDefault();
    setPreview("");
    setFileImgUrl(null);
    if (quizzes[quizNumber - 1] !== undefined) {
      quizzes[quizNumber - 1].imgUrl = null;
    } else {
      setImgUrl(null);
    }
    setCurrentFile(null);
    fileNode.current.value = "";
  };

  return (
    <>
      <ProblemImageSection imageUpload={preview ? true : false}>
        {fileImgUrl ? (
          preview ? (
            <ProblemImageImage src={preview} alt="preview입니다." />
          ) : null
        ) : preview ? (
          <ProblemImageImage
            src={`https://aquizbuket.s3.ap-northeast-2.amazonaws.com/${preview}`}
            alt="preview입니다."
          />
        ) : null}
        {preview && (
          <DeleteButton onClick={handleDelete}>
            <span>
              <FontAwesomeIcon icon={faTrash} />
              <font>삭제</font>
            </span>
          </DeleteButton>
        )}
      </ProblemImageSection>
      <ProblemImageLabel htmlFor={imageLabelName}>
        <span>
          <FontAwesomeIcon icon={faFileArrowUp} />
          <font>문제 사진 올리기</font>
        </span>
        <input
          id={imageLabelName}
          onChange={handleFile}
          type="file"
          accept="image/*"
          ref={fileNode}
        />
      </ProblemImageLabel>
    </>
  );
}

export default QuizImageInput;
