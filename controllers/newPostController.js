const newPost = require("../models/newPost");
const user = require("../models/user");
class newPostController {
  async getAllNewPost(req, res) {
    try {
      const objP = await newPost.find();
      var listCmt = [];
      for (var i = 0; i < objP.length; i++) {
        listCmt = listCmt.concat(objP[i].comment);
      }
      res.json(listCmt);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getImageFromPost(req, res) {
    try {
      const objP = await newPost.find({ idUser: req.params.id });
      var listImg = [];
      for (var i = 0; i < objP.length; i++) {
        if (objP[i].image != "") {
          listImg = listImg.concat(objP[i].image);
        }
      }
      res.json(listImg);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getAllNewPostWhereIdUser(req, res) {
    try {
      const Posts = await newPost.find({ idUser: req.params.id });

      if (Posts) {
        res.json(Posts);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getCommentWhereIdPost(req, res) {
    try {
      const objP = await newPost.findById({ _id: req.params.id });
      res.json(objP.comment);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getInforPost(req, res) {
    try {
      const objP = await newPost.findById({ _id: req.params.id });
      res.json(objP);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async addNewPost(req, res) {
    try {
      const objP = new newPost(req.body);
      await objP.save();
      res.json({ msg: true });
      console.log("true");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async addComment(req, res) {
    try {
      const { idUserCmt, contentCmt, name, avatar, date } = req.body;
      const objP = await newPost.findById({ _id: req.params.id });
      objP.comment.push({ idUserCmt, contentCmt, name, avatar, date });
      await objP.save();
      return res.json({ msg: true, objP });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getNewPostFromMyFriend(req, res) {
    try {
      const PAGE_SIZE = 5;
      var page = req.query.page;
      const countSkip = (page - 1) * PAGE_SIZE;
      if (page) {
        page = parseInt(page);
        if (page < 1) {
          page = 1;
        }
      }
      const objU = await user.findById({ _id: req.params.id });

      const listFriend = objU.friends;
      const listPost = await newPost.find().skip(countSkip).limit(PAGE_SIZE);
      let newArr = [];
      listPost.map((post) => {
        listFriend.find((friend) => {
          if (post.idUser === friend.idUser) {
            newArr.push(post);
          }
        });
        if (post.idUser == req.params.id) {
          newArr.push(post);
        }
      });
      res.json(newArr);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async likeNewPost(req, res) {
    try {
      const { idUserLike } = req.body;
      const objP = await newPost.findById({ _id: req.params.id });
      objP.like.push({ idUserLike });
      await objP.save();
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async unLikeNewPost(req, res) {
    try {
      const objP = await newPost.findById({ _id: req.params.id });
      const index = objP.like.findIndex(
        (listLike) => listLike.idUserLike === req.body.idUserLike
      );
      // const index = objP.like.findIndex(
      //   (e) => e.idUserLike === req.body.idUserLike
      // );
      if (index == -1) {
        console.log("Loi!!");
      } else {
        objP.like.splice(index, 1);
        await objP.save();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
}
module.exports = new newPostController();
