const bcrypt = require("bcryptjs");
const { User } = require("../models/");

class Controller {
  static home(req, res) {
    const {user} = req.session
    res.render("home", {user});
  }

  static login(req, res) {
    const { error } = req.query;
    res.render("login", { error });
  }

  static loginPost(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.redirect('/login?error=Please fill all fields')
    }

    User.findOne({
      where: {
        email,
      },
    }).then((foundUser) => {
      if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
        res.redirect('/login?error=Incorrect email/password')
      } else {
        req.session.user = {
          id: foundUser.id,
          username: foundUser.username,
        }

        if (!foundUser.ProficiencyId) {
          res.redirect(`/prompt/${foundUser.id}`);
        } else {
          res.redirect(`/courses/${foundUser.id}?prof=${foundUser.ProficiencyId}`);
        }
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
