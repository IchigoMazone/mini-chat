import React from "react";
import classNames from "classnames/bind";
import styles from "./MessageContent.module.scss";
import { FileText } from "lucide-react";

const cx = classNames.bind(styles);

function MessageContent({ message, onImagePreview }) {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleDownload = async (url, filename, e) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    const fileUrl = `https://ichigomazone.s3.amazonaws.com/${url}`;
    console.log("Fetching:", fileUrl);
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
    console.log("Download triggered for:", filename);
  } catch (error) {
    console.error("Tải xuống thất bại:", error);
  }
};

  // Handle uploading state
  if (message.uploading) {
    return (
      <div className={cx("message-uploading")}>
        <span>Đang tải {message.fileName}...</span>
        <div className={cx("uploading-progress")}>
          <div className={cx("progress-bar")}></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (message.error) {
    return (
      <div className={cx("message-error")}>
        <span>Lỗi tải {message.fileName}</span>
      </div>
    );
  }

  // Handle image content
  if (message.temporaryImage || message.image) {
    const imageSource = message.temporaryImage || message.image;
    const isBase64 = imageSource && imageSource.startsWith("data:image/");

    console.log(imageSource)

    return (
      <div
        className={cx("message-image", { temporary: message.isTemporary })}
        onClick={() => onImagePreview(imageSource)}
        aria-label="Xem trước hình ảnh"
      >
        <img
          src={
            isBase64
              ? imageSource
              : imageSource && imageSource.startsWith("http")
              ? imageSource
              : `https://ichigomazone.s3.amazonaws.com/${imageSource}`
          }
          alt={message.fileName || "Hình ảnh được chia sẻ"}
          className={cx("image-content")}
          onError={(e) => {
            console.error("Lỗi tải hình ảnh:", e.target.src);
            e.target.parentElement.style.display = "none";
          }}
        />
        {message.uploading && (
          <div className={cx("uploading-indicator")}>
            Đang tải...
          </div>
        )}
      </div>
    );
  }

  // Handle video content
  if (message.temporaryVideo || message.video) {
    const videoSource = message.temporaryVideo || message.video;
    const isBase64 = videoSource && videoSource.startsWith("data:video/");

    return (
      <div className={cx("message-video", { temporary: message.isTemporary })}>
        <video controls className={cx("video-content")}>
          <source
            src={
              isBase64
                ? videoSource
                : videoSource && videoSource.startsWith("http")
                ? videoSource
                : `https://ichigomazone.s3.amazonaws.com/${videoSource}`
            }
            type="video/mp4"
          />
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
        {message.uploading && (
          <div className={cx("uploading-indicator")}>
            Đang tải...
          </div>
        )}
      </div>
    );
  }

  // Handle file content
  if (message.file) {
    const fileUrl = `https://ichigomazone.s3.amazonaws.com/${message.file.url}`;

    console.log("FILE: ", message)

    return (
      <div className={cx("message-file")}>
        <div className={cx("file-container")}>
          <div className={cx("file-icon")}>
            <FileText size={20} />
          </div>
          <div className={cx("file-info")}>
            <div className={cx("file-name")}>{message.file.name}</div>
            {message.file.url && (
              <a
                href={fileUrl}
                className={cx("download-link")}
                onClick={(e) => handleDownload(message.file.url, message.file.name, e)}
              >
                Tải xuống
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Handle text content with URL parsing
  if (typeof message.text === "string" && message.text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.text.split(urlRegex);
    return (
      <span>
        {parts.map((part, index) => {
          if (part.match(urlRegex) && isValidUrl(part)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className={cx("message-link")}
              >
                {part}
              </a>
            );
          }
          return part;
        })}
      </span>
    );
  }

  return <span>{message.text || ""}</span>;
}

export default MessageContent;






