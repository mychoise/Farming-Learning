import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "video") {
      return {
        folder: "videos",
        resource_type: "video",
        allowed_formats: ["mp4", "mov", "avi", "webm"],
      };
    }

    if (file.fieldname === "thumbnail") {
      return {
        folder: "thumbnails",
        resource_type: "image",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
      };
    }
  },
});

const upload = multer({ storage });

export default upload;
