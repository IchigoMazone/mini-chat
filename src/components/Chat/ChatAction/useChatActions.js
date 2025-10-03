
import { useCallback } from "react";
import axios from "axios";

const useChatActions = (friend, onUpdateChat, setMessages, socketRef) => {
  const handleSend = useCallback(
    async (messageText = "") => {
      if (!friend || !friend.id || !friend.sender) return;

      if (messageText.trim()) {
        const newMessage = {
          id: Date.now(),
          text: messageText.trim(),
          type: "sent",
          timestamp: new Date(),
          isTemporary: false,
        };
        setMessages((prev) => [...prev, newMessage]);

        if (socketRef.current) {
          socketRef.current.emit("sendMessage", {
            toUserId: friend.member,
            message: {
              id: newMessage.id,
              conversation_id: friend.id,
              sender: friend.sender,
              recipient: friend.member,
              content: newMessage.text,
              message_type: "text",
              timestamp: newMessage.timestamp.toISOString(),
              url: null,
            },
          });

          socketRef.current.emit("sendMessage", {
            toUserId: friend.sender,
            message: {
              id: newMessage.id,
              conversation_id: friend.id,
              sender: friend.sender,
              recipient: friend.sender,
              content: newMessage.text,
              message_type: "text",
              timestamp: newMessage.timestamp.toISOString(),
              url: null,
            },
          });
        }

        try {
          await axios.post("http://localhost:5000/api/chat/send-message/", {
            id: newMessage.id,
            conversationId: friend.id,
            sender: friend.sender,
            content: messageText.trim(),
            message_type: "text",
            timestamp: new Date().toISOString(),
            recipient: friend.member,
          });
        } catch (error) {
          console.error("Lỗi gửi tin nhắn:", error);
        }
      } else {
        const likeMessage = {
          id: Date.now(),
          text: "👍",
          type: "sent",
          timestamp: new Date(),
          isTemporary: false,
        };
        setMessages((prev) => [...prev, likeMessage]);

        if (socketRef.current) {
          socketRef.current.emit("sendMessage", {
            toUserId: friend.member,
            message: {
              id: likeMessage.id,
              conversation_id: friend.id,
              sender: friend.sender,
              recipient: friend.member,
              content: "👍",
              message_type: "text",
              timestamp: likeMessage.timestamp.toISOString(),
              url: null,
            },
          });

          socketRef.current.emit("sendMessage", {
            toUserId: friend.sender,
            message: {
              id: likeMessage.id,
              conversation_id: friend.id,
              sender: friend.sender,
              recipient: friend.sender,
              content: "👍",
              message_type: "text",
              timestamp: likeMessage.timestamp.toISOString(),
              url: null,
            },
          });
        }

        try {
          await axios.post("http://localhost:5000/api/chat/send-message/", {
            id: likeMessage.id,
            conversationId: friend.id,
            sender: friend.sender,
            content: "👍",
            message_type: "text",
            timestamp: new Date().toISOString(),
            recipient: friend.member,
          });
        } catch (error) {
          console.error("Lỗi gửi tin nhắn like:", error);
        }
      }
    },
    [friend, onUpdateChat, setMessages, socketRef]
  );

  const handleMediaSelect = useCallback(
    async (e, mediaType) => {
      if (!friend || !friend.id || !friend.sender) return;

      const file = e.target.files[0];
      if (!file) {
        alert("Vui lòng chọn một tệp.");
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        alert("Tệp quá lớn. Kích thước tối đa là 50MB.");
        return;
      }

      if (mediaType === "image" && !file.type.startsWith("image/")) {
        alert("Vui lòng chọn tệp hình ảnh.");
        return;
      }

      if (mediaType === "video" && !file.type.startsWith("video/")) {
        alert("Vui lòng chọn tệp video.");
        return;
      }

      const tempMessageId = Date.now() + Math.random();

      if (mediaType === "file") {
        await uploadFileDirectly(file, mediaType, tempMessageId);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const tempMessage = {
            id: tempMessageId,
            type: "sent",
            timestamp: new Date(),
            uploading: true,
            fileName: file.name,
            isTemporary: true,
          };

          let base64Data = null;
          if (mediaType === "image") {
            tempMessage.temporaryImage = reader.result;
            base64Data = reader.result;
          } else if (mediaType === "video") {
            tempMessage.temporaryVideo = reader.result;
            base64Data = reader.result;
          }

          setMessages((prev) => [...prev, tempMessage]);

          if (socketRef.current) {
            socketRef.current.emit("sendMessage", {
              toUserId: friend.member,
              message: {
                id: tempMessageId,
                conversation_id: friend.id,
                sender: friend.sender,
                recipient: friend.member,
                content: file.name,
                message_type: mediaType,
                timestamp: new Date().toISOString(),
                url: null,
                base64Data: base64Data,
              },
            });

            socketRef.current.emit("sendMessage", {
              toUserId: friend.sender,
              message: {
                id: tempMessageId,
                conversation_id: friend.id,
                sender: friend.sender,
                recipient: friend.sender,
                content: file.name,
                message_type: mediaType,
                timestamp: new Date().toISOString(),
                url: null,
                base64Data: base64Data,
              },
            });
          }

          uploadFileToServer(file, mediaType, tempMessageId, base64Data);
        };

        reader.onerror = () => {
          alert("Lỗi khi đọc tệp.");
        };
        reader.readAsDataURL(file);
      }
    },
    [friend, onUpdateChat, setMessages, socketRef]
  );

  const uploadFileDirectly = async (file, mediaType, messageId) => {
    if (!friend || !friend.id || !friend.sender) return;

    const formData = new FormData();
    formData.append("file", file, encodeURIComponent(file.name));

    try {
      const uploadingMessage = {
        id: messageId,
        type: "sent",
        timestamp: new Date(),
        uploading: true,
        fileName: file.name,
        isTemporary: false,
      };
      setMessages((prev) => [...prev, uploadingMessage]);

      const uploadResponse = await axios.post(`http://localhost:5000/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      });

      if (uploadResponse.data.url) {
        const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");
        const fullUrl = uploadResponse.data.url;

        const fileMessage = {
          id: messageId,
          type: "sent",
          timestamp: new Date(),
          uploading: false,
          fileName: file.name,
          file: {
            name: decodeURIComponent(file.name),
            url: fullUrl,
          },
          isTemporary: false,
        };

        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === messageId) {
              return fileMessage;
            }
            return msg;
          })
        );

        if (socketRef.current) {
          socketRef.current.emit("sendMessage", {
            toUserId: friend.member,
            message: {
              id: messageId,
              conversation_id: friend.id,
              sender: friend.sender,
              recipient: friend.member,
              content: decodeURIComponent(file.name),
              message_type: mediaType,
              timestamp: new Date().toISOString(),
              url: filePath,
            },
          });

          socketRef.current.emit("sendMessage", {
            toUserId: friend.sender,
            message: {
              id: messageId,
              conversation_id: friend.id,
              sender: friend.sender,
              recipient: friend.sender,
              content: decodeURIComponent(file.name),
              message_type: mediaType,
              timestamp: new Date().toISOString(),
              url: filePath,
            },
          });
        }

        try {
          await axios.post("http://localhost:5000/api/chat/send-message/", {
            id: messageId,
            conversationId: friend.id,
            sender: friend.sender,
            content: decodeURIComponent(file.name),
            message_type: mediaType,
            timestamp: new Date().toISOString(),
            recipient: friend.member,
            url: filePath,
          });
        } catch (messageError) {
          console.error("Lỗi gửi tin nhắn:", messageError);
        }
      }
    } catch (uploadError) {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              uploading: false,
              error: true,
              isTemporary: false,
            };
          }
          return msg;
        })
      );
      alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
    }
  };

  const uploadFileToServer = async (file, mediaType, messageId, base64Data = null) => {
    if (!friend || !friend.id || !friend.sender) return;

    const formData = new FormData();
    let endpoint;

    if (mediaType === "image") {
      formData.append("file", file, encodeURIComponent(file.name));
      endpoint = "/upload-file";
    } else if (mediaType === "video") {
      formData.append("video", file, encodeURIComponent(file.name));
      endpoint = "/upload-video";
    }

    try {
      const uploadResponse = await axios.post(`http://localhost:5000${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      });

      if (uploadResponse.data.url) {
        const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");
        const fullUrl = uploadResponse.data.url;

        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === messageId) {
              const updatedMsg = {
                ...msg,
                uploading: false,
                isTemporary: false,
                image: mediaType === "image" ? fullUrl : msg.image,
                video: mediaType === "video" ? fullUrl : msg.video,
              };
              return updatedMsg;
            }
            return msg;
          })
        );

        if (socketRef.current) {
          // Gửi updateMessage tới người nhận
          socketRef.current.emit("updateMessage", {
            toUserId: friend.member,
            message: {
              id: messageId,
              conversation_id: friend.id,
              message_type: mediaType,
              content: decodeURIComponent(file.name),
              sender: friend.sender,
              recipient: friend.member,
              timestamp: new Date().toISOString(),
              url: filePath,
            },
          });

          // Gửi sendMessage tới chính người gửi
          socketRef.current.emit("sendMessage", {
            toUserId: friend.sender,
            message: {
              id: messageId,
              conversation_id: friend.id,
              sender: friend.sender,
              recipient: friend.sender,
              content: decodeURIComponent(file.name),
              message_type: mediaType,
              timestamp: new Date().toISOString(),
              url: filePath,
            },
          });
        }

        try {
          await axios.post("http://localhost:5000/api/chat/send-message/", {
            id: messageId,
            conversationId: friend.id,
            sender: friend.sender,
            content: decodeURIComponent(file.name),
            message_type: mediaType,
            timestamp: new Date().toISOString(),
            recipient: friend.member,
            url: filePath,
          });
        } catch (messageError) {
          console.error("Lỗi gửi tin nhắn:", messageError);
        }
      }
    } catch (uploadError) {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              uploading: false,
              error: true,
              isTemporary: false,
            };
          }
          return msg;
        })
      );
      alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
    }
  };

  return { handleSend, handleMediaSelect };
};

export default useChatActions;