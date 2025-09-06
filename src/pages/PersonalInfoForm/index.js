import React, { useState } from "react";
import classNames from "classnames/bind";
import { User, Upload, Calendar, Check } from "lucide-react";
import styles from "./PersonalInfoForm.module.scss";

const cx = classNames.bind(styles);

export default function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    profileImage: null,
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (formData.fullName && formData.gender && formData.birthDate) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const isFormValid = formData.fullName && formData.gender && formData.birthDate;

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("box")}>
          <div className={cx("header")}>
            <h2 className={cx("title")}>Thông Tin Cá Nhân</h2>
            <p className={cx("subtitle")}>Vui lòng điền đầy đủ thông tin của bạn</p>
          </div>

          <form className={cx("form")} onSubmit={(e) => e.preventDefault()}>
            {/* Upload Avatar */}
            <div className={cx("avatarSection")}>
              <div className={cx("avatarWrapper")}>
                <div className={cx("avatarContainer")}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <div className={cx("avatarPlaceholder")}>
                      <User />
                    </div>
                  )}
                </div>
                <label className={cx("uploadButton")}>
                  <Upload />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={cx("hiddenInput")}
                  />
                </label>
              </div>
              <p className={cx("avatarLabel")}>Chọn ảnh đại diện</p>
            </div>

            <div className={cx("formGrid")}>
              {/* Full Name */}
              <div className={cx("form-group", "fullWidth")}>
                <label className={cx("label")}>Họ và tên *</label>
                <div className={cx("input-wrapper")}>
                  <User className={cx("input-icon")} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên của bạn..."
                    className={cx("input")}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div className={cx("form-group")}>
                <label className={cx("label")}>Giới tính *</label>
                <div className={cx("genderOptions")}>
                  <label className={cx("genderOption")}>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className={cx("hiddenInput")}
                    />
                    <div className={cx("genderButton", { selected: formData.gender === "male" })}>
                      Nam
                    </div>
                  </label>
                  <label className={cx("genderOption")}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className={cx("hiddenInput")}
                    />
                    <div className={cx("genderButton", { selected: formData.gender === "female" })}>
                      Nữ
                    </div>
                  </label>
                </div>
              </div>

              {/* Birth Date */}
              <div className={cx("form-group")}>
                <label className={cx("label")}>Ngày sinh *</label>
                <div className={cx("input-wrapper")}>
                  <Calendar className={cx("input-icon")} />
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className={cx("input")}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleSubmit}
              className={cx("btn", { disabled: !isFormValid })}
            >
              {isSubmitted ? (
                <span className={cx("successMessage")}>
                  <Check />
                  Đã lưu thành công!
                </span>
              ) : (
                "Lưu thông tin"
              )}
            </button>
          </form>

          {/* Form Data Preview */}
          {(formData.fullName || formData.gender || formData.birthDate) && (
            <div className={cx("preview")}>
              <h3 className={cx("previewTitle")}>Thông tin đã nhập:</h3>
              <div className={cx("previewContent")}>
                {formData.fullName && (
                  <p>
                    <span>Họ tên:</span> {formData.fullName}
                  </p>
                )}
                {formData.gender && (
                  <p>
                    <span>Giới tính:</span> {formData.gender === "male" ? "Nam" : "Nữ"}
                  </p>
                )}
                {formData.birthDate && (
                  <p>
                    <span>Ngày sinh:</span> {new Date(formData.birthDate).toLocaleDateString("vi-VN")}
                  </p>
                )}
                {formData.profileImage && (
                  <p>
                    <span>Ảnh:</span> {formData.profileImage.name}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}