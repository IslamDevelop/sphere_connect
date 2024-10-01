import firebase from "firebase/compat/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { auth } from "../../firebase";

export default async function writeUserData(newMessage,userName) {
const myName = JSON.parse(localStorage.getItem('user'))
  console.log(userName)
  const db = getDatabase();
  const messagesRef = ref(db, `messagesData/messages/${myName.nickname}${userName.user}`);
  const messagesRef2 = ref(db, `messagesData/messages/${userName.user}${myName.nickname}`);
  try {
    // Получаем существующие сообщения
    const snapshot = await get(messagesRef);
    const snapshot2 = await get(messagesRef2);
    const existingMessages = snapshot.val() || [];
    const existingMessages2 = snapshot2.val() || [];

    // Добавляем новое сообщение к существующим
    const updatedMessages = [...existingMessages, newMessage];
    const updatedMessages2 = [...existingMessages2, newMessage];
    

    console.log(updatedMessages);
    // Обновляем данные в базе с помощью set
    await set(messagesRef, updatedMessages);
    await set(messagesRef2, updatedMessages2);

    console.log("Сообщение успешно добавлено");
  } catch (error) {
    console.error("Ошибка при обновлении:", error);
  }

  
}
