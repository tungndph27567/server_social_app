const userRouter = require("./userRouter");
const newPostRouter = require("./newPostRouter");
const chatRouter = require("./chatRouter");
const router = (app) => {
  app.use("/user", userRouter);
  app.use("/newPost", newPostRouter);
  app.use("/chat", chatRouter);
};

module.exports = router;
