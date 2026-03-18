import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (file, userId) => {
  return new Promise((resolve, reject) => {
    const originalName = file.originalname.split(".")[0];
    const cleanFileName = originalName.replace(/[^a-zA-Z0-9]/g, "_");
    const uniquePublicId = `${cleanFileName}_${Date.now()}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // FIX: Changed from "image" to "raw"
        // format: "pdf",     // FIX: Remove this line. "raw" handles the extension automatically
        folder: `resumes/${userId}`,
        public_id: `${uniquePublicId}.pdf`, // FIX: Explicitly add .pdf so Cloudinary saves it as a file
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
};