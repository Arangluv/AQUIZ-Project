import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faFileArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../../assets/atom";
const CreateThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 4vh;
  @media (max-width: 500px) {
    margin-top: 2vh;
  }
`;

const ThumbnailDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3vw;
  margin-bottom: 1.3vh;
  h2 {
    display: flex;
    align-items: center;
    margin-bottom: 0.4vh;
    color: ${(props) => props.theme.textColor};
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
    color: ${(props) => props.theme.textColor};
    font-size: 0.7vw;
    @media screen and (max-width: 767px) {
      font-size: 1vh;
    }
  }
`;
const ThumbnailSection = styled.div`
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.isDark ? props.theme.textColor : "rgba(103, 106, 108, 0.2)"};
  height: 60vh;
  border-radius: 1vw;
  margin-bottom: 1vh;
  text-align: center;
  position: relative;
  @media screen and (max-width: 767px) {
    /* all: initial; */
    height: 25vh;
    border-radius: 3vw;
  }
`;

const ThumbnailLabel = styled.label`
  display: flex;
  input {
    display: none;
  }
  span font {
    margin-left: 0.4vw;
    @media screen and (max-width: 767px) {
      margin-left: 0.6vh;
    }
  }
  span {
    color: #7286d3;
    font-size: 1vw;
    border: 0.1vw solid #7286d3;
    padding: 0.8vw 0.6vw;
    border-radius: 3px;
    transition: 0.1s ease-in-out;
    @media screen and (max-width: 767px) {
      font-size: 1.1vh;
      border: 0.3vw solid #7286d3;
      padding: 0.8vh 0.6vh;
    }
  }
  span:hover {
    background-color: white;
  }
`;
const ThumbnailImage = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 0.8vw;
  right: 0.8vw;
  display: block;
  font-size: 0.9vw;
  background-color: white;
  border: 1px solid rgba(245, 80, 80, 0.8);
  color: rgba(245, 80, 80, 0.8);
  padding: 0.6vw 0.8vw;
  border-radius: 3px;
  transition: 0.1s ease-in-out;
  font {
    margin-left: 0.3vw;
  }

  &:hover {
    background-color: rgba(245, 80, 80, 0.8);
    color: white;
  }
  @media (max-width: 500px) {
    font-size: 1.1vh;
    font {
      margin-left: 0.3vh;
    }
  }
`;

function CreateThumail({
  thumnailFile,
  changeThumnail,
  quizThumbnail,
  initThumbnailUrl,
  setInitThumbnailUrl,
}) {
  const [preview, setPreview] = useState(initThumbnailUrl || "");
  const isDark = useRecoilValue(isDarkAtom);
  const fileNode = useRef();
  const handleFile = (event) => {
    changeThumnail(event.target.files[0]);
    setInitThumbnailUrl("");
  };
  useEffect(() => {
    if (!thumnailFile && !initThumbnailUrl) {
      return;
    }
    if (thumnailFile) {
      const nextPreview = URL.createObjectURL(thumnailFile);
      setPreview(nextPreview);

      return () => {
        setPreview();
        URL.revokeObjectURL(nextPreview);
      };
    } else {
      setPreview(initThumbnailUrl);
    }
  }, [thumnailFile]);

  const handleDelete = (event) => {
    event.preventDefault();
    const imgNode = fileNode.current;
    // if (imgNode) return;
    imgNode.value = "";
    if (!imgNode.value) {
      setPreview();
    }
    changeThumnail(null);
    setInitThumbnailUrl("");
    return;
  };
  return (
    <CreateThumbnailContainer id="quizThumbnail" ref={quizThumbnail}>
      <ThumbnailDescription>
        <h2>
          <span>
            <FontAwesomeIcon icon={faCaretRight} />
          </span>
          썸네일<sup>*필수</sup>
        </h2>
        <small>
          퀴즈 썸네일을 추가해주세요. SNS 공유 및 퀴즈사이트 메인 사진으로
          사용됩니다.
        </small>
      </ThumbnailDescription>
      <ThumbnailSection isDark={isDark}>
        {thumnailFile ? (
          preview ? (
            <ThumbnailImage src={preview} alt="preview입니다." />
          ) : null
        ) : preview ? (
          <ThumbnailImage
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
      </ThumbnailSection>
      <ThumbnailLabel htmlFor="quiz_thumnail">
        <span>
          <FontAwesomeIcon icon={faFileArrowUp} />
          <font>썸네일 이미지 올리기</font>
        </span>
        <input
          id="quiz_thumnail"
          name="thumnail"
          onChange={handleFile}
          type="file"
          accept="image/*"
          ref={fileNode}
        />
      </ThumbnailLabel>
    </CreateThumbnailContainer>
  );
}

export default CreateThumail;
