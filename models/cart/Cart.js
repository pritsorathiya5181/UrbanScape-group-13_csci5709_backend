const mongoose = require('mongoose')

const CartItemSchema = new mongoose.Schema(
    {
        itemNo : {type: Number, required: true, unique: true},
        serviceCategory : {type: String, required: true},
        serviceName : {type: String, required: true},
        date : {type: String, required: true},
        clientAddress : {type: String, required: true},
        clientName : {type: String, required: true},
        clientContact : {type: String, required: true},
        clientEmail : {type: String, required: true},
        servicePrice : {type: Number},
        specialInstructions : {type: String, default: null}
    },
    { timestamps: true }
)

const CartSchema = new mongoose.Schema(
  {
    cartId: { type: Number, unique: true },
    userName: { type: String, required: true },
    // cartTotalAmount: { type: {type: Number} },
    cartTotalAmount: { type: Number},
    cartDiscountAmount: { type: Number, default: 0 },
    cartTaxAmount: { type: String ,  default: 0 },
    cartItems: { type: [CartItemSchema]}
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', CartSchema)
