const User = require("../models/User");
const crypto = require("crypto");
const router = require("express").Router();

function hash(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

router.post("/login", async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne(
    { name, password: hash(password) },
    "_id name"
  ).exec();
  if (user) {
    res.status(200).send({ id: user._id, name: user.name });
  } else {
    res.send({ err: "Usuário ou senha incorretos" });
  }
});

router.post("/signin", async (req, res, next) => {
  const { name, password } = req.body;
  const findUser = await User.find({ name });
  if (!findUser.length) {
    User.create({ name, password: hash(password) }, (err, { _id, name }) => {
      res.status(200).send({ id: _id, name });
    });
  } else {
    res.send({ err: "O nome de usuário já existe" });
  }
});

router.post("/logout", async (req, res, next) => {});

module.exports = router;
