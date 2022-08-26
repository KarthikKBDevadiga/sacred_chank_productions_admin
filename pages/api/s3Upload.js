import aws from "aws-sdk";

export default async function s3Upload(req, res) {
  aws.config.update({
    region: process.env.S3_UPLOAD_REGION,
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
  });

  const s3Bucket = process.env.S3_UPLOAD_BUCKET;

  const s3 = new aws.S3(); // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  const folder = req.body.folder;

  const s3Params = {
    Bucket: s3Bucket,
    Key: folder + "/" + fileName,
    ContentType: fileType,
    ACL: "public-read",
  };

  try {
    s3.getSignedUrl("putObject", s3Params, async (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      }
      const returnData = {
        signedRequest: data,
        url: `https://${s3Bucket}.s3.amazonaws.com/${folder}/${fileName}`,
      };

      return res.status(200).json(returnData);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
}
