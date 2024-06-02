const express = require("express");
const router = express.Router();
const { signin, login } = require("../Controllers/userController");

router.route("/signin").post(signin);
router.route("/login").post(login);

module.exports = router;
