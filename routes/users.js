const express = require("express");
const router = express.Router();

// Sample route for users
router.get("/", (req, res) => {
  res.json({ message: "User route" });
});

module.exports = router;
