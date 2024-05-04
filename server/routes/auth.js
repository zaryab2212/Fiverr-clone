const express = require("express");
const {
  userRegister,
  userLogin,
  userLogOut,
  userInfo,
} = require("../controllers/auth");
const multer = require("multer");
const upload = multer().none();
const { authorized } = require("../Middlewares/auth");
// const { upload } = require("..");
const router = express.Router();

router.post("/register", upload, userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogOut);
router.get("/userinfo", authorized, userInfo);

module.exports = router;
