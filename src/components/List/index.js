
// import { useState } from "react";
// import classNames from "classnames/bind";
// import styles from "./List.module.scss";
// import UserInfo from "./userInfo";
// import ChatList from "./chatList";
// import FriendList from "./friendList";

// const cx = classNames.bind(styles);

// function List() {
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);

//   return (
//     <div className={cx("list")}>
//       <UserInfo
//         isSearchExpanded={isSearchExpanded}
//         setIsSearchExpanded={setIsSearchExpanded}
//       />

//       {/* Nếu đang search thì hiện FriendList, ngược lại hiện ChatList */}
//       {isSearchExpanded ? <FriendList /> : <ChatList />}
//     </div>
//   );
// }

// export default List;



// import React, { useState } from "react";
// import classNames from "classnames/bind";
// import styles from "./List2.module.scss";
// import UserInfo from "./userInfo";
// import ChatList from "./chatList";
// import FriendList from "./friendList";

// const cx = classNames.bind(styles);

// function List2({ selectedItem, onSelect, onSelectFriend }) {
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);

//   return (
//     <div className={cx("list")}>
//       <UserInfo
//         isSearchExpanded={isSearchExpanded}
//         setIsSearchExpanded={setIsSearchExpanded}
//         onSelectFriend={onSelectFriend} // Truyền callback vào UserInfo (cho AddFriend)
//       />
//       {isSearchExpanded ? (
//         <FriendList onSelectFriend={onSelectFriend} /> // Truyền callback vào FriendList
//       ) : (
//         <ChatList selectedItem={selectedItem} onSelect={onSelect} />
//       )}
//     </div>
//   );
// }

// export default List2;



import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./List.module.scss";
import UserInfo from "./userInfo";
import ChatList from "./chatList";
import FriendList from "./friendList";

const cx = classNames.bind(styles);

function List({ onSelectFriend, selectedFriend }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <div className={cx("list")}>
      <UserInfo
        isSearchExpanded={isSearchExpanded}
        setIsSearchExpanded={setIsSearchExpanded}
        onSelectFriend={onSelectFriend} // Truyền callback vào UserInfo (cho AddFriend)
      />
      {isSearchExpanded ? (
        <FriendList onSelectFriend={onSelectFriend} selectedFriend={selectedFriend} /> // Truyền callback và selectedFriend
      ) : (
        <ChatList onSelectFriend={onSelectFriend} selectedFriend={selectedFriend} /> // Truyền callback và selectedFriend
      )}
    </div>
  );
}

export default List;
