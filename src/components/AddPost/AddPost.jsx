import React from "react";
import { Button, Input } from "..";
import "./addPost.scss";

import regular from "../../assets/addPost/Vector.svg";
import video from "../../assets/addPost/mdi_video.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addPost } from "../../store/slices/userAddSlice";
import { closeModal } from "../../store/slices/modalSlice";
import { auth } from "../../firebase";
import { count } from "firebase/firestore";
import addPostBekend from "../../hooks/addPostBekend";

export const AddPost = () => {
  // const post = useSelector((state) => state.post.array);

  const isOpen = useSelector((state) => state.modal.isOpen); // Получаем состояние isOpen
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null; // Если модальное окно не открыто, ничего не рендерим

  const handleClick = (e) => {
    e.preventDefault();
    if (!file) {
      setError("Пожалуйста, добавьте фото перед добавлением поста.");
      return;
    }

    if (text.trim() === "") {
      setError("Пожалуйста, добавьте текст перед добавлением поста.");
      return;
    }

    // Если ошибок нет, добавляем пост и очищаем состояние ошибки
    setError("");

    const item = {
      email: auth.currentUser.email,
      like: count,
      img: fileURL,
      text: text,
      id: Math.random(),
    };

    dispatch(addPost(item));
    addPostBekend(item);
    setText("");
    setFile(null);
    setFileURL(null);
    console.log({ text, fileURL });
    dispatch(closeModal());

    console.log(123);
  };

  const handleClickClose = () => {
    dispatch(closeModal());
  };

 
  const handleChangeFile = (e) => {
    const target = e.target;
    const selectedFile = target.files[0];
    if (selectedFile) {
      const newFileURL = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setFileURL(newFileURL);
      setError("");
    }
  };

  return (
    <div className="container">
      <div className="addPost">
        <h1 className="addPost-title">Add Post</h1>
        <form className="addPost-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="addPost-form-input"
            placeholder="user01, What`s new? "
          />
        </form>

        {error && <div className="addPost-error">{error}</div>}

        <div className="addPost-information">
          <div className="addPost-information-lenght">0/200</div>
          <div className="addPost-information-img">
            <label htmlFor="file" className="fileLabel">
              <input type="file" onChange={handleChangeFile} id="file" />
              <img src={regular} alt="" />
            </label>

            {file && (
              <img className="image" src={URL.createObjectURL(file)} alt="" />
            )}
            <img src={video} alt="" />
          </div>
        </div>

        <form className="addPost-form">
          <Button variant="addPost-btn" fullWidth onClick={handleClick}>
            Add
          </Button>
          <Button variant="closePost-btn" fullWidth onClick={handleClickClose}>
            Cloze
          </Button>
        </form>
      </div>
    </div>
  );
};
