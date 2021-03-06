import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloud = (exports.uploadToCloud = function (filename: string) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(filename, function (result: any) {
      resolve({ url: result.secure_url, public_id: result.public_id });
    });
  });
});

exports.deleteFromCloud = function (publicID: string) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicID, function (result) {
      resolve(result);
    });
  });
};

exports.multipleUpload = async function (filenames = []) {
  try {
    const result = await Promise.all(filenames.map(uploadToCloud));
    return result;
  } catch (error) {
    throw error;
  }
};
