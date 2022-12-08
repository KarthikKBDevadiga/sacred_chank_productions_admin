const { default: axios } = require('axios');

const getFileType = (extenstion) => {
  switch (extenstion) {
    case 'html':
    case 'htm':
    case 'shtml':
      return 'text/html';
    case 'css':
      return 'text/css';
    case 'xml':
      return 'text/xml';
    case 'gif':
      return 'image/gif';
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'wbmp':
      return 'image/vnd.wap.wbmp';
    case 'js':
      return 'application/x-javascript';
    case 'ico':
      return 'image/x-icon';
    case 'tif':
    case 'tiff':
      return 'image/tiff';
    case 'jng':
      return 'image/x-jng';
    case 'bmp':
      return 'image/x-ms-bmp';
    case 'svg':
      return 'image/svg+xml';
    case 'webp':
      return 'image/webp';
  }
};
const s3FileUpload = async (file, folder) => {
  let fileParts = file.name.split('.');
  let fileName = fileParts[0];
  let fileType = getFileType(fileParts[1]);
  const s3Bucket = process.env.S3_UPLOAD_BUCKET;

  const data = await axios
    .post('/api/s3Upload', {
      fileName: fileName + new Date().getTime() + '.' + fileType,
      fileType: fileType,
      folder: folder,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });

  var options = {
    headers: {
      'Content-Type': fileType,
    },
  };
  const results = await axios
    .put(data.signedRequest, file, options)
    .then((res) => res)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
module.exports = s3FileUpload;
