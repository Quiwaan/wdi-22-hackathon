const express = require("express");
const router = express.Router();
const db = require("../models ");

router.post("/stores", (req, res) => {
  db.Store.find();
});

module.exports = router;
