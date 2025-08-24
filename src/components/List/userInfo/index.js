
// import classNames from "classnames/bind";
// import styles from "./userInfo.module.scss";
// import { moreIcon, videoIcon, editIcon, avatarIcon } from "../image";

// const cx = classNames.bind(styles);

// function UserInfo() {
//     return (
//         <div className={cx('userInfo')}>
//             <div className={cx('user')}>
//                 <img src={avatarIcon} alt=""/>
//                 <p>Trinh Nhu Nhat</p>
//             </div>
//             <div className={cx('icon')}>
//                <img src={moreIcon} alt=""/>
//                <img src={videoIcon} alt=""/>
//                <img src={editIcon} alt=""/>
//             </div>
//         </div>
//     );
// }

// export default UserInfo;

import classNames from "classnames/bind";
import styles from "./userInfo.module.scss";

const cx = classNames.bind(styles);
 
function UserInfo() {
    return (
        <div className={cx('userInfo')}></div>
    );
}

export default UserInfo;