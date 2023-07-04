const express = require("express");
const route = express.Router();
const adminLogin = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addProduct,
  deleteProduct,
  getAllProduct,
} = require("../controllers/productController");
const {
  updateStatus,
  getAllOrders,
} = require("../controllers/orderController");

route.post("/adminlogin", adminLogin);
route.put("/addProduct", authMiddleware, addProduct);
route.get("/getAllProduct", getAllProduct);
route.delete("/deleteProduct/:id", authMiddleware, deleteProduct);
route.get("/getAllOrders", authMiddleware, getAllOrders);
route.post("/updateStatus", authMiddleware, updateStatus);

module.exports = route;
