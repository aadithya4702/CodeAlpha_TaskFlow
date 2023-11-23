const express = require("express");
const router = express.Router();
const {
  createUser,
  loginactivity,
  getProfile,
  validateotp,
} = require("../controllers/appcontroller");
const {
  getmytask,
  createtask,
  editmytask,
  taskdesciption,
  searchtasks,
} = require("../controllers/taskcontroller");



router.post("/", createUser);
router.post("/login", loginactivity);
router.get("/profile", getProfile);
router.post("/otpvalidation", validateotp);

router.post("/addtask", createtask);
router.post("/editmytask", editmytask);
router.post("/getmytask", getmytask);



router.get("/:taskId", taskdesciption);
router.post("/search", searchtasks);

module.exports = router;
