const crypto = require("crypto");
const router = require("express").Router();

const { signIn } = require("../auth");
const { verify } = require("../auth");
const User = require("../models/User");
const { addToBlackList } = require("../blackList");

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
    res.status(401).send({ err: "Usuário ou senha incorretos" });
  }
});

router.post("/signin", async (req, res, next) => {
  const { name, password } = req.body;
  const findUser = await User.findOne({ name }).exec();
  if (!findUser) {
    try {
      User.create({ name, password: hash(password) }, (err, { _id, name }) => {
        const token = signIn({ id: _id });
        res.status(200).json({ token, user: { id: _id, name } });
        return;
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("erro interno");
      return;
    }
  } else {
    res.status(401).send({ err: "O nome de usuário já existe" });
    return;
  }
});

router.post("/logout", verify, async (req, res, next) => {
  const token = req.headers["x-access-token"];
  addToBlackList(token);
  res.status(200).send();
});

router.post("/new-token", verify, async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const { owner } = req.headers;
  addToBlackList(token);
  const newToken = signIn({ id: owner });
  res.status(200).send({ newToken });
});

module.exports = router;
