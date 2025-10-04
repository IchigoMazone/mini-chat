
import React, { useState, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./ChatInput.module.scss";
import EmojiPicker from "emoji-picker-react";
import { ThumbsUp, Send } from "lucide-react";

const cx = classNames.bind(styles);

function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  // Hàm xử lý khi chọn emoji từ EmojiPicker
  const handleEmoji = useCallback((emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
    setOpen(false);
  }, []);

  const handleSend = useCallback(() => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    } else {
      // Gửi like nếu không có text
      onSend("👍");
    }
  }, [text, onSend]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  }, [handleSend]);

  return (
    <>
      <div className={cx("input-area")}>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={cx("message-input")}
          aria-label="Nhập tin nhắn"
        />
        
        <div className={cx("emoji-container")}>
          <button
            className={cx("emoji-button")}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Mở bảng chọn biểu tượng cảm xúc"
          >
            <i class="fi fi-rr-smile"></i>
          </button>
          <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
            <EmojiPicker
              onEmojiClick={handleEmoji}
              width={300}
              height={400}
              theme="auto"
              emojiStyle="native"
              previewConfig={{ showPreview: false }}
            />
          </div>
        </div>
        
        <button
          onClick={handleSend}
          className={cx("send-button", { active: text.trim() })}
          aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
        >
          {text.trim() ? <Send size={20}/> : <ThumbsUp size={20}/>}
        </button>
      </div>

      {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
    </>
  );
}

export default ChatInput;