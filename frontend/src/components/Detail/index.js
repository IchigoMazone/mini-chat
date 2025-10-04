
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import axios from 'axios';
import {
  ChevronDown,
  Bell,
  Users,
  Edit,
  AlertTriangle,
  Trash2,
  MoreHorizontal,
  Play,
  FileText,
  Link,
  ArrowLeft,
  Pin,
} from 'lucide-react';

const cx = classNames.bind(styles);
const buckets = "ichigomazone";

function Detail({ friend }) {
  const [currentView, setCurrentView] = useState('main');
  const [filesData, setFilesData] = useState({ media: [], files: [], links: [] });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [failedMedia, setFailedMedia] = useState(new Set()); // Theo dõi media lỗi

  // Gọi API để lấy dữ liệu media, files, links
  useEffect(() => {
    const fetchData = async () => {
      if (!friend?.id) {
        setError('Không tìm thấy ID người dùng');
        return;
      }

      setIsLoading(true);
      try {
        const res = await axios.post('http://localhost:5000/api/storage/all-file', {
          object: friend.id,
        });

        if (res.status === 200) {
          console.log(res.data)
          setFilesData({
            media: res.data.imagesVideos || [],
            files: res.data.files || [],
            links: res.data.textLinks || [],
          });
          setError(null);
        } else {
          setError('Lỗi khi lấy dữ liệu từ API');
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [friend?.id]);

  console.log(filesData);

  // Memoize dữ liệu để tránh tính toán lại
  const mediaItems = useMemo(() => {
    return filesData.media.slice(0, 8).map((mes, index) => ({
      id: index + 1,
      type: mes.type,
      url: mes.url,
    }));
  }, [filesData.media]);

  const files = useMemo(() => {
    return filesData.files.slice(0, 3).map((m) => ({
      type: m.type,
      name: m.content,
      size: '65.32 KB',
      date: m.date,
      icon: FileText,
      bgColor: 'purple',
      url: m.url,
    }));
  }, [filesData.files]);

  const links = useMemo(() => {
    return filesData.links.slice(0, 3).map((m) => {
      let domain = m.link;
      try {
        domain = new URL(m.link).hostname; // lấy domain từ URL
      } catch (e) {
        // nếu m.link không phải URL hợp lệ thì giữ nguyên
      }
      return {
        name: m.link,   // tên gốc
        url: domain,    // chỉ domain
        date: m.date,
      };
    });
  }, [filesData.links]);

  // Xử lý mở modal preview (cho cả ảnh và video)
  const handlePreview = (item) => {
    setPreviewItem(item);
  };

  // Xử lý đóng modal preview khi click vào nền
  const handleClosePreview = () => {
    setPreviewItem(null);
  };

  // Xử lý hover vào video
  const handleMouseEnter = (id) => {
    setHoveredVideo(id);
  };

  // Xử lý rời chuột khỏi video
  const handleMouseLeave = () => {
    setHoveredVideo(null);
  };

  // Xử lý lỗi tải media
  const handleMediaError = (id) => {
    setFailedMedia((prev) => new Set([...prev, id]));
  };

  const handleDownload = async (s3Key, filename) => {
    try {
      const url = `https://${buckets}.s3.amazonaws.com/${s3Key}`;
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Không thể tải file. Vui lòng thử lại.');
    }
  };

  // Render modal preview cho ảnh và video
  const renderPreviewModal = () => {
    if (!previewItem) return null;

    return (
      <div className={cx('preview-modal')} onClick={handleClosePreview}>
        {previewItem.type === 'image' ? (
          failedMedia.has(previewItem.id) ? (
            <div className={cx('media-placeholder')}>Unavailable</div>
          ) : (
            <img
              src={`https://${buckets}.s3.amazonaws.com/${previewItem.url}`}
              className={cx('media-img')}
              onError={() => handleMediaError(previewItem.id)}
            />
          )
        ) : previewItem.type === 'video' ? (
          failedMedia.has(previewItem.id) ? (
            <div className={cx('media-placeholder')}>Unavailable</div>
          ) : (
            <video
              src={`https://${buckets}.s3.amazonaws.com/${previewItem.url}`}
              controls
              playsInline
              autoPlay
              onError={() => handleMediaError(previewItem.id)}
            />
          )
        ) : (
          <div className={cx('media-placeholder')}>Không hỗ trợ</div>
        )}
      </div>
    );
  };

  // Render giao diện chính
  const renderMainView = () => (
    <div className={cx('main-content')}>
      {/* Avatar Section */}
      <div className={cx('avatar-section')}>
        <div className={cx('avatar')}>
          {friend?.avatar && !failedMedia.has('avatar') ? (
            <img
              src={`https://${buckets}.s3.amazonaws.com/${friend.avatar}`}
              alt="Avatar"
              className={cx('avatar-img')}
              onError={() => handleMediaError('avatar')}
            />
          ) : (
            <div className={cx('media-placeholder')}>Unavailable</div>
          )}
        </div>
      </div>

      {/* Chat Name */}
      <div className={cx('chat-name')}>
        <h3>{friend?.name || 'Người dùng không xác định'}</h3>
      </div>

      {/* Action Button */}
      <div className={cx('action-section')}>
        <div className={cx('action-container')}>
          <button className={cx('action-btn')}>
            <Bell size={20} />
            <span>Tắt thông báo</span>
          </button>
          <button className={cx('action-btn')}>
            <Pin size={20} />
            <span>Ghim trò chuyện</span>
          </button>
          <button className={cx('action-btn')}>
            <Edit size={20} />
            <span>Đặt biệt danh</span>
          </button>
        </div>
      </div>

      {/* Images/Videos Section */}
      <div className={cx('section')}>
        <div className={cx('section-header')}>
          <span>Ảnh/Video</span>
          <ChevronDown size={16} />
        </div>
        {isLoading ? (
          <div className={cx('loading')}>Đang tải...</div>
        ) : error ? (
          <div className={cx('error')}>{error}</div>
        ) : (
          <div className={cx('media-grid')}>
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className={cx('media-item')}
                onMouseEnter={() => item.type === 'video' && handleMouseEnter(item.id)}
                onMouseLeave={() => item.type === 'video' && handleMouseLeave()}
              >
                {item.type === 'image' ? (
                  failedMedia.has(item.id) ? (
                    <div className={cx('media-placeholder')}>Unavailable</div>
                  ) : (
                    <img
                      src={`https://${buckets}.s3.amazonaws.com/${item.url}`}
                      className={cx('media-img')}
                      onError={() => handleMediaError(item.id)}
                      onClick={() => handlePreview(item)}
                    />
                  )
                ) : item.type === 'video' ? (
                  failedMedia.has(item.id) ? (
                    <div className={cx('media-placeholder')}>Unavailable</div>
                  ) : (
                    <div
                      className={cx('video-container')}
                      onClick={() => handlePreview(item)}
                    >
                      <video
                        src={`https://${buckets}.s3.amazonaws.com/${item.url}`}
                        className={cx('media-video')}
                        playsInline
                        preload="metadata"
                        onError={() => handleMediaError(item.id)}
                      />
                      <div
                        className={cx('video-overlay', { 'video-overlay--visible': hoveredVideo === item.id })}
                      >
                        <div className={cx('video-play-icon')}>
                          <Play size={32} />
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className={cx('media-placeholder')}>Không hỗ trợ</div>
                )}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setCurrentView('media')}
          className={cx('view-all-btn')}
          disabled={isLoading}
        >
          Xem tất cả
        </button>
      </div>

      {/* Files Section */}
      <div className={cx('section')}>
        <div className={cx('section-header')}>
          <span>File</span>
          <ChevronDown size={16} />
        </div>
        {isLoading ? (
          <div className={cx('loading')}>Đang tải...</div>
        ) : error ? (
          <div className={cx('error')}>{error}</div>
        ) : (
          <div className={cx('files-list')}>
            {files.map((file, index) => (
              <div key={index} className={cx('file-item')}>
                <div className={cx('file-icon', file.bgColor)}>
                  <a
                    href={`https://${buckets}.s3.amazonaws.com/${file.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <file.icon size={20} color='white'/>
                  </a>
                </div>
                <div className={cx('file-info')}>
                  <a
                    href={`https://${buckets}.s3.amazonaws.com/${file.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx('file-name')}
                    download
                  >
                    {file.name}
                  </a>
                  <p className={cx('file-size')}>{file.size}</p>
                </div>
                <div className={cx('file-date')}>{file.date}</div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setCurrentView('files')}
          className={cx('view-all-btn')}
          disabled={isLoading}
        >
          Xem tất cả
        </button>
      </div>

      {/* Links Section */}
      <div className={cx('section')}>
        <div className={cx('section-header')}>
          <span>Link</span>
          <ChevronDown size={16} />
        </div>
        {isLoading ? (
          <div className={cx('loading')}>Đang tải...</div>
        ) : error ? (
          <div className={cx('error')}>{error}</div>
        ) : (
          <div className={cx('links-list')}>
            {links.map((link, index) => (
              <div key={index} className={cx('link-item')}>
                <div className={cx('link-icon')}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Link size={20} />
                  </a>
                </div>
                <div className={cx('link-info')}>
                  <a
                    href={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx('link-name')}
                  >
                    {link.name}
                  </a>
                  <div className={cx('link-meta')}>
                    <a
                      href={link.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('link-url')}
                    >
                      {link.url}
                    </a>
                    <span className={cx('link-date')}>{link.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setCurrentView('links')}
          className={cx('view-all-btn')}
          disabled={isLoading}
        >
          Xem tất cả
        </button>
      </div>

      {/* Warning Section */}
      <div className={cx('section')}>
        <button className={cx('warning-btn')}>
          <AlertTriangle size={20} />
          <span>Báo xấu</span>
        </button>
      </div>

      {/* Delete Chat Section */}
      <div className={cx('section')}>
        <div className={cx('delete-actions')}>
          <button className={cx('delete-btn')}>
            <Trash2 size={20} />
            <span>Xóa lịch sử trò chuyện</span>
          </button>
          <button className={cx('member-btn')}>
            <div className={cx('member-content')}>
              <Users size={20} />
              <span>Thành viên</span>
            </div>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  // Render toàn bộ media
  const renderMediaView = () => (
    <div className={cx('media-view')}>
      <div className={cx('media-grid-full')}>
        {filesData.media.map((item, index) => (
          <div
            key={index}
            className={cx('media-item-full')}
            onMouseEnter={() => item.type === 'video' && handleMouseEnter(index)}
            onMouseLeave={() => item.type === 'video' && handleMouseLeave()}
          >
            {item.type === 'image' ? (
              failedMedia.has(index) ? (
                <div className={cx('media-placeholder')}>Unavailable</div>
              ) : (
                <img
                  src={`https://${buckets}.s3.amazonaws.com/${item.url}`}
                  className={cx('media-img')}
                  onError={() => handleMediaError(index)}
                  onClick={() => handlePreview({ id: index, type: item.type, url: item.url })}
                />
              )
            ) : item.type === 'video' ? (
              failedMedia.has(index) ? (
                <div className={cx('media-placeholder')}>Unavailable</div>
              ) : (
                <div
                  className={cx('video-container')}
                  onClick={() => handlePreview({ id: index, type: item.type, url: item.url })}
                >
                  <video
                    src={`https://${buckets}.s3.amazonaws.com/${item.url}`}
                    className={cx('media-video')}
                    playsInline
                    preload="metadata"
                    onError={() => handleMediaError(index)}
                  />
                  <div
                    className={cx('video-overlay', { 'video-overlay--visible': hoveredVideo === index })}
                  >
                    <div className={cx('video-play-icon')}>
                      <Play size={32} />
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className={cx('media-placeholder')}>Không hỗ trợ</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Render toàn bộ files
  const renderFilesView = () => (
    <div className={cx('files-view')}>
      <div className={cx('files-list-full')}>
        {filesData.files.map((file, index) => (
          <div key={index} className={cx('file-item-full')}>
            <div className={cx('file-icon-large', 'blue')}>
              <a
                href={`https://${buckets}.s3.amazonaws.com/${file.url}`}
                target="_blank"
                rel="noopener noreferrer"
                download={file.content}
              >
                <FileText size={24} color='white'/>
              </a>
            </div>
            <div className={cx('file-info')}>
              <a
                href={`https://${buckets}.s3.amazonaws.com/${file.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cx('file-name')}
                download={file.content}
              >
                {file.content}
              </a>
              <p className={cx('file-size')}>65.32 KB</p>
            </div>
            <div className={cx('file-date')}>{file.date}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render toàn bộ links
  const renderLinksView = () => (
    <div className={cx('links-view')}>
      <div className={cx('links-list-full')}>
        {filesData.links.map((link, index) => {
          let domain = link.link;
          try {
            const fixed = link.link.startsWith('http') ? link.link : `http://${link.link}`;
            domain = new URL(fixed).hostname;
          } catch (e) {
            // giữ nguyên nếu lỗi
          }

          return (
            <div key={index} className={cx('link-item-full')}>
              <div className={cx('link-icon-large')}>
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  <Link size={24} />
                </a>
              </div>
              <div className={cx('link-info')}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx('link-name')}
                >
                  {link.link}
                </a>
                <div className={cx('link-meta')}>
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx('link-url')}
                  >
                    {domain}
                  </a>
                  <span className={cx('link-date')}>{link.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Lấy tiêu đề dựa trên view hiện tại
  const getViewTitle = () => {
    switch (currentView) {
      case 'media':
        return 'Ảnh/Video';
      case 'files':
        return 'File';
      case 'links':
        return 'Link';
      default:
        return 'Thông tin hội thoại';
    }
  };

  // Nếu không có friend, hiển thị giao diện thay thế
  if (!friend) {
    return (
      <div className={cx('detail')}>
        <div className={cx('header')}>
          <h2 className={cx('title')}>Lỗi</h2>
        </div>
        <div className={cx('error')}>
          Không tìm thấy thông tin người dùng. Vui lòng chọn một người dùng để xem chi tiết.
        </div>
      </div>
    );
  }

  return (
    <div className={cx('detail')}>
      {/* Header */}
      <div className={cx('header')}>
        {currentView !== 'main' && (
          <button onClick={() => setCurrentView('main')} className={cx('back-btn')}>
            <ArrowLeft size={16} />
          </button>
        )}
        <h2 className={cx('title')}>{getViewTitle()}</h2>
      </div>

      {/* Render view tương ứng */}
      {currentView === 'main' && renderMainView()}
      {currentView === 'media' && renderMediaView()}
      {currentView === 'files' && renderFilesView()}
      {currentView === 'links' && renderLinksView()}
      {renderPreviewModal()}
    </div>
  );
}

export default Detail;