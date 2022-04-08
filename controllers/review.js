const Reviews = require('../models/reviews/Review') 

exports.addReview= async (req,res,next)=>{

    const newRating = await new Reviews({
        firstname: req.body.firstname,
        review: req.body.review,
        ratings: req.body.ratings,
      })

      try {
        const result = await newRating.save()
        const successResponse = {
          message: 'Review added successfully',
          success: true,
          result,
        }
        res.status(201).json(successResponse)
      } catch (err) {
        console.log(err)
        const errorResponse = {
          message: 'Review add failed',
          success: false,
        }
        res.status(500).json(errorResponse)
      }

}

exports.displayReview = async(req,res,next)=>{
    try {
        const result = await Reviews.find({})
        const successResponse = {
          result
        }
        res.status(201).json(successResponse)
      } catch (err) {
        console.log(err)
        const errorResponse = {
          message: 'Review add failed',
          success: false,
        }
        res.status(500).json(errorResponse)
      }

}