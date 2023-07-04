const Order = require("../models/order");

const newOrder = async (req, res) => {
  try {
    const { userId, orderDetails, shippingInfo, totalPrice } = req.body;

    const newOrder = await new Order({
      userId,
      status: "pending",
      orderDetails,
      shippingInfo,
      totalPrice,
      deliveredAt: "not yet",
    });

    await newOrder.save();

    res.status(201).json({ message: "Order submitted successfully", newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Order submission failed", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

const updateStatus = async (req, res) => {
  try {
    const { orderID, status } = req.body;

    const order = await Order.findOne({ _id: orderID });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    order.deliveredAt = Date.now;
    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};

module.exports = { newOrder, updateStatus, getAllOrders };
