import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'WanderNest-Tours',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({
  storage,
  limits: { files: 1 }, 
}).single('image'); 


upload.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('File uploaded successfully:', req.file);
    next();
  } catch (err) {
    console.error('Error uploading file:', err);
    return res.status(500).json({ message: 'Error uploading file' });
  }
};

export default upload;
