
// import classNames from "classnames/bind";
// import styles from "./Sidebar.module.scss";
// import { avatarIcon } from "../List/image";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const cx = classNames.bind(styles);

// function Sidebar({ activeIndex, setActiveIndex, datax }) {
//   const itemPositions = [18, 89, 158, 813, 883];

//   const handleSetActive = (index) => {
//     setActiveIndex(index);
//   };

//   const [userInfo, setUserInfo] = useState({ avatar: "" });

//   useEffect(() => {
//     if (!datax) return;

//     const fetchUserInfo = async () => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/auth/leak-info", {
//           datax
//         });
//         if (res.status === 200) {
//           setUserInfo(res.data.userInfo);
//           console.log('User info:', res.data.userInfo);
//         }
//       } catch (error) {
//         console.error('Error fetching user info:', error);
//       }
//     };

//     fetchUserInfo();
//   }, [datax]);

//   // console.log("Sidebar : ", datax);
//   // console.log("Sidebar : ", userInfo);

//   return (
//     <div className={cx('sidebar')}>
//       <div className={cx('sidebar-content')}>
//         <div 
//           className={cx('active-indicator')}
//           style={{ top: `${itemPositions[activeIndex]}px` }}
//         />
        
//         <div className={cx('sidebar-top')}>
//           {/* Avatar */}
//           <div 
//             className={cx('sidebar-item', { active: activeIndex === 0 })} 
//             onClick={() => handleSetActive(0)}
//           >
//             <div className={cx('avatar-img')}>
//               <img src={userInfo._doc?.avatar ? `http://localhost:5000${userInfo._doc.avatar}` : avatarIcon} alt="avatar" />
//             </div>
//           </div>

//           {/* Google+ */}
//           <div 
//             className={cx('sidebar-item', { active: activeIndex === 1 })} 
//             onClick={() => handleSetActive(1)}
//           >
//             <div className={cx('icon')}>
//               <i class="fi fi-rr-comment-alt"></i>
//             </div>
//           </div>

//           {/* User */}
//           <div 
//             className={cx('sidebar-item', { active: activeIndex === 2 })} 
//             onClick={() => handleSetActive(2)}
//           >
//             <div className={cx('icon')}>
//               <i class="fi fi-rr-address-book"></i>
//             </div>
//           </div>
//         </div>

//         <div className={cx('sidebar-bottom')}>
//           {/* Cloud */}
//           <div 
//             className={cx('sidebar-item', { active: activeIndex === 3 })} 
//             onClick={() => handleSetActive(3)}
//           >
//             <div className={cx('icon')}>
//               <i class="bi bi-cloud"></i>
//             </div>
//           </div>

//           {/* Settings */}
//           <div 
//             className={cx('sidebar-item', { active: activeIndex === 4 })} 
//             onClick={() => handleSetActive(4)}
//           >
//             <div className={cx('icon')}>
//               <i class="fi fi-rr-settings"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;











import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { avatarIcon } from "../List/image";
import axios from "axios";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Sidebar({ activeIndex, setActiveIndex, datax }) {
  const handleSetActive = (index) => {
    setActiveIndex(index);
  };

  const [userInfo, setUserInfo] = useState({ avatar: "" });
  
  useEffect(() => {
    if (!datax) return;
    
    const fetchUserInfo = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/leak-info", {
          datax
        });
        if (res.status === 200) {
          setUserInfo(res.data.userInfo);
          console.log('User info:', res.data.userInfo);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    
    fetchUserInfo();
  }, [datax]);

  return (
    <div className={cx('sidebar')}>
      <div className={cx('sidebar-content')}>
        <div className={cx('sidebar-top')}>
          {/* Avatar */}
          <div
            className={cx('sidebar-item', { active: activeIndex === 0 })}
            onClick={() => handleSetActive(0)}
          >
            <div className={cx('avatar-img')}>
              <img 
                src={userInfo._doc?.avatar ? `http://localhost:5000${userInfo._doc.avatar}` : avatarIcon} 
                alt="avatar" 
              />
            </div>
          </div>
          
          {/* Comment */}
          <div
            className={cx('sidebar-item', { active: activeIndex === 1 })}
            onClick={() => handleSetActive(1)}
          >
            <div className={cx('icon')}>
              {/* <i className="fi fi-rr-comment-alt"></i> */}
              <i class="fi fi-rr-envelope"></i>
            </div>
          </div>
          
          {/* Address Book */}
          <div
            className={cx('sidebar-item', { active: activeIndex === 2 })}
            onClick={() => handleSetActive(2)}
          >
            <div className={cx('icon')}>
              <i className="fi fi-rr-address-book"></i>
            </div>
          </div>
        </div>
        
        <div className={cx('sidebar-bottom')}>
          {/* Cloud */}
          <div
            className={cx('sidebar-item', { active: activeIndex === 3 })}
            onClick={() => handleSetActive(3)}
          >
            <div className={cx('icon')}>
              <i class="fi fi-rr-cloud"></i>
            </div>
          </div>
          
          {/* Settings */}
          <div
            className={cx('sidebar-item', { active: activeIndex === 4 })}
            onClick={() => handleSetActive(4)}
          >
            <div className={cx('icon')}>
              <i className="fi fi-rr-settings"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;