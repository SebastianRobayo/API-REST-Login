const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {
    if (!req.body.userID || req.body.userID.length < 3) {
      return res.status(400).send({
        msg: "Por favor ingrese el usuario con almenos 3 caracteres",
      });
    }

    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: "Por favor ingrese el contraseña con almenos 6 caracteres",
      });
    }

    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: "Ambas contraseñas deben coincidir",
      });
    }

    next();
  },
};
