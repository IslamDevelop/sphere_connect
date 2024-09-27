import React, { useState } from 'react';
import {Button} from '../../components/Forms'
import './profile.scss'
import {ModalProfile} from './Modal-profile/ModalProfile'
import { auth } from '../../firebase';

export const Profile = () => { 
  const [isOpen, setIsOpen] = useState(false); // Состояние для модального окна

  const posts = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];
  // Функция для открытия/закрытия модального окна
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
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
              <strong>9</strong> posts
            </div>
            <div className="stat">
              <strong>455</strong> followers
            </div>
            <div className="stat">
              <strong>102</strong> following
            </div>
          </div>
          <Button variant='profileBtn' className="edit-profile-btn" onClick={toggleModal}>Edit Profile</Button> 
          </div>
          <div className="profile-bio">
            <div>
            <h3><strong>{auth.currentUser.email}</strong></h3>
            <a href="https://via.placeholder.com/150">@{auth.currentUser.email}</a>
            </div>
            <div>
            <p>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют</p>
          </div>
          </div>
        </div>
      </div>

      <div className="posts-grid">
        {posts.map((post, index) => (
          <img key={index} src={post} alt={`Post ${index}`} className="post-image" />
        ))}
      </div>
      {/* Модальное окно, передаем состояние и функцию управления */}
      <ModalProfile isOpen={isOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default Profile;