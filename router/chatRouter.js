const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
router.get("/getMessage/:receiverId/:senderId", chatController.getMessage);
router.get("/getMyConversation/:myId", chatController.getMyConversation);
router.post("/sendMessage/:receiverId", chatController.sendMessage);
router.post(
  "/updateStatusReceiver/:receiverId/:senderId",
  chatController.updateStatusReceiver
);

module.exports = router;
