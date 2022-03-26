const Cart = require('../models/cart/Cart')


exports.getAllCartItems = async (req, res, next) => {

    try {

      const cartItems = await Cart.findOne({ userName: req.params.user })
        console.log(req.params.user)
        console.log("cart " , cartItems)
      if (cartItems) {
        const successResponse = {
          message: 'Service fetched successfully',
          success: true,
          cartItems: cartItems,
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
       $set:{cartDiscountAmount: 75},
      // $set: {
      //   cartTotalAmount: {
      //     $reduce: {
      //       input: "$cartItems",
      //       initialValue: 0,
      //       in: {
      //         $add: [
      //           `$$value`,
      //           "$$this.servicePrice"
      //         ]
      //       }
      //     }
      //   }
      // },
      $push: {cartItems : [{
      itemNo : req.body.itemNo,
      serviceCategory : req.body.serviceCategory,
      serviceName : req.body.serviceName,
      date : req.body.date,
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
        res.send("New Success")
       
      }
    })
    
    
      // res.send("Successfull")

        // const newCartItem = new Cart({
        //   userName: req.body.userName,
        //   cartItem: req.body.cartItem
        // })
     
        

        // try {
        //   const savedItem = await newCartItem.save()
        //   const successResponse = {
        //     message: 'Service added successfully',
        //     success: true,
        //   }
        //   res.status(201).json(successResponse)
        // } catch (err) {
        //   const errorResponse = {
        //     message: err,
        //     success: false,
        //   }
        //   res.status(500).json(errorResponse)
        // }

  }

  