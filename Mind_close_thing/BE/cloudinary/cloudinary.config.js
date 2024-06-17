// const cloudinary = require("cloudinary").v2

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });

// const uploadImage = async (file) => {
//     const newFileName = `${new Date().getTime()}-${file.name}`
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream({ resource_type: "image", filename_override: `${newFileName}`, use_filename: true, unique_filename: false }, (err) => reject(err)).end(file?.data, () => resolve(newFileName));
//     })

// };

// module.exports = {
//     uploadImage
// }


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // lấy ảnh và lưu ảnh
const multer = require('multer'); // lưu file và upload file

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: "CuaHangMind"
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
