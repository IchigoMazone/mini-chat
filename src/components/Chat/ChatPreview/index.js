
import classNames from "classnames/bind";
import styles from "./ChatPreView.module.scss";

const cx = classNames.bind(styles);
const buckets = "ichigomazone";

function ChatPreview({ imageUrl, onClose }) {

  return (
    <div className={cx("image-preview")} onClick={onClose}>
      <img 
        src={
        `https://${buckets}.s3.amazonaws.com/${imageUrl}`
        } 
        alt="preview" 
      />
    </div>
  );
}

export default ChatPreview;