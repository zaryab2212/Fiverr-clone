const express = require("express");
const { deleteUser } = require("../controllers/user");
const { authorized } = require("../Middlewares/auth");
const router = express.Router();

router.delete("/:id", authorized, deleteUser);

module.exports = router;
