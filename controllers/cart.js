const Cart = require('../models/cart/Cart')

exports.getAllCartItems = async (req, res, next) => {
    const query = req.query.new
    try {
      const cartItems = query
        ? await Cart.find().sort({ _id: -1 }).limit(5)
        : await Cart.find()
      res.status(200).json(cartItems)
    } catch (err) {
      res.status(500).json(err)
    }
  }