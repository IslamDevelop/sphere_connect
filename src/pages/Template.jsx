
import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { auth } from "../firebase";
import { Authorized } from "../components/auth/Authorized";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue } from "firebase/database";

const Template = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Используем слушатель Firebase Auth для отслеживания изменений пользователя
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(user ? true : false); // Обновляем состояние в зависимости от того, есть ли пользователь
     
    });

    // Очищаем слушатель при размонтировании компонента
    return () => unsubscribe();
  }, []);


  return (
    <div>
      <Navbar />
      {/* Проверяем состояние аутентификации и отображаем соответствующий контент */}
      {isAuthenticated === false ? <Authorized /> : <Outlet />}
    </div>
  );
};

export default Template;