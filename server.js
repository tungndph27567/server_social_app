const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require("./config/db");
const router = require("./router/index");
db.connection();
router(app);
app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
