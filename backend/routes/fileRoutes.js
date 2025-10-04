

const express = require("express");
const router = express.Router();
const { functionx } = require("../controllers/fileController");

router.post("/all-file", functionx);

module.exports = router;