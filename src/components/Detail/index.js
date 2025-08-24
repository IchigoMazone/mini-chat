
// import classNames from "classnames/bind";
// import styles from "./Detail.module.scss";
// import { avatarIcon, searchIcon } from "../List/image";

// const cx = classNames.bind(styles);

// function Detail() {
//   return (
//     <div className={cx("detail")}>
//       <div className={cx("user")}>
//         <img src={avatarIcon} alt="" />
//         <h2>Nguyen Dieu Lyng</h2>
//         <p>Hello World</p>
//       </div>

//       <div className={cx("info")}>
//         <div className={cx("option")}>
//           <div className={cx("title")}>
//             <span>Chat Setting</span>
//             <img src={searchIcon} alt="" className={cx("icon")} />
//           </div>
//         </div>

//         <div className={cx("option")}>
//           <div className={cx("title")}>
//             <span>Privacy & Help</span>
//             <img src={searchIcon} alt="" className={cx("icon")} />
//           </div>
//         </div>

//         <div className={cx("option")}>
//           <div className={cx("title")}>
//             <span>Shared Photos</span>
//             <img src={searchIcon} alt="" className={cx("icon")} />
//           </div>

//           {/* Photo list */}
//           {[1, 2, 3].map((i) => (
//             <div className={cx("photos")} key={i}>
//               <div className={cx("photoItem")}>
//                 <div className={cx("photoDetail")}>
//                   <img
//                     src="https://nld.mediacdn.vn/thumb_w/698/291774122806476800/2025/8/23/anh-chup-man-hinh-2025-08-23-luc-142107-1755934691472254736667.png"
//                     alt=""
//                   />
//                   <span>photo_{i}</span>
//                 </div>
//                 <img src={searchIcon} alt="" className={cx("icon")} />
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className={cx("option")}>
//           <div className={cx("title")}>
//             <span>Shared Files</span>
//             <img src={searchIcon} alt="" className={cx("icon")} />
//           </div>
//         </div>
//       </div>

//       <button>Block User</button>
//       <button className={cx("logout")}>Log out</button>
//     </div>
//   );
// }

// export default Detail;

import classNames from "classnames/bind";
import styles from "./Detail.module.scss";

const cx = classNames.bind(styles);

function Detail() {
  return (
    <div className={cx('detail')}></div>
  );
}

export default Detail;