
import classNames from "classnames/bind";
import styles from "./ChatHeader.module.scss";
import { Users, Search, Video, PanelRight, PanelLeft } from "lucide-react";
import { useState } from "react";

const cx = classNames.bind(styles);
const buckets = "ichigomazone";

function ChatHeader({ friend, onAvatarClick, onToggleDetail }) {
  const [pressed, setPressed] = useState(false);

  return (
    <div className={cx("top")}>
      <div className={cx("user-info")}>
        <button 
          className={cx("avatar-button")} 
          onClick={onAvatarClick} 
          title="Xem thông tin người dùng" 
          aria-label="Xem thông tin người dùng"
        >
          <div className={cx("avatar-container")}>
            <img 
              src={friend.avatar
                ? `https://${buckets}.s3.amazonaws.com/${friend.avatar}`
                : `https://${buckets}.s3.amazonaws.com/doraemon.png`
              }
            />
            <div className={cx("online-status")}></div>
          </div>
        </button>
        <div className={cx("user-details")}>
          <h2>{friend.name || "Người dùng"}</h2>
          <span className={cx("status")}>Đang hoạt động</span>
        </div>
      </div>
      <div className={cx("actions")}>
        <button className={cx("action-btn")} title="Cuộc gọi thoại" aria-label="Cuộc gọi thoại">
          <Users size={16} />
        </button>
        <button className={cx("action-btn")} title="Video call" aria-label="Video call">
          <Search size={16} />
        </button>
        <button className={cx("action-btn")} title="Thông tin cuộc trò chuyện" aria-label="Thông tin cuộc trò chuyện">
          <Video size={16} />
        </button>
        <button className={cx("action-btn", "private", { active: pressed })} 
          aria-pressed={pressed}
          title="Tùy chọn khác" 
          onClick={(e) => {
            setPressed((prev) => !prev);
            onToggleDetail(e);
          }}
          aria-label="Tùy chọn khác">
            {pressed ? <PanelRight size={16}/> :< PanelLeft size={16}/>}
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;