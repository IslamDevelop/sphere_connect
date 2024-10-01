import React, { useEffect, useState } from "react";
import { MessageForm } from "./MessageForm";
import { getDatabase, onValue, ref } from "firebase/database";
import { Input } from "../Forms";
import cls from "./MessageForm.module.css";
import logo from "../../assets/home/Rectangle 82.png";
import { useSelector } from "react-redux";

export const Chat = () => {
  const [databaseUser, setDatabaseUser] = useState([]);
  const [value, setValue] = useState("");
  const [send, setSend] = useState(false);
  const userNickname = JSON.parse(localStorage.getItem('user'))
  // Получение списка пользователей из Firebase
  useEffect(() => {
    const db = getDatabase();
    const dbUser = ref(db, "Profile/users/");
    onValue(dbUser, (snapshot) => {
      const users = snapshot.val();
      if (users) {
        setDatabaseUser(users);
      }
    });
  }, []);
  // useEffect(() => {setValue("")

  // },[send])
  
  const handleUserClick = (nickname) => {
    if (value !== nickname) {
    
      setValue(nickname);
      setSend(!send); // Устанавливаем состояние отправки сообщения
    }
  };
  // Обработка клика по пользователю и изменение состояния

  return (
    <div className="container">
      <div className={cls.message}>
        <div className={cls.userList}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Введите имя пользователя"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </form>
          <div className={cls.users}>
            {databaseUser.length > 0 ? (
              databaseUser.map((user) => user.nickname !== userNickname.user ? (
                <div
                  className={cls.user}
                  onClick={() => {
              
                    handleUserClick(user.nickname)
                  console.log(value)}}
                  key={user.id}
                >
                  <img className={cls.img} src={logo} alt="User Avatar" />
                  {user.nickname}
                </div>
              ) : false )
            ) : (
              <p>Загрузка пользователей...</p>
            )}
          </div>
        </div>

        <div className={cls.messageUsers}>
        {
           value == "" ? <p>Выберите пользователя, чтобы начать чат.</p> : <MessageForm user={value} /> 
          }
          {console.log(value)}
        </div>
      </div>
    </div>
  );
};