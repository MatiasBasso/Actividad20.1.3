const express = require("express");
const mobileRoute = express.Router();
// Importamos los controllers necesarios
const mobileController = require("../controllers/mobileController");

mobileRoute.get("/", mobileController.getUsers);

mobileRoute.get("/:id", mobileController.getUserById);

mobileRoute.post("/", mobileController.createUser);

mobileRoute.put("/:id", mobileController.updateUser);

mobileRoute.delete("/:id", mobileController.deleteUser);

module.exports = mobileRoute;