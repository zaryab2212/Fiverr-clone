const multer = require("multer");

// const storage = multer.memoryStorage();

// singleUpload = multer({ storage }).fields([
//   { name: "file", maxCount: 1 },
//   { name: "files", maxCount: 6 },
// ]);

// const storage = multer.diskStorage({
//   // destination: (req, file, cb) => {
//   //   cb(null, "uploads/");
//   // },
//   filename: (req, file, cb) => {
//     const ext = file.originalname.split(".").pop(); // Get file extension
//     const filename = file.originalname.split(".").shift(); // Get filename without extension
//     cb(null, `${filename}-${Date.now()}.${ext}`); // Concatenate filename with timestamp and extension
//   },
// });
