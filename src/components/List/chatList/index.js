

// import classNames from "classnames/bind";
// import styles from "./chatList.module.scss";
// import { searchIcon, plusIcon, minusIcon, avatarIcon } from "../image";
// import { useState } from "react";

// const cx = classNames.bind(styles);

// function ChatList() {
//     const [addMode, setAddMode] = useState(false);
    
//     // Mock data để test scroll
//     const users = [
//         { name: "Nguyen Dieu Linh", message: "Hello World", time: "2 min ago" },
//         { name: "Tran Van Nam", message: "How are you today?", time: "5 min ago" },
//         { name: "Le Thi Mai", message: "See you tomorrow!", time: "10 min ago" },
//         { name: "Pham Duc Anh", message: "Thanks for your help", time: "15 min ago" },
//         { name: "Hoang Minh Thu", message: "Good morning everyone", time: "20 min ago" },
//         { name: "Nguyen Van Duc", message: "Have a great day!", time: "25 min ago" },
//         { name: "Tran Thi Lan", message: "Meeting at 3PM", time: "30 min ago" },
//         { name: "Le Van Hung", message: "Project completed", time: "35 min ago" },
//         { name: "Pham Thi Hong", message: "Coffee break?", time: "40 min ago" },
//         { name: "Vo Minh Quan", message: "Great presentation today", time: "45 min ago" },
//         { name: "Dang Thi Huong", message: "Weekend plans?", time: "1 hour ago" },
//         { name: "Bui Van Tuan", message: "New restaurant opened", time: "1 hour ago" },
//         { name: "Nguyen Thi Kim", message: "Happy birthday! 🎉", time: "2 hours ago" },
//         { name: "Tran Duc Minh", message: "Football match tonight", time: "2 hours ago" },
//         { name: "Le Thi Oanh", message: "Recipe sharing group", time: "3 hours ago" },
//         { name: "Pham Van Hai", message: "Travel photos uploaded", time: "3 hours ago" },
//         { name: "Hoang Thi Nga", message: "Book club meeting", time: "4 hours ago" },
//         { name: "Nguyen Van Phong", message: "Game night invitation", time: "4 hours ago" },
//         { name: "Tran Thi Binh", message: "Workout buddy needed", time: "5 hours ago" },
//         { name: "Le Van Duc", message: "Movie recommendations?", time: "5 hours ago" }
//     ];

//     return (
//         <div className={cx('chatList')}>
//             <div className={cx('search')}>
//                 <div className={cx('searchBar')}>
//                     <img src={searchIcon} alt=""/>
//                     <input type="text" placeholder="Search"/>
//                 </div>
//                 <img src={addMode ? plusIcon : minusIcon} alt="" className={cx('add')}
//                      onClick={() => setAddMode((prev) => !prev)}/>
//             </div>
            
//             {users.map((user, index) => (
//                 <div key={index} className={cx('item')}>
//                     <img src={avatarIcon} alt=""/>
//                     <div className={cx('text')}>
//                         <span>{user.name}</span>
//                         <p>{user.message}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ChatList;

import classNames from "classnames/bind";
import styles from "./chatList.module.scss";

const cx = classNames.bind(styles);

function ChatList() {
    return (
        <div className={cx('chatList')}></div>
    );
}

export default ChatList;