function loggedInOnly(req, res, next) {
  if (req.session.hasOwnProperty("user")) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = loggedInOnly;
