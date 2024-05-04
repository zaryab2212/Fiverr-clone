const express = require("express");
const {
  getSingleConversation,
  getConversation,
  updateConversation,
  createConversation,
} = require("../controllers/conversation");
const router = express.Router();

router.get("/:id", getSingleConversation);
router.get("/", getConversation);
router.put("/:id", updateConversation);
router.post("/create", createConversation);

module.exports = router;
