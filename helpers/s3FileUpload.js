const { default: axios } = require("axios");

const s3FileUpload = async (file, folder) => {
  let fileParts = file.name.split(".");
  let fileName = fileParts[0];
  let fileType = fileParts[1];
  const s3Bucket = process.env.S3_UPLOAD_BUCKET;

  const data = await axios
    .post("/api/s3Upload", {
      fileName: fileName + new Date().getTime() + "." + fileType,
      fileType: fileType,
      folder: folder,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });

  var options = {
    headers: {
      "Content-Type": fileType,
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
