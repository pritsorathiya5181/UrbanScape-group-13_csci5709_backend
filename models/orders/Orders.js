const mongoose = require('mongoose')

const OrderItemSchema = new mongoose.Schema(
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
        professionalName : {type: String, default: null},
        orderItemStatus : {type: String, default: "Pending"}
    },
    { timestamps: true }
)

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: Number, required: true, unique: true },
    userName: { type: String, required: true },
    orderAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    taxAmount: { type: String ,  default: 0 },
    orderDetails: { type: [OrderItemSchema]}
  },
  { timestamps: true }
)

module.exports = mongoose.model('Orders', OrderSchema)
