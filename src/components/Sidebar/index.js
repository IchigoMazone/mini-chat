
// import classNames from "classnames/bind";
// import styles from "./Sidebar.module.scss";

// const cx = classNames.bind(styles);

// function Sidebar() {
//     return ( 
//         <div className={cx('sidebar')}>Sidebar
//         </div>
//     );
// }

// export default Sidebar;


import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { avatarIcon } from "../List/image";

const cx = classNames.bind(styles);

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(1); // Mặc định Google+ (index 1)
  
  const itemPositions = [20, 90, 160, 330, 400]; // Vị trí Y của từng item

  const handleSetActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={cx('sidebar')}>
      <div className={cx('sidebar-content')}>
        <div 
          className={cx('active-indicator')}
          style={{ top: `${itemPositions[activeIndex]}px` }}
        />
        
        <div className={cx('sidebar-top')}>
          {/* Profile Avatar */}
          <div 
            className={cx('sidebar-item', { active: activeIndex === 0 })} 
            onClick={() => handleSetActive(0)}
          >
            <div className={cx('avatar-img')}>
                <img src={avatarIcon} alt=""/>
            </div>
          </div>

          {/* Google+ Icon */}
          <div 
            className={cx('sidebar-item', { active: activeIndex === 1 })} 
            onClick={() => handleSetActive(1)}
          >
            <div className={cx('icon', 'google-plus')}>G+</div>
          </div>

          {/* Contact/User Icon */}
          <div 
            className={cx('sidebar-item', { active: activeIndex === 2 })} 
            onClick={() => handleSetActive(2)}
          >
            <div className={cx('icon')}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={cx('sidebar-bottom')}>
          {/* Cloud Icon */}
          <div 
            className={cx('sidebar-item', { active: activeIndex === 3 })} 
            onClick={() => handleSetActive(3)}
          >
            <div className={cx('icon')}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
              </svg>
            </div>
          </div>

          {/* Settings/Gear Icon */}
          <div 
            className={cx('sidebar-item', { active: activeIndex === 4 })} 
            onClick={() => handleSetActive(4)}
          >
            <div className={cx('icon')}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;