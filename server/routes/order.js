const express = require("express");
const { createOrder, getOrder } = require("../controllers/order");
const router = express.Router();

router.post("/:id", createOrder);
router.get("/", getOrder);

module.exports = router;
