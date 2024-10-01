import React, { useState } from "react";
import { Button, Input } from "..";
import "./addPost.scss";

import regular from "../../assets/addPost/Vector.svg";
import video from "../../assets/addPost/mdi_video.svg";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/slices/userAddSlice";
import { closeModal } from "../../store/slices/modalSlice";
import { auth, storage } from "../../firebase"; // Import storage from Firebase
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import addPostBekend from "../../hooks/addPostBekend";

export const AddPost = () => {
  const isOpen = useSelector((state) => state.modal.isOpen); // Получаем состояние isOpen
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false); // To track upload state

  if (!isOpen) return null; // Если модальное окно не открыто, ничего не рендерим

  const handleClick = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Пожалуйста, добавьте фото перед добавлением поста.");
      return;
    }

    if (text.trim() === "") {
      setError("Пожалуйста, добавьте текст перед добавлением поста.");
      return;
    }

    setError("");
    setIsUploading(true); // Start uploading

    // Upload image to Firebase Storage
    try {
      const storageRef = ref(storage, `posts/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: can show upload progress here
        },
        (error) => {
          setError("Ошибка при загрузке изображения. Пожалуйста, попробуйте снова.");
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Once the file is uploaded, get the download URL and save it in the post
          const item = {
            email: auth.currentUser.email,
            like: count,
            img: downloadURL, // Firebase Storage URL
            text: text,
            id: Date.now(), // Using Date.now() for a unique ID
          };

          dispatch(addPost(item));
          addPostBekend(item, file);
          
          // Reset the form after successful upload
          setText("");
          setFile(null);
          setFileURL(null);
          setIsUploading(false);
          dispatch(closeModal());
        }
      );
    } catch (error) {
      setError("Ошибка при загрузке изображения.");
      setIsUploading(false);
    }
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
            maxLength="200" // Optional: limit to 200 characters
          />
        </form>

        {error && <div className="addPost-error">{error}</div>}

        <div className="addPost-information">
          <div className="addPost-information-lenght">{text.length}/200</div>
          <div className="addPost-information-img">
            <label htmlFor="file" className="fileLabel">
              <input type="file" onChange={handleChangeFile} id="file" />
              <img src={regular} alt="Upload" />
            </label>

            {file && <img className="image" src={fileURL} alt="Preview" />}
            <img src={video} alt="Video" />
          </div>
        </div>

        <form className="addPost-form">
          <Button
            variant="addPost-btn"
            fullWidth
            onClick={handleClick}
            disabled={isUploading} // Disable the button while uploading
          >
            {isUploading ? "Uploading..." : "Add"}
          </Button>
          <Button
            variant="closePost-btn"
            fullWidth
            onClick={handleClickClose}
            disabled={isUploading} // Disable the button while uploading
          >
            Close
          </Button>
        </form>
      </div>
    </div>
  );
};