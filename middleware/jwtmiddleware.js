//to verify the token
const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json("Token missing");
  }

  jwt.verify(token, "superSecretkey123", (err, decoded) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }

    req.userId = decoded.userId; // ⭐ IMPORTANT
    next();
  });
};

module.exports = jwtMiddleware;
