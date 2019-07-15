import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
});
const storage = cloudinaryStorage({
  cloudinary,
  folder: 'articles',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

const configuration = multer({ storage }).single('file');

export default configuration;
