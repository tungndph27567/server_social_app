const chat = require("../models/chat");
class chatController {
  async getMessage(req, res) {
    try {
      const { receiverId, senderId } = req.params;
      const objU = await chat.findOne({
        $or: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      });
      if (objU) {
        res.json(objU);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getMyConversation(req, res) {
    try {
      const { myId } = req.params;
      const objChat = await chat
        .find({
          $or: [
            {
              senderId: myId,
            },
            {
              receiverId: myId,
            },
          ],
        })
        .sort({ date: -1 });
      if (objChat) {
        res.json(objChat);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async sendMessage(req, res) {
    try {
      const { receiverId } = req.params;
      const { senderId, content, date } = req.body;
      const objC = await chat.findOne({
        $or: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      });
      if (objC) {
        objC.message.push({ content, date, idUser: senderId });
        objC.statusReceiver = receiverId;
        await objC.save();
      } else {
        const objChat = new chat();
        objChat.senderId = senderId;
        objChat.receiverId = receiverId;
        objChat.avatarReceiver = req.body.avatarReceiver;
        objChat.avatarSender = req.body.avatarSender;
        objChat.nameReceiver = req.body.nameReceiver;
        objChat.nameSender = req.body.nameSender;
        objChat.status = receiverId;
        objChat.date = req.body.date;
        objChat.statusReceiver = receiverId;
        objChat.message.push({ content, date, idUser: senderId });
        await objChat.save();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async updateStatusReceiver(req, res) {
    const { receiverId, senderId } = req.params;
    try {
      const objChat = await chat.findOne({
        $or: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      });
      if (objChat) {
        objChat.statusReceiver = "";
        await objChat.save();
        console.log(true);
      } else {
        console.log(false);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
}
module.exports = new chatController();
