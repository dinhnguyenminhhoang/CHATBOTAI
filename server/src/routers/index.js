"use strict";
const express = require("express");
const userRoutes = require("./user.routes");
const chatRoutes = require("./chat.routes");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/chat", chatRoutes);

module.exports = router;
