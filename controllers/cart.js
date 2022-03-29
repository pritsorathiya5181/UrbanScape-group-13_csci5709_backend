//Author : Aeshna Verma (B00880776)

const Cart = require('../models/cart/Cart')


exports.getAllCartItems = async (req, res, next) => {

    try {

      const cartItems = await Cart.findOne({ userName: req.params.user })
        console.log(req.params.user)
        console.log("cart " , cartItems.length)
      if (cartItems) {
        const successResponse = {
          message: 'Service fetched successfully',
          success: true,
          cart: cartItems,
        }
        res.status(200).json(successResponse)
      } else {
        const errorResponse = {
          message: 'No Service found',
          success: false,
        }
        res.status(404).json(errorResponse)
      }

    }
    catch (error) {
      const errorResponse = {
        message: error,
        success: false,
      }
      res.status(500).json(errorResponse)
    }

  }

  exports.addToCart = async (req, res, next) => {
     
    const userName = {userName : req.params.user}

    Cart.findOneAndUpdate(userName, { 
      $inc: {
        cartTotalAmount : req.body.servicePrice
      },
      $push: {cartItems : [{
      itemNo : req.body.itemNo,
      serviceCategory : req.body.serviceCategory,
      serviceName : req.body.serviceName,
      date : req.body.date,
      time : req.body.time,
      clientAddress :req.body.clientAddress,
      clientName : req.body.clientName,
      clientContact :req.body.clientContact,
      clientEmail : req.body.clientEmail,
      servicePrice : req.body.servicePrice,
      specialInstructions : req.body.specialInstructions
    }]}
  }, {safe: true, upsert: false}, function (err) {
      if(err){
        console.log(err)
      }
      else{
        res.status(200).json('Item has been added...')
       
      }
    })

  }
  
exports.deleteCartItem = async (req, res, next) => {
    console.log(req.body)

    try {
    const price = req.body.servicePrice
    const itemId = req.body.itemId

    console.log( " param " , req.params.user, itemId, price )

    const updatedCart = await Cart.updateOne(

      {userName: req.params.user},

      { $pull: { "cartItems": {itemNo: itemId } },
        $inc: { cartTotalAmount : -price} },
        {  }
      
    )
    // console.log("Upd Cart" , updatedCart)
      if(updatedCart){
        const successResponse = {
          message: 'cartItem deleted successfully',
          success: true,
        }
        res.status(200).json(successResponse)
      }
      else {
        const errorResponse = {
          message: 'No cartItem found',
          success: false,
        }
        res.status(404).json(errorResponse)
    }
  }
    catch(error){
      const errorResponse = {
        message: error,
        success: false,
      }
      res.status(500).json(errorResponse)
    }

}

  