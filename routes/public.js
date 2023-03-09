const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

const redirectOnLoggedIn = function (req, res, next) {
  if (req.session.hasOwnProperty("user")) {
    res.redirect(`/courses/${req.session.user.id}`);
  } else {
    next();
  }
};

router.get("/", Controller.home);
router.get("/login", redirectOnLoggedIn, Controller.login);
router.post("/login", Controller.loginPost);
router.get("/register", redirectOnLoggedIn, Controller.register);
router.post("/register", Controller.registerPost);

module.exports = router;
