const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/image", upload.single("image"), (req, res) => {
  console.log(req.file);
  if (!req.file) {
    res.send({ code: 500, msg: "Error" });
  } else {
    res.send({ code: 200, msg: "upload successful" });
  }
});

app.listen(2000, () => {
  console.log("Server Running on PORT 2000");
});
