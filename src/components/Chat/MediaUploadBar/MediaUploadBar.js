
import React from "react";
import classNames from "classnames/bind";
import styles from "./MediaUploadBar.module.scss";
import { ImagePlus, FileText, Paperclip } from "lucide-react";

const cx = classNames.bind(styles);

function MediaUploadBar({ onMediaSelect }) {
  return (
    <div className={cx("cr")}>
      <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => onMediaSelect(e, "image")}
        />
        <ImagePlus size={20} />
      </label>
      
      <label className={cx("cr-button")} title="Chọn tệp" aria-label="Chọn tệp để gửi">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.zip,.rar,.xlsx,.xls,.ppt,.pptx"
          style={{ display: "none" }}
          onChange={(e) => onMediaSelect(e, "file")}
        />
        <FileText size={20} />
      </label>
      
      <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
        <input
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={(e) => onMediaSelect(e, "video")}
        />
        <Paperclip size={20}/>
      </label>
    </div>
  );
}

export default MediaUploadBar;