
import React from "react";
import classNames from "classnames/bind";
import styles from "./userInfo.module.scss";

const cx = classNames.bind(styles);

const UserInfo = ({ isSearchExpanded, setIsSearchExpanded }) => {
  const handleActionClick = (action) => {
    if (action === "Tạo nhóm") alert("Chức  năng đang phát triển");
    else alert(action);
  };

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  const handleCloseClick = () => {
    setIsSearchExpanded(false);
  };

  return (
    <div className={cx("userInfo")}>
      {/* Search bar */}
      <div className={cx("searchBar")}>
        <div
          className={cx("searchInputWrapper")}
          onClick={!isSearchExpanded ? handleSearchClick : undefined}
        >
          <div className={cx("searchIcon")}>🔍</div>
          <input
            type="text"
            placeholder="Tìm kiếm"
            className={cx("searchInput")}
            readOnly={!isSearchExpanded}
          />
        </div>

        {/* Action buttons hoặc nút đóng */}
        <div className={cx("rightSection")}>
          {!isSearchExpanded ? (
            <>
              <button
                className={cx("actionBtn")}
                title="Tìm người"
                onClick={() => handleActionClick("Tìm người")}
              >
                👤
              </button>
              <button
                className={cx("actionBtn")}
                title="Tạo nhóm"
                onClick={() => handleActionClick("Tạo nhóm")}
              >
                📂
              </button>
            </>
          ) : (
            <button
              className={cx("closeBtnWide")}
              onClick={handleCloseClick}
              title="Đóng"
            >
              Đóng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
