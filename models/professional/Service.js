/*  Author: Prit Ajaykumar Sorathiya - B00890175 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ServiceSchema = new Schema(
  {
    // serviceId: { type: Schema.Types.ObjectId, required: true },
    serviceId: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    serviceName: { type: String, required: true },
    // serviceCost: { type: String, required: true },
    serviceImage: [{ photoId: Number, isPhoto: Boolean, photoUrl: String }],
    serviceLocation: { type: String, required: true },
    serviceDescription: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Service', ServiceSchema)
