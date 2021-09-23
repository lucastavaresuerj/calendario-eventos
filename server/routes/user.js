const crypto = require("crypto");
const router = require("express").Router();

const { signIn } = require("../auth");
const User = require("../models/User");

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
    const token = signIn({ id: user._id });
    res.status(200).json({ token, user: { id: user._id, name: user.name } });
  } else {
    res.send({ err: "Usuário ou senha incorretos" });
  }
  next();
});

router.post("/signin", async (req, res, next) => {
  const { name, password } = req.body;
  const findUser = await User.findOne({ name }).exec();
  if (!findUser) {
    User.create({ name, password: hash(password) }, (err, { _id, name }) => {
      res.status(200).json({ id: _id, name });
    });
  } else {
    res.send({ err: "O nome de usuário já existe" });
  }
  next();
});

router.post("/logout", async (req, res, next) => {});

module.exports = router;
