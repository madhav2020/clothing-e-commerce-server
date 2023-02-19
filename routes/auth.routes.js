const express = require("express");
const { signup, login } = require("../controller/auth.controller");
const { who_am_i } = require("../controller/authorization.controller");

const auth_routes = express.Router();

auth_routes.post("/signup", signup);
auth_routes.post("/login", login);
auth_routes.get("/who_am_i", who_am_i);
// auth_routes.post("forgot_password", login);
// auth_routes.post("/reset_password", login);

module.exports = auth_routes;
