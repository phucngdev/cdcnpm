const messageRoutes = require("express").Router();
const messageController = require("../controllers/message.controller");

messageRoutes.get("/", messageController.getAllUser);
messageRoutes.get("/:room_id/:created_at", messageController.getMessageUser);
messageRoutes.post("/:id", messageController.sendMessage);

module.exports = { messageRoutes };
