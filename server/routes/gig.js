const express = require("express");
const {
  fetchAllGigs,
  deleteGig,
  fetchSingleGig,
  createGig,
} = require("../controllers/gig");
const { singleUpload } = require("../Middlewares/multer");
const { authorized } = require("../Middlewares/auth");
const router = express.Router();

router.get("/", fetchAllGigs);
router.get("/:id", fetchSingleGig);
router.delete("/:id", authorized, deleteGig);
// router.post("/create", singleUpload, createGig);

module.exports = router;
