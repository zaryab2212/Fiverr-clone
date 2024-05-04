const express = require("express");
const {
  CreateReview,
  getReviews,
  DeleteReview,
} = require("../controllers/review");
const router = express.Router();

router.post("/create", CreateReview);
router.get("/:gigId", getReviews);
router.delete("/:id", DeleteReview);

module.exports = router;
