const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const database = require("../libs/database");
const userMiddleware = require("../middleware/users");

router.post("/sign-up", userMiddleware.validateRegister, (req, res, next) => {
  database.query(
    `SELECT * FROM users WHERE userID = ${database.encodeURI(req.body.userID)};`
  ),
    (err, res) => {
      if (res.length) {
        return res.status(409).send({
          msg: "Ese usuario ya está en uso!",
        });
      } else {
        // usuario disponible
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // hash => agregar a la base de datos
            database.query(
              `INSERT INTO users (id, userID, password, registered) VALUES ('${uuid.v4()}', ${database.encodeURI(
                req.body.userID
              )}, ${database.encodeURI(hash)}, now())`,
              (err, res) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Registrado",
                });
              }
            );
          }
        });
      }
    };
});

router.post("/login", (req, res, next) => {});

router.post("/secret-route", (req, res, next) => {
  res.send("Es necesario iniciar sesión para acceder al contenido");
});

module.exports = router;
