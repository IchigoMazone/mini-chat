import React from 'react';
import classNames from 'classnames/bind';
import styles from './VideoPreview.module.scss';

const cx = classNames.bind(styles);

function VideoPreview({ videoUrl, onClose }) {
  console.log('VideoPreview rendered with URL:', videoUrl); // Debug render

  const handleVideoClick = (e) => {
    e.stopPropagation();
    console.log('Clicked on video, URL:', videoUrl); // Debug click
  };

  return (
    <div className={cx('video-preview')} onClick={onClose}>
      <div className={cx('video-content')}>
        <button onClick={onClose} className={cx('close-btn')}>
          &times;
        </button>
        <video
          src={videoUrl}
          controls
          playsInline
          autoPlay
          className={cx('video')}
          onClick={handleVideoClick}
          onError={() => {
            console.error('Video load error:', videoUrl);
            alert('Không thể tải video. Vui lòng thử lại.');
          }}
        />
      </div>
    </div>
  );
}

export default VideoPreview;