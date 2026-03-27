import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "disease_detection", // folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"],
  },
});
const upload = multer({ storage });
export default upload;
