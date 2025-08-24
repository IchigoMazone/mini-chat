import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { FaHome, FaCog, FaFilePdf } from "react-icons/fa";
import { avatarIcon } from "../List/image";

export default function Sidebar() {
  // mặc định chọn icon thứ 2 (index = 1 → Home)
  const [activeIndex, setActiveIndex] = useState(1);

  const topItems = [
    { type: "avatar", src: avatarIcon },   // icon 1: Avatar
    { icon: <FaHome />, name: "Home" },    // icon 2
    { icon: <FaCog />, name: "Settings" }, // icon 3
  ];

  const bottomItems = [
    { icon: <FaFilePdf />, name: "PDF" },
    { icon: <FaCog />, name: "Config" },
  ];

  return (
    <div className={styles.sidebar}>
      {/* TOP SECTION */}
      <div className={styles.topSection}>
        {topItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.sidebarItem} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <div
              className={`${styles.icon} ${
                item.type === "avatar" ? styles.avatarWrapper : ""
              }`}
            >
              {item.type === "avatar" ? (
                <img
                  src={item.src}
                  alt="" // ✅ dùng alt="" để tránh warning ESLint (ảnh trang trí)
                  className={styles.avatar}
                />
              ) : (
                item.icon
              )}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <div className={styles.bottomSection}>
        {bottomItems.map((item, index) => {
          const realIndex = index + topItems.length;
          return (
            <div
              key={realIndex}
              className={`${styles.sidebarItem} ${
                activeIndex === realIndex ? styles.active : ""
              }`}
              onClick={() => setActiveIndex(realIndex)}
            >
              <div className={styles.icon}>{item.icon}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
