

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./List.module.scss";
import UserInfo from "./userInfo";
import ChatList from "./chatList";
import FriendList from "./friendList";

const cx = classNames.bind(styles);

function List({ onSelectFriend, selectedFriend, datax }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  console.log("List : ", datax);

  return (
    <div className={cx("list")}>
      <UserInfo
        isSearchExpanded={isSearchExpanded}
        setIsSearchExpanded={setIsSearchExpanded}
        onSelectFriend={onSelectFriend} // Truyền callback vào UserInfo (cho AddFriend)
      />
      {isSearchExpanded ? (
        <FriendList
          onSelectFriend={onSelectFriend} 
          selectedFriend={selectedFriend} 
        /> // Truyền callback và selectedFriend
      ) : (
        <ChatList
          onSelectFriend={onSelectFriend} 
          selectedFriend={selectedFriend} 
          chatData1={datax}
        /> // Truyền callback và selectedFriend
      )}
    </div>
  );
}

export default List;
