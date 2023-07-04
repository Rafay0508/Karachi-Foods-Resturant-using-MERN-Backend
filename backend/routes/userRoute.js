const express = require("express");
const route = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const { registerUser, userLogin } = require("../controllers/userController");
const { newOrder } = require("../controllers/orderController");
const { getAllProduct } = require("../controllers/productController");

route.post("/register", registerUser);
route.post("/login", userLogin);
route.get("/getAllProduct", getAllProduct);
route.post("/order", authMiddleware, newOrder);

module.exports = route;
