const express = require("express");
const {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} = require("../controllers/chat.controller.js");
const { chatCompletionValidator, validate } = require("../utils/validators.js");
const { verifyToken } = require("../utils/token-manager.js");

//Protected API
const chatRoutes = express.Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

module.exports = chatRoutes;
