
import React, { useState } from "react";
import { Button } from "../../components/Forms";
import "./profile.scss";
import { ModalProfile } from "./Modal-profile/ModalProfile";
import {  useSelector } from "react-redux";
import { CardPost } from "../../components/CardPost/CardPost";

export const Profile = () => {
  const posts = useSelector((state) => state.post.array);
  const [isOpen, setIsOpen] = useState(false); // Состояние для модального окна

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <div className="profile-container">
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-info">
            <div className="profile-info-top">
              <div className="profile-stats">
                <div className="stat">
                  <strong>{posts.length}</strong> posts
                </div>
                <div className="stat">
                  <strong>455</strong> followers
                </div>
                <div className="stat">
                  <strong>102</strong> following
                </div>
              </div>
              <Button variant="profileBtn"
                className="edit-profile-btn"
                onClick={toggleModal}
                >
               Edit Profile
              </Button>
            </div>
            <div className="profile-bio">
              <div>
                <h3>
                  <strong>User01</strong>
                </h3>
                <a href="https://via.placeholder.com/150">@user</a>
              </div>
              <div>
                <p>
                  Давно выяснено, что при оценке дизайна и композиции читаемый
                  текст мешает сосредоточиться. 
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="posts-grid">
          {posts.map((post) => (
            <CardPost isProfile={true} post={post} />
          ))}
        </div>       
      </div>
      {/* Модальное окно, передаем состояние и функцию управления */}
      <ModalProfile isOpen={isOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default Profile;
