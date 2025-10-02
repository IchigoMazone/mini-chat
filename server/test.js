// const fs = require('fs');
// const path = require('path');

// function readJson(filePath) {
//   const raw = fs.readFileSync(filePath, 'utf-8');
//   return JSON.parse(raw);
// }

// function readJsonFromBottom(filePath, conversationId) {
//   const data = readJson(filePath);

//   if (!Array.isArray(data)) {
//     return data;
//   }

//   return data
//     .slice()
//     .reverse()
//     .filter((mes) => {
//       return (
//         (mes.message_type === 'file' ||
//         mes.message_type === 'video' ||
//         mes.message_type === 'image' ||
//         (mes.message_type === 'text' && 
//         typeof mes.content === 'string' &&
//         /(https?:\/\/[^\s]+)/.test(mes.content)))
//         && mes.conversation_id === conversationId
//     )})
//     .map(message => ({
//       type: message.message_type,
//       url: message.url,
//       time: message.timestamp,
//       content: message.content
//     }));
// }

// function readImageorVideo(object) 
// {
//     const data = readJsonFromBottom(
//         path.join(__dirname, 'models', 'message.json'),
//         object
//     )
//     return data
//     .filter((mes) => mes.type === 'video' || mes.type === 'image')
//     .map((mes) => {
//         return {
//             type : mes.type,
//             url : mes.url,
//         }
//     })
// }

// function readFile(object)
// {
//     const data = readJsonFromBottom(
//         path.join(__dirname, 'models', 'message.json'),
//         object
//     )
//     return data
//     .filter((mes) => mes.type === 'file')
//     .map((mes) => {
//         return {
//             content : mes.content,
//             url : mes.url
//         }
//     })
// }

// function readUrlContent(object)
// {
//     const data = readJsonFromBottom(
//         path.join(__dirname, 'models', 'message.json'),
//         object
//     )

//     return data
//     .filter((mes) => mes.type === 'text')
//     .map((mes) => ({
//       link: mes.content.match(/https?:\/\/[^\s]+/g)
//     }))
// }

// const fpath = path.join(__dirname, 'models', 'message.json')
// const data = readUrlContent('ctc_2')
// console.log(data);
// const datax = readFile('ctc_2')
// console.log(datax)
// const datay = readImageorVideo('ctc_2')
// console.log(datay)




const fs = require('fs');
const path = require('path');

// -------------------- Đọc file JSON --------------------
function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

// -------------------- Lấy size file và format MB/KB --------------------
function formatFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    if (bytes >= 1024 * 1024) {
      return +(bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return +(bytes / 1024).toFixed(2) + ' KB';
    }
  } catch (err) {
    return null; // file không tồn tại hoặc là remote URL
  }
}

// -------------------- Duyệt JSON 1 lần --------------------
function readConversationData(conversationId) {
  const filePath = path.join(__dirname, 'models', 'message.json');
  const data = readJson(filePath);

  if (!Array.isArray(data)) return { textLinks: [], files: [], imagesVideos: [] };

  const textLinks = [];
  const files = [];
  const imagesVideos = [];

  // Duyệt từ dưới lên
  const messages = data.slice().reverse().filter(m => m.conversation_id === conversationId);

  for (const mes of messages) {
    const { message_type, content, url, timestamp } = mes;

    // ---- Text links ----
    if (message_type === 'text' && typeof content === 'string') {
      const links = content.match(/https?:\/\/[^\s]+/g);
      if (links) {
        links.forEach(link => textLinks.push({ link, date: timestamp }));
      }
    }

    // ---- File ----
    else if (message_type === 'file') {
      let size = null;
      if (url && typeof url === 'string' && !url.startsWith('http')) {
        // file local → lấy size
        size = formatFileSize(path.join(__dirname, url));
      }

      // Lấy đuôi file từ content
      let ext = '';
      if (typeof content === 'string') {
        ext = path.extname(content).replace('.', '').toLowerCase() || 'unknown';
      }

      files.push({
        content,
        url,
        type: ext,   // type = đuôi file
        size,
        date: timestamp
      });
    }

    // ---- Image / Video ----
    else if (message_type === 'image' || message_type === 'video') {
      imagesVideos.push({
        type: message_type,
        url,
        date: timestamp
      });
    }
  }

  return { textLinks, files, imagesVideos };
}

// -------------------- Test --------------------
const conversationId = 'ctc_2';
const result = readConversationData(conversationId);

console.log('Text links:', result.textLinks);
console.log('Files:', result.files);
console.log('Images/Videos:', result.imagesVideos);
