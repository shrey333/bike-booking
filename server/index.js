require("dotenv").config();
const express = require("express");
const app = express();
const { mongoose } = require("./models/init.js");
const router = require("./router.js");
const bodyParser = require("body-parser");
const port = process.env.PORT;

app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
