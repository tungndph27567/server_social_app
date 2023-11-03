const express = require("express");
const router = express.Router();
const newPostCtr = require("../controllers/newPostController");

router.post("/addNewPost", newPostCtr.addNewPost);
router.get("/getAllNewPost", newPostCtr.getAllNewPost);
router.get("/getImageFromPost/:id", newPostCtr.getImageFromPost);
router.get("/getPostWhereId/:id", newPostCtr.getAllNewPostWhereIdUser);
router.post("/addComment/:id", newPostCtr.addComment);
router.get("/getCmt/:id", newPostCtr.getCommentWhereIdPost);
router.get("/getInforPost/:id", newPostCtr.getInforPost);
router.get("/getNewPostFromMyFriend/:id", newPostCtr.getNewPostFromMyFriend);
router.post("/likeNewPost/:id", newPostCtr.likeNewPost);
router.post("/unLikeNewPost/:id", newPostCtr.unLikeNewPost);

module.exports = router;
