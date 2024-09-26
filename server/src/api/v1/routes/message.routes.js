const messageRoutes = require("express").Router();
const messageController = require("../controllers/message.controller");

messageRoutes.get("/", messageController.getAllUser);
messageRoutes.get("/:id", messageController.getMessageUser);
messageRoutes.post("/", messageController.sendMessage);

module.exports = { messageRoutes };
