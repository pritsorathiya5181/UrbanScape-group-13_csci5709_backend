//Author : Aeshna Verma (B00880776)

const Cart = require('../models/cart/Cart')


exports.getAllCartItems = async (req, res, next) => {

    try {
      // console.log("Get cart items")
      const cartItems = await Cart.findOne({ userName: req.params.user })

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
     
    // console.log("Add to cart ")
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


    try {
      // console.log("Delete cart items")
    const price = req.body.servicePrice
    const itemId = req.body.itemId

    const updatedCart = await Cart.updateOne(

      {userName: req.params.user},

      { $pull: { "cartItems": {itemNo: itemId } },
        $inc: { cartTotalAmount : -price} },
        {  }
      
    )
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

exports.createCart = async (req, res, next) => {
   console.log("Create cart ")

  const cartExists = await Cart.exists({ userName: req.params.user});

  if(cartExists){

    const carExistsResponse = {
      message: 'Cart already exists for this user',
      success: true,
    }
    res.status(201).json(carExistsResponse)
 
}
else{
  const cartId = Date.now()

  const newCart = new Cart({
    cartId: cartId,
    userName: req.params.user,
    cartTotalAmount: 0,
    cartTaxAmount : 0,
    totalCartItems : 0,
    cartItems : []
  })

  try {
    const emptyCart = await newCart.save()
    const successResponse = {
      message: 'Cart created successfully',
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
}
  
exports.emptyCart = async (req, res, next) => {

  try {
  // console.log("Empty cart", req.body.user)
  const zeroAmount = 0
  const updatedCart = await Cart.findOneAndUpdate(
  
    {userName: req.body.user},

    { $set: { 
        cartItems: [],
        cartTotalAmount : 0
      
       }
      
  }
    
  )
    if(updatedCart){
      const successResponse = {
        message: 'cart emptied successfully',
        success: true,
      }
      res.status(200).json(successResponse)
    }
    else {
      const errorResponse = {
        message: 'No cart found',
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
