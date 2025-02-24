// import multer from "multer";

// const storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });

// // instance
// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure 'uploads' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("Saving file to:", uploadDir);
    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    console.log("File saved as:", uniqueName);
    callback(null, uniqueName);
  },
});

// Middleware instance
const upload = multer({ storage });

export default upload;
