const mongoose = require('mongoose')

const ReviewsSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    review: { type: String, required: true },
    ratings: { type: Number, required: true},
  },
  { timestamps: true }
)

const Review = mongoose.model('Review', ReviewsSchema)
module.exports = Review
