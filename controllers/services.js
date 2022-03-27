const mongoose = require('mongoose')
const Service = require('../models/ServiceCategories')
const { v4: uuidv4 } = require('uuid')

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find()
    if (services.length > 0) {
      const successResponse = {
        message: 'Services fetched successfully',
        success: true,
        serviceCategories: services,
      }
      res.status(200).json(successResponse)
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
