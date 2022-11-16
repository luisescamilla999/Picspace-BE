const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
const token = req.headers['token'] || req.query.token || req.body.token;

 if (!token || token === "") {
    req.isAuth = false;
    return res.status(403).json({
        message: "No existe token",
    });
  }

  try {
    let decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.duser = decoded.user;
    req.isAuth = true;
    return next();
  } catch (error) {
    return res.status(403).json({
        message: "Usuario no autorizado",
    });
  }
};