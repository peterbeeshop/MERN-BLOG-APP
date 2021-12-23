const userRoute = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//create token
function createNameToken(name) {
  return jwt.sign({ name }, "this is the secret", { expiresIn: 18000 });
}

userRoute.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    userName: req.body.userName,
    password: hashedPassword,
  });
  user
    .save()
    .then((user) => {
      res.send(`${user.userName} has been created`);
    })
    .catch((e) => res.send(e.message));
});
userRoute.post("/login", async (req, res) => {
  User.findOne({ userName: req.body.userName })
    .then(async (user) => {
      const comparedPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (comparedPassword) {
        const token = createNameToken(user.userName);
        res.cookie("userName", token, { maxAge: 18000 * 60 });
        res.send(`${user.userName}`);
      } else if (!comparedPassword) {
        res.send("incorrect password");
      }
    })
    .catch((e) => console.log(e.message));
});

userRoute.get("/logout", (req, res) => {
  res.cookie("userName", "", { maxAge: 1 });
  res.send("cookie removed and logger logged out");
});

module.exports = userRoute;
