const jwt = require("jsonwebtoken");
const jwtSecret = "abc123";
const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret);
};
const jwtAuth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, jwtSecret);
    req.userData = decode;
    next();
  } else {
    res.status(401).json({ error: "unauthorized" });
  }
};
module.exports = { jwtAuth, generateToken };
