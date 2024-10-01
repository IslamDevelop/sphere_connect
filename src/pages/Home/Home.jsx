import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardPost } from "../../components/CardPost/CardPost";
import { getDatabase, onValue, ref } from "firebase/database";

export const Home = () => {
  const postsFromStore = useSelector((state) => state.post.array); // Posts from Redux
  const [firebasePosts, setFirebasePosts] = useState([]); // Local state for Firebase posts

  useEffect(() => {
    const db = getDatabase();
    const postDataBase = ref(db, "post");

    const unsubscribe = onValue(postDataBase, (snapshot) => {
      const firebaseData = snapshot.val() || [];
      setFirebasePosts(firebaseData);
    });

    return () => unsubscribe(); // Clean up listener when component unmounts
  }, []);

  // Merge posts from Firebase and Redux, avoiding duplicates by checking unique IDs
  const combinedPosts = [...firebasePosts, ...postsFromStore.filter(postFromStore => {
    return !firebasePosts.some(post => post.id === postFromStore.id);
  })];

  return (
    <div className="container">
      {combinedPosts.length > 0 ? (
        combinedPosts.reverse().map((post, index) => (
          <CardPost key={post.id || index} post={post} /> // Ensure unique keys
        ))
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
};
