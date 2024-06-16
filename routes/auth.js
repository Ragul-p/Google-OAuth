const express = require("express");
const passport = require("passport");
const router = express.Router();
const { logout } = require("../controller/auth");



router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", successRedirect: "/dashboard" }));

router.get("/logout", logout);

module.exports = router;