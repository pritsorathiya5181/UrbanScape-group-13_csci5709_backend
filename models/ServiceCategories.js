const mongoose = require('mongoose')

const ServiceCatgoriesSchema = new mongoose.Schema(
    {
        serviceName : {type: String, required: true},
        title : {type: String, required: true},
        desc : {type: String, required: true},
        img : {type: String, required: true},
        price : {type: Number}
    },
    { timestamps: true }
)

const ServiceCategorySchema = new mongoose.Schema(
  {
    serviceCategory : {type: String, required: true},
    categoryDesc : {type: String, required: true},
    categoryImg : {type: String, required: true},
    services: { type: [ServiceCatgoriesSchema]}
  },
  { timestamps: true }
)

module.exports = mongoose.model('serviceCategories', ServiceCategorySchema)
