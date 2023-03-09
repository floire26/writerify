const bcrypt = require("bcryptjs");
const { User } = require("../models/");

class Controller {
  static home(req, res) {
    res.render("home");
  }

  static login(req, res) {
    const { error } = req.query;
    res.render("login", { error });
  }

  static loginPost(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send("Wrong email/password");
    }

    User.findOne({
      where: {
        email,
      },
    }).then((foundUser) => {
      if (!bcrypt.compareSync(password, foundUser.password)) {
        res.send("Wrong email/password");
      } else {
        req.session.user = {
          id: foundUser.id,
          username: foundUser.username,
        };
        res.redirect(`/prompt/${foundUser.id}`);
      }
    });
  }

  static register(req, res) {
    res.render("register");
  }

  static registerPost(req, res) {
    const { username, email, password } = req.body;
    User.create({ username, email, password })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static logout(req, res) {
    delete req.session.user;
    res.redirect("/");
  }
}

module.exports = Controller;
