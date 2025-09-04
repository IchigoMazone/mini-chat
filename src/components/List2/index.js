
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./List2.module.scss";
import UserInfo from "./userInfo";
import ChatList from "./chatList";
import FriendList from "./friendList";

const cx = classNames.bind(styles);

function List2({ selectedItem, onSelect }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <div className={cx("list")}>
      <UserInfo
        isSearchExpanded={isSearchExpanded}
        setIsSearchExpanded={setIsSearchExpanded}
      />

      {/* Nếu đang search thì hiện FriendList, ngược lại hiện ChatList */}
      {isSearchExpanded ? (
        <FriendList />
      ) : (
        <ChatList
          selectedItem={selectedItem}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}

export default List2;
