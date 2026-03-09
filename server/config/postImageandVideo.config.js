import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "video") {
      return {
        folder: "postvideos",
        resource_type: "video",
        allowed_formats: ["mp4", "mov", "avi", "webm"],
      };
    }

    if (file.fieldname === "thumbnail") {
      return {
        folder: "postimage",
        resource_type: "image",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
      };
    }
  },
});

const postImageandVideo = multer({ storage });

export default postImageandVideo;
