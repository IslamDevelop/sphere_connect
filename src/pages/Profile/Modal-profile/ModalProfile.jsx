


import React, { useState, useEffect } from "react";
import { Input } from "../../../components";
import { auth } from "../../../firebase";
import "./ModalProfile.scss";
export const ModalProfile = ({ isOpen, toggleModal }) => {
  //создание состояния
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
    hideAccount: false,
  });
  // загрузки данных из localStorage при монтировании компонента
  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setFormData(JSON.parse(savedData)); 
    }
  }, []);
  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Сохраняем данные в localStorage
      localStorage.setItem("profileData", JSON.stringify(formData));
      alert("Данные успешно сохранены в localStorage!");

      toggleModal(); 
    } catch (error) {
      console.error("Error saving to localStorage: ", error);
      alert("Ошибка сохранения в localStorage");
    }
  };
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-picture-modal"
            />
            <div className="profile-foto">
              <div className="profile-user">
                <h3>
                  <strong>{auth.currentUser.email}</strong>
                </h3>
              </div>
              <div className="profile-a">
                <a href="https://via.placeholder.com/150">@user</a>
              </div>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label className="modal-form-label">
              <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                 <Input
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                 <Input
                  type="text"
                  name="website"
                  placeholder="Website"
                  value={formData.website}
                  onChange={handleChange}
                />
                <textarea
                  className="modal-form-label-textarea"
                  name="story"
                  placeholder="Story"
                  value={formData.story}
                  onChange={handleChange}
                ></textarea>
                <Input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
                <label>
                <input
                    type="checkbox"
                    name="hideAccount"
                    className="checkbox"
                    checked={formData.hideAccount}
                    onChange={handleChange}
                  />
                  Hide accoun
                </label>
              </label>
              <button type="submit">Save</button>
              <button onClick={toggleModal} className="close-modal-btn">
                Close
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProfile;
