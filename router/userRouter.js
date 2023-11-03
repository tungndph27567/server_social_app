const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/SignUp", userController.register);
router.post("/SignIn", userController.login);
router.post("/Logout", userController.logout);
router.get("/getInforuserLogin/:id", userController.getInforUserLogin);
router.get("/getInforUser/:id", userController.getInforUser);
router.get("/getAllUser/", userController.getAllUser);
router.post("/addFriendReq/:id", userController.addFriend);
router.get("/getListReqAddFriend/:id", userController.getListReqAddFriend);
router.post("/acceptFriendReq/:id", userController.acceptFriendReq);
router.get(
  "/getListFriendWhereIdUser/:id",
  userController.getListFriendWhereIdUser
);

module.exports = router;
