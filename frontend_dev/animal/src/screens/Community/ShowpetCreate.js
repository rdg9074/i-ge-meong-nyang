import React, { useRef, useState, useEffect } from "react";
import "./ShowpetCreate.css";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { postShowpet, putShowpet } from "../../api/community";
import axios from "axios";
import Lottie from "lottie-react";
import proud from "./../../lotties/proud.json";
import styled from "styled-components";

const StyledBtn = styled.button`
  text-align: center;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  color: black;
  background: #f5c6aa;
  &:focus {
    box-shadow: 0px 0px 4px 3px #ffae6d;
  }
`;

const StyledInput = styled.input`
  border-radius: 4px;
  font-size: 22px;
  margin-left: 10px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  width: 80%;
  height: 40px;
  border: none;
  background-color: white;
  display: flex;
  outline: none;
`;

const Styledtextarea = styled.textarea`
  border-radius: 4px;
  font-size: 22px;
  margin-left: 10px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  width: 80%;
  height: 250px;
  border: none;
  background-color: white;
  display: flex;
  outline: none;
`;

const Innerbox = styled.div`
  display: flex;
  font-weight: bold;
  width: 100%;
  height: 60px;
  background: #f8e2cf;
  border-radius: 5px;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
`;

const Textareabox = styled.div`
  display: flex;
  font-weight: bold;
  width: 100%;
  height: 300px;
  background: #f8e2cf;
  border-radius: 5px;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ShowpetCreate = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [files, setFiles] = useState([]);
  const [filenames, setFilenames] = useState([]);
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const contentRef = useRef(null);
  const navigator = useNavigate();
  const location = useLocation();

  const imgServerUrl = process.env.REACT_APP_IMAGE_SERVER_URL;

  let serverName = [];

  useEffect(() => {
    if (location.state) {
      setIsEdit(true);
      setting();
    }
  }, []);

  const setting = () => {
    const article = location.state;
    titleRef.current.value = article.title;
    contentRef.current.value = article.content;
    nameRef.current.value = article.name;
  };

  const submitShowpet = (e) => {
    e.preventDefault();
    if (titleRef.current.value.trim() === "") {
      alert("????????? ??????????????????.");
      titleRef.current.focus();
    } else if (nameRef.current.value.trim() === "") {
      alert("????????? ??????????????????.");
      nameRef.current.focus();
    } else if (contentRef.current.value.trim() === "") {
      alert("????????? ??????????????????.");
      contentRef.current.focus();
    } else if (files.length === 0) {
      alert("????????? 1??? ?????? ??????????????????");
    } else {
      sendImage();
    }
  };
  //????????? ????????? ????????? ?????? (?????????)
  const sendImage = async () => {
    try {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("photos", files[i], filenames[i]);
      }
      const { data } = await axios({
        url: `${imgServerUrl}/upload-multi`,
        method: "post",
        headers: {
          processData: false,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      if (data.status) {
        serverName = [];
        data.data.map((img, idx) => {
          return serverName.push(`${imgServerUrl}/${img.name}`);
        });
        sendShowpet();
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // ???????????? ???????????? ??? ??????
  const sendShowpet = async () => {
    try {
      if (isEdit) {
        //????????? ??????
        const { data } = await putShowpet({
          content: contentRef.current.value,
          imgs: serverName, //????????? ?????? ??????
          name: nameRef.current.value,
          title: titleRef.current.value,
          id: location.state.id,
        });
        let id = data.data.id;
        alert("?????? ???????????????!");
        navigator(`/show-pet/detail/${id}`);
      } else {
        const { data } = await postShowpet({
          content: contentRef.current.value,
          imgs: serverName, //????????? ?????? ??????
          name: nameRef.current.value,
          title: titleRef.current.value,
        });
        let id = data.data.id;
        alert("?????? ???????????????!");
        navigator(`/show-pet/detail/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeFiles = (e) => {
    e.preventDefault();
    setFiles(e.target.files);
    let today = new Date();
    const fileName = `img_${today.getFullYear()}${
      today.getMonth() + 1
    }${today.getDate()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`;
    let length = e.target.files.length;
    let filenames = [];
    for (let i = 0; i < length; i++) {
      filenames.push(`${fileName}_${i}.png`);
    }
    setFilenames(filenames);
  };

  return (
    <div id="showpet-create">
      <div id="showpet-create-lottie">
        <Lottie animationData={proud} style={{ width: "150px" }} />
        <h1 style={{ fontSize: "50px" }}>????????? ????????????</h1>
      </div>
      <form onSubmit={(e) => submitShowpet(e)}>
        <Innerbox>
          ??????:
          <StyledInput
            ref={titleRef}
            className="show-title"
            type="text"
            placeholder="????????? ???????????????"
          />
        </Innerbox>
        <Innerbox>
          ??????:
          <StyledInput
            ref={nameRef}
            className="show-name"
            type="text"
            placeholder="????????? ???????????????"
          />
        </Innerbox>
        <Textareabox>
          ??????:
          <Styledtextarea
            ref={contentRef}
            className="show-content"
            type="text"
            placeholder="????????? ???????????????"
          />
        </Textareabox>
        <Innerbox>
          ???????????????:
          <input
            style={{ marginLeft: "20px" }}
            type="file"
            accept="image/*"
            id="upload-file"
            multiple={true}
            onChange={(e) => {
              changeFiles(e);
            }}
          />
        </Innerbox>
        <BtnDiv>
          <StyledBtn>????????????</StyledBtn>
        </BtnDiv>
      </form>
    </div>
  );
};

export default ShowpetCreate;
