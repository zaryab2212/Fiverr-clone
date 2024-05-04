const express = require("express");
const { connection } = require("./database/db");
const dotenv = require("dotenv");
const conversationRouter = require("./routes/conversation");
const gigRouter = require("./routes/gig");
const messageRouter = require("./routes/message");
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");
const reviewRouter = require("./routes/review");
const authRouter = require("./routes/auth");
const { authorized } = require("./Middlewares/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createGig } = require("./controllers/gig");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

const server = express();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.originalname.split(".").pop(); // Get file extension     const filename = file.originalname.split(".").shift(); // Get filename without extension
//     cb(null, `${filename}-${Date.now()}.${ext}`); // Concatenate filename with timestamp and extension
//   },
// });

const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 6 },
]);

//Middlewaress
dotenv.config();
server.use(cors({ origin: "http://localhost:5000", credentials: true }));
server.use(express.json());
server.use(cookieParser());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));
server.use(express.static(path.join(__dirname, "build")));

//Routes
// server.post(
//   "/gig/create",
//   authorized,
//   upload.fields([
//     { name: "cover", maxCount: 1 },
//     { name: "picture", maxCount: 5 },
//   ]),
//   createGig
// );
server.post("/gig/create", authorized, singleUpload, createGig);
server.use("/auth", authRouter);
server.use("/user", authorized, userRouter);
server.use("/gig", gigRouter);
server.use("/review", authorized, reviewRouter);
server.use("/order", authorized, orderRouter);
server.use("/conversation", authorized, conversationRouter);

//DataBase//
connection();

const Port = 5000;
server.listen(Port, () => {
  console.log(`server in listening on the post ${Port}`);
});
