const express = require("express");
const router = express.Router();

// GET all orders
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Orders fetched successfully",
  });
});

// CREATE order
router.post("/", (req, res) => {
  res.json({
    success: true,
    message: "Order created successfully",
  });
});

// UPDATE order
router.put("/:id", (req, res) => {
  res.json({
    success: true,
    message: "Order updated successfully",
  });
});

module.exports = router;