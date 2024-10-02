import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, removeMessage } from "../../store/slices/messageSlice";
import writeUserData from "./Messages";
import { getFirestore } from "firebase/firestore/lite";
import { getDatabase, onValue, ref } from "firebase/database";
import styles from "./MessageForm.module.css";
import { auth } from "../../firebase";
import { renderToString } from "react-dom/server";
import { Button, Input } from "../Forms";

export const MessageForm = (userName) => {
  const [count, setCount] = useState(0);
  const [MessagesDataBase, setMessagesDataBase] = useState([]);
  const userNickname = useSelector((state) => state.user);
  let message = useSelector((state) => state.messages);
  console.log(userNickname);
  console.log(message);

  const [mess, setMess] = useState("");
  const dispatch = useDispatch();
  const add = () => dispatch(addMessage(mess));
  const remove = () => dispatch(removeMessage());
  const myName = JSON.parse(localStorage.getItem("userNick"));
  const db = getDatabase();
  const databaseMessage = ref(
    db,
    `messagesData/messages/${myName.nickname}${userName.user}`
  );
  remove();

  useEffect(() => {
    console.log(message);
    writeUserData(message, userName);
    setMess('')
  }, [count]);

  useEffect(() => {
    onValue(databaseMessage, (snapshot) => {
      setMessagesDataBase(snapshot.val() || []);
    });
  }, [userName]);

  const inputMessage = (e) => {
    setMess(e.target.value);
  };

  return (
    <div>
      <div className={styles.parentContain}>
        <div className={styles.messageContainer}>
          <p>{userName.user}</p>
          <div className={styles.liContain}>

          {MessagesDataBase.map((item, index) => {
            return (
              <div className={item.user !== userName.user ? styles.oneParent : styles.twoParent} key={index}>

              <li
                className={
                  item.user !== userName.user ? styles.one : styles.two
                }
                key={index}
              >
                <h4>{item.user}:</h4> <h5>{item.message}</h5> <p>{item.date}</p>
              </li>
              </div>
            );
          })}
          </div>
          <form className={styles.formContain}>
            <Input
              value={mess}
              onChange={inputMessage}
              placeholder={"Введите сообщение"}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                add();

                setCount(count + 1);
                setMess("");
                
              }}
            >
              {" "}
              Отправить{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
