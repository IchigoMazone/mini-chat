
// import classNames from "classnames/bind";
// import styles from "./userInfo.module.scss";

// const cx = classNames.bind(styles);
 
// function UserInfo() {
//     return (
//         <div className={cx('userInfo')}>User Info</div>
//     );
// }

// export default UserInfo;


// import React, { useState } from "react";
// import classNames from "classnames/bind";
// import styles from "./userInfo.module.scss";

// const cx = classNames.bind(styles);

// const UserInfo = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleActionClick = (action) => {
//     alert(`Clicked: ${action}`);
//   };

//   return (
//     <div className={cx("userInfo")}>
//       {/* Search bar */}
//       <div className={cx("searchBar")}>
//         <div className={cx("searchInputWrapper")}>
//           <div className={cx("searchIcon")}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                 stroke="#999"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Tìm kiếm"
//             className={cx("searchInput")}
//             onFocus={(e) =>
//               (e.target.parentNode.style.background = "#e3f2fd")
//             }
//             onBlur={(e) =>
//               (e.target.parentNode.style.background = "#f8f9fa")
//             }
//           />
//         </div>

//         {/* Action buttons */}
//         <div className={cx("actionButtons")}>
//           <button
//             className={cx("actionBtn")}
//             title="Tìm người"
//             onClick={() => handleActionClick("Tìm người")}
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
//                 stroke="#666"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <circle cx="9" cy="7" r="4" stroke="#666" strokeWidth="2" />
//               <path
//                 d="m22 21-3-3m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
//                 stroke="#666"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>

//           <button
//             className={cx("actionBtn")}
//             title="Tạo nhóm"
//             onClick={() => handleActionClick("Tạo nhóm")}
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
//                 stroke="#666"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <rect
//                 x="8"
//                 y="2"
//                 width="8"
//                 height="4"
//                 rx="1"
//                 ry="1"
//                 stroke="#666"
//                 strokeWidth="2"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className={cx("tabs")}>
//         <button
//           className={cx("tab", { active: activeTab === 0 })}
//           onClick={() => setActiveTab(0)}
//         >
//           Tất cả
//         </button>
//         <button
//           className={cx("tab", { active: activeTab === 1 })}
//           onClick={() => setActiveTab(1)}
//         >
//           Chưa đọc
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserInfo;













// import React, { useState } from "react";
// import classNames from "classnames/bind";
// import styles from "./userInfo.module.scss";

// const cx = classNames.bind(styles);

// const UserInfo = () => {
//   const handleActionClick = (action) => {
//     alert(`Clicked: ${action}`);
//   };

//   return (
//     <div className={cx("userInfo")}>
//       {/* Search bar */}
//       <div className={cx("searchBar")}>
//         <div className={cx("searchInputWrapper")}>
//           <div className={cx("searchIcon")}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                 stroke="#999"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Tìm kiếm"
//             className={cx("searchInput")}
//           />
//         </div>

//         {/* Action buttons */}
//         <div className={cx("actionButtons")}>
//           <button
//             className={cx("actionBtn")}
//             title="Tìm người"
//             onClick={() => handleActionClick("Tìm người")}
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
//                 stroke="#666"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <circle cx="9" cy="7" r="4" stroke="#666" strokeWidth="2" />
//               <path
//                 d="m22 21-3-3m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
//                 stroke="#666"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//           <button
//             className={cx("actionBtn")}
//             title="Tạo nhóm"
//             onClick={() => handleActionClick("Tạo nhóm")}
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
//                 stroke="#666"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <rect
//                 x="8"
//                 y="2"
//                 width="8"
//                 height="4"
//                 rx="1"
//                 ry="1"
//                 stroke="#666"
//                 strokeWidth="2"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>


//     </div>
//   );
// };

// export default UserInfo;





// import React, { useState } from "react";
// import classNames from "classnames/bind";
// import styles from "./userInfo.module.scss";

// const cx = classNames.bind(styles);

// const UserInfo = () => {
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
//   const handleActionClick = (action) => {
//     alert(`Clicked: ${action}`);
//   };
  
//   const handleSearchClick = () => {
//     setIsSearchExpanded(true);
//   };
  
//   const handleCloseClick = () => {
//     setIsSearchExpanded(false);
//   };
  
//   return (
//     <div className={cx("userInfo")}>
//       {/* Search bar */}
//       <div className={cx("searchBar")}>
//         <div
//           className={cx("searchInputWrapper", { expanded: isSearchExpanded })}
//           onClick={!isSearchExpanded ? handleSearchClick : undefined}
//         >
//           {/* Icon kính lúp ở bên trái */}
//           {!isSearchExpanded ? (
//             <div className={cx("searchIcon")}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                   stroke="#999"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//           ) : null}
          
//           <input
//             type="text"
//             placeholder="Tìm kiếm"
//             className={cx("searchInput")}
//             readOnly={!isSearchExpanded}
//           />
          
//           {/* Nút đóng ở bên phải khi expanded */}
//           {isSearchExpanded && (
//             <button className={cx("closeBtn")} onClick={handleCloseClick}>
//               Đóng
//             </button>
//           )}
//         </div>
        
//         {/* Action buttons - chỉ hiển thị khi không expanded */}
//         {!isSearchExpanded && (
//           <div className={cx("actionButtons")}>
//             <button
//               className={cx("actionBtn")}
//               title="Tìm người"
//               onClick={() => handleActionClick("Tìm người")}
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
//                   stroke="#666"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <circle cx="9" cy="7" r="4" stroke="#666" strokeWidth="2" />
//                 <path
//                   d="m22 21-3-3m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
//                   stroke="#666"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//             <button
//               className={cx("actionBtn")}
//               title="Tạo nhóm"
//               onClick={() => handleActionClick("Tạo nhóm")}
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
//                   stroke="#666"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <rect
//                   x="8"
//                   y="2"
//                   width="8"
//                   height="4"
//                   rx="1"
//                   ry="1"
//                   stroke="#666"
//                   strokeWidth="2"
//                 />
//               </svg>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserInfo;





// import React, { useState } from "react";
// import classNames from "classnames/bind";
// import styles from "./userInfo.module.scss";

// const cx = classNames.bind(styles);

// const UserInfo = () => {
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);

//   const handleActionClick = (action) => {
//     alert(`Clicked: ${action}`);
//   };

//   const handleSearchClick = () => {
//     setIsSearchExpanded(true);
//   };

//   const handleCloseClick = () => {
//     setIsSearchExpanded(false);
//   };

//   return (
//     <div className={cx("userInfo")}>
//       {/* Search bar */}
//       <div className={cx("searchBar")}>
//         <div
//           className={cx("searchInputWrapper")}
//           onClick={!isSearchExpanded ? handleSearchClick : undefined}
//         >
//           <div className={cx("searchIcon")}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                 stroke="#999"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Tìm kiếm"
//             className={cx("searchInput")}
//             readOnly={!isSearchExpanded}
//           />
//         </div>

//         {/* Action buttons hoặc nút đóng */}
//         <div className={cx("rightSection")}>
//           {!isSearchExpanded ? (
//             <>
//               <button
//                 className={cx("actionBtn")}
//                 title="Tìm người"
//                 onClick={() => handleActionClick("Tìm người")}
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                   <path
//                     d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
//                     stroke="#666"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <circle cx="9" cy="7" r="4" stroke="#666" strokeWidth="2" />
//                   <path
//                     d="m22 21-3-3m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
//                     stroke="#666"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </button>
//               <button
//                 className={cx("actionBtn")}
//                 title="Tạo nhóm"
//                 onClick={() => handleActionClick("Tạo nhóm")}
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                   <path
//                     d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
//                     stroke="#666"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <rect
//                     x="8"
//                     y="2"
//                     width="8"
//                     height="4"
//                     rx="1"
//                     ry="1"
//                     stroke="#666"
//                     strokeWidth="2"
//                   />
//                 </svg>
//               </button>
//             </>
//           ) : (
//             <button className={cx("closeBtn")} onClick={handleCloseClick}>
//               Đóng
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserInfo;


import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./userInfo.module.scss";

const cx = classNames.bind(styles);

const UserInfo = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleActionClick = (action) => {
    alert(`Clicked: ${action}`);
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
