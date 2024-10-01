import React, { useState } from "react";
import { AddPost } from "../AddPost/index.js";
import "./modal.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice.js";

export const Modal = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null; // Если модальное окно не должно быть открыто, ничего не рендерим

  const handleClose = () => {
    dispatch(closeModal()); // Закрываем модальное окно

    console.log(1233);
  };
  return (
    <div className="modal">
      <div className="modal-content">
       {handleClose}
       
        <AddPost />
      </div>
    </div>
  );
};
