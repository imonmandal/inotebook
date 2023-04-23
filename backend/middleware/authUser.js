const jwt = require("jsonwebtoken");
const JWT_SECRET = "ek mei aur ek tu dono mile is tarah";

const authUser = (req, res, next) => {
  // Get the user from jwt token and add id to the req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = authUser;
