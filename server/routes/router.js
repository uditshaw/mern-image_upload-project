// Used for creating an api for user registration
const express = require("express");
const router = new express.Router();
const multer = require("multer");
const users = require("../model/userSchema");
const moment = require("moment");

// Image storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// Image filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only image files can be uploaded"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

router.post("/register", upload.single("photo"), async (req, res) => {
  const { filename } = req.file;
  const { fname } = req.body;

  if (!fname || !filename) {
    res.status(401).json({ status: 401, message: "Please fill all details" });
  }
  try {
    const date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");

    const userdata = new users({
      fname: fname,
      imgpath: filename,
      date: date,
    });

    const finalData = await userdata.save();

    res.status(201).json({ status: 201, finalData });
  } catch (error) {
    res.status(401).json({ status: 401, message: "Inside Try-catch error" });
  }
});

// User data get on Homepage
router.get("/getData", async (req, res) => {
  try {
    const getUser = await users.find();

    res.status(201).json({ status: 201, getUser });
  } catch (error) {
    res.status(401).json({ status: 401, error: error.message });
  }
});

module.exports = router;
