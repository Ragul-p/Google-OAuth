const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const { getLogin, getDashboard } = require("../controller/index");



router.get("/", ensureGuest, getLogin);
router.get("/dashboard", ensureAuth, getDashboard);

module.exports = router;