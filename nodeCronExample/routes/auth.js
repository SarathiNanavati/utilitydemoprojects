const express = require("express");
const router = express.Router();
const { subscriber } = require("../controllers/auth.js");

router.post("/subscriber", subscriber);
module.exports = router;
