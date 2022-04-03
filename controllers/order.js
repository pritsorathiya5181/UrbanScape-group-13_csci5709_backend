/*  Author: Prit Ajaykumar Sorathiya - B00890175 - approve service, cancel service  */
/*  Author: Aeshna Verma - B00880776 - submit order  */

const Order = require('../models/orders/Orders')
const nodemailer = require('nodemailer')

// fetch all orders for handling service requests
exports.fetchOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()

    if (orders.length > 0) {
      req.orders = orders
      next()
    } else {
      const errorResponse = {
        message: 'No services found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

exports.getAllOrders = async (req, res, next) => {
  const query = req.query.new
  try {
    const orders = query
      ? await Order.find().sort({ _id: -1 }).limit(5)
      : await Order.find()

    if (orders.length > 0) {
      const successResponse = {
        message: 'Orders fetched successfully',
        success: true,
        orders: orders,
      }
      res.status(200).json(successResponse)
    } else {
      const errorResponse = {
        message: 'No Orders found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

// approve service request
exports.approveServiceRequest = async (req, res, next) => {
  const { orderId } = req.params
  const {
    itemNo,
    clientName,
    clientEmail,
    serviceCategory,
    serviceName,
    professionalName,
  } = req.body

  let isChanged = false
  try {
    const order = await Order.findOne({ orderId: orderId })
    if (order) {
      order.orderDetails = order.orderDetails.map((order, index) => {
        if (order.itemNo.toString() === itemNo.toString()) {
          {
            isChanged = true
            var orderResponse = JSON.parse(JSON.stringify(order))
            orderResponse.orderItemStatus = 'Approved'
            orderResponse.professionalName = professionalName
            return orderResponse
          }
        }
        return order
      })

      if (isChanged) {
        await order.save()

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.email || 'fresky.france@gmail.com',
            pass: process.env.pass || 'mynameisprit@5181',
          },
        })

        var mailOptions = {
          from: process.env.email,
          to: clientEmail,
          subject: `Order ${orderId} status has changed`,
          html: `<!DOCTYPE html>
          <html>
          <body>
          
          <h2>UrbanScape</h2>
          <p>Thank you for booking our service</p>
          <p>Hey! ${clientName}, your request has been accepted, and our professional will visit you at home at the time you specified.</p>
          <p>Service and Professional Details:</p>
          <ul>
            <li>Professional: <i>${professionalName}</i></li>
              <li>Service Category: <i>${serviceCategory}</i></li>
              <li>Service Name: <i>${serviceName}</i></li>
          </ul>
          
          </body>
          </html>
          `,
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log('Email sending error: ', error)
            const errorResponse = {
              message: 'No Service found',
              success: false,
            }
            res.status(404).json(errorResponse)
          } else {
            const successResponse = {
              message: 'Service Approved! Email sent to client',
              success: true,
            }
            res.status(200).json(successResponse)
          }
        })
      } else {
        const errorResponse = {
          message: 'No Service found',
          success: false,
        }
        res.status(404).json(errorResponse)
      }
    } else {
      const errorResponse = {
        message: 'No Service found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

// cancel service request
exports.cancelServiceRequest = async (req, res, next) => {
  const { orderId } = req.params
  const { itemNo, professionalName } = req.body

  let isChanged = false
  try {
    const order = await Order.findOne({ orderId: orderId })
    if (order) {
      order.orderDetails = order.orderDetails.map((order, index) => {
        if (order.itemNo.toString() === itemNo.toString()) {
          {
            isChanged = true
            var orderResponse = JSON.parse(JSON.stringify(order))
            //  this below logic will be added later

            // orderResponse.professionalName =
            //   orderResponse.professionalName.concat(' ', professionalName)

            orderResponse.orderItemStatus = 'Cancelled'
            return orderResponse
          }
        }
        return order
      })

      if (isChanged) {
        await order.save()
        const successResponse = {
          message: 'Service Rejected ',
          success: true,
        }

        res.status(200).json(successResponse)
      } else {
        const errorResponse = {
          message: 'No Service found',
          success: false,
        }
        res.status(404).json(errorResponse)
      }
    } else {
      const errorResponse = {
        message: 'No Service found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}


exports.submitOrder = async (req, res, next) => {
     
  const newOrder = new Order({
    orderId: req.body.orderId,
    userName: req.params.user,
    orderAmount :req.body.orderAmount,
    discountAmount : req.body.discountAmount,
    taxAmount: req.body.taxAmount,
    orderDetails:  req.body.orderDetails
  })

  try {
    const savedOrder = await newOrder.save()
    const successResponse = {
      message: 'Order submitted successfully',
      success: true,
    }
    res.status(201).json(successResponse)
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}
