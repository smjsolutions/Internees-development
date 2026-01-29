const express = require("express");
const { adminLogin } = require("../controllers/adminAuth.controller.js");

const router = express.Router();

router.post("/login", adminLogin);

module.exports = router;
