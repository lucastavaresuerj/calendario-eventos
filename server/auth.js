const jwt = require("jsonwebtoken");
const { checkBlackList } = require("./blackList");

const { JWT_SECRET } = process.env;

function signIn(userId) {
  return jwt.sign(userId, JWT_SECRET, { expiresIn: 60 * 60 });
}

function verify(req, res, next) {
  const token = req.headers["x-access-token"];
  const { owner } = req.headers;
  try {
    if (checkBlackList(token)) {
      throw new Error("Token não é mais válido");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (owner != decoded.id) {
      throw new Error("id de usuário diferente do decodificado");
    }
  } catch (error) {
    res.status(401).send({ err: "Usuário não autenticado" });
  }
  next();
}

module.exports = { signIn, verify };
