import React from "react";
import { database } from "../firebase";
import { getDatabase ,ref, set, get } from "firebase/database";
import { getStorage, uploadBytesResumable } from "firebase/storage";

export default async function addPostBekend(newPost, img) {
  const db = getDatabase();
  const postRef = ref(db, "post"); 
  // const storage = getStorage()
  // const imageRef = ref(storage, `images/${img.name}`)
  try {
    const snapshot = await get(postRef);
    const existingPosts = snapshot.val() || [];
    const updatePosts = [...existingPosts, newPost];
    
    await set(postRef, updatePosts);
    // uploadBytesResumable(imageRef, img);
    console.log("пост добавлен");
   
  } catch (error) {
    console.error("ощибка", error);
  }
}
