const Order = require('../models/orders/Orders')

exports.getAllOrders = async (req, res, next) => {
    const query = req.query.new
    try {
      const orders = query
        ? await Order.find().sort({ _id: -1 }).limit(5)
        : await Order.find()
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).json(err)
    }
  }