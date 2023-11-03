const user = require("../models/user");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // su dung thu vien doc file env:   npm install dotenv --save
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
class UserController {
  async register(req, res) {
    let msg = "";
    try {
      if (req.body.email == "") {
        msg = "Email khong duoc trong";
        console.log(msg);
        res.json({ status: false, msg: msg });
        return;
      } else if (req.body.password == "") {
        msg = "Mat khau khong duoc de trong";
        console.log(msg);
        res.json({ status: false, msg: msg });
        return;
      } else if (req.body.confirmpPassword == "") {
        msg = "Nhac lai mat khau khong duoc de trong";
        console.log(msg);
        res.json({ msg: msg });
        return;
      } else if (req.body.password !== req.body.confirmpPassword) {
        msg = "Xác nhận password không đúng";
        console.log(msg);
        res.json({ status: false, msg: msg });
        return;
      }
      const objU = await user.findOne({ email: req.body.email });
      if (objU) {
        msg = "Email da ton tai";
        console.log(msg);
        res.json({ status: false, msgEmail: msg });
      } else {
        const objU = new user();
        objU.email = req.body.email;
        objU.avatar = req.body.avatar;
        objU.name = req.body.name;
        const salt = await bycrypt.genSalt(15);
        objU.password = await bycrypt.hash(req.body.password, salt);
        const token = jwt.sign(
          { _id: objU._id, email: objU.email },
          chuoi_ky_tu_bi_mat
        );
        objU.token = token;
        res.json({ status: true, token: token });
        await objU.save();
      }
    } catch (error) {
      msg = "Lỗi: " + error.message;
      console.log(msg);
    }
  }
  async login(req, res) {
    const { email } = req.body;
    try {
      const objU = await user.findOne({ email });
      if (!objU) {
        res.json({ status: false });
      } else {
        const isPasswordMatch = await bycrypt.compare(
          req.body.password,
          objU.password
        );
        if (!isPasswordMatch) {
          res.json({ status: false });
        } else {
          const token = jwt.sign(
            { _id: objU._id, name: objU.name, avatar: objU.avatar },
            chuoi_ky_tu_bi_mat
          );
          objU.token = token;
          await objU.save();
          res.json({ status: true, token: token });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async logout(req, res) {
    try {
      const objU = await user.findOne({ token: req.body.token });
      if (objU) {
        objU.token = null;
        await objU.save();
        res.json({ check: true });
      } else {
        res.json({ check: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getAllUser(req, res) {
    try {
      const objU = await user.find({});
      res.json(objU);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getInforUserLogin(req, res) {
    try {
      const objU = await user.findOne({ _id: req.params.id });
      if (objU) {
        res.json(objU);
      } else {
        console.log(false);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getInforUser(req, res) {
    try {
      const objU = await user.findOne({ _id: req.params.id });
      if (objU) {
        res.json(objU);
      } else {
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async addFriend(req, res) {
    try {
      const { idPersionReq } = req.body;
      const objU = await user.findById({ _id: req.params.id });
      objU.friendsRequest.push({ idPersionReq });
      await objU.save();
      res.json({ msg: true });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getListReqAddFriend(req, res) {
    try {
      const objU = await user.findById({ _id: req.params.id });
      const listReqAddFriend = objU.friendsRequest;
      res.json(listReqAddFriend);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async acceptFriendReq(req, res) {
    try {
      const objU = await user.findById({ _id: req.params.id });
      const objU2 = await user.findOne({ _id: req.body.idPersionReq });
      const index = objU.friendsRequest.findIndex(
        (addFriendReq) => addFriendReq.idPersionReq === req.body.idPersionReq
      );
      if (index == -1) {
        console.log("Loi!!!");
      } else {
        objU.friendsRequest.splice(index, 1);
        objU.friends.push({ idUser: req.body.idPersionReq });
        objU2.friends.push({ idUser: req.params.id });
        await objU.save();
        await objU2.save();
        console.log(true);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async getListFriendWhereIdUser(req, res) {
    try {
      const objU = await user.findById({ _id: req.params.id });
      if (objU) {
        res.json(objU.friends);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
}
module.exports = new UserController();
