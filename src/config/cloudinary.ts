/* 
  Imports here include filesystem,cloudinary
  (exposed the different methods to call from the module) 
  and constants file to use 
*/
import fs from "fs";
import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";
import constants from "./constants";

/*key-value pair configuration for cloudinary. Getting the value from the constants file */
cloudinary.v2.config({
  cloud_name: constants.CLOUDINARY.NAME,
  api_key: constants.CLOUDINARY.API_KEY,
  api_secret: constants.CLOUDINARY.SECRET_KEY,
});
/*
  uploadToCloud(takes in a parameter of filename in a string format)
  It returns a promise that trys to upload the file to the server
*/
const uploadToCloud = function (filename: string) {
  return new Promise<UploadApiResponse | UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.v2.uploader.upload(
        filename,
        { folder: "MINX/Every", resource_type: "auto" },
        function (err?: UploadApiErrorResponse, result?: UploadApiResponse) {
          if (err) reject(err);
          if (result) resolve(result);
        }
      );
    }
  );
};

const deleteFromCloud = function (publicID: string) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicID, function (result) {
      resolve(result);
    });
  });
};

const multipleUpload = async function (filenames: string[]) {
  try {
    const result = await Promise.all(filenames.map(uploadToCloud));
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteFromServer = function (filename: string) {
  fs.unlinkSync(filename);
};

export { uploadToCloud, deleteFromCloud, multipleUpload, deleteFromServer };
