const express = require("express");
const session = require("express-session");
const router = require("./routes");
const app = express();
const port = process.env.PORT;

app.use(
  session({
    secret: "SECRET_KEY_F_SESSION",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use(express.static('public'))
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
