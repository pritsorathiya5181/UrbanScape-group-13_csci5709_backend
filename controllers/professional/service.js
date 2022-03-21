const mongoose = require('mongoose')
const Service = require('../../models/professional/Service')
const { v4: uuidv4 } = require('uuid')

exports.addService = async (req, res, next) => {
  var id = mongoose.Types.ObjectId()

  const newService = new Service({
    serviceId: req.body.serviceId,
    serviceCategory: req.body.serviceCategory,
    serviceCost: req.body.serviceCost,
    serviceImage: req.body.serviceImage,
    serviceLocation: req.body.serviceLocation,
    serviceDescription: req.body.serviceDescription,
    userId: uuidv4(),
  })

  try {
    const savedService = await newService.save()
    const successResponse = {
      message: 'Service added successfully',
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

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find()
    if (services.length > 0) {
      const successResponse = {
        message: 'Services fetched successfully',
        success: true,
        services: services,
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

exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findOne({ serviceId: req.params.serviceId })

    if (service) {
      const successResponse = {
        message: 'Service fetched successfully',
        success: true,
        service: service,
      }
      res.status(200).json(successResponse)
    } else {
      const errorResponse = {
        message: 'No Service found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (error) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

exports.updateService = async (req, res, next) => {
  try {
    let params = req.body
    for (let prop in params) if (!params[prop]) delete params[prop]

    const service = await Service.findOneAndUpdate(
      { serviceId: req.params.serviceId },
      {
        $set: req.body,
      },
      { new: true }
    )

    if (service) {
      const successResponse = {
        message: 'Service updated successfully',
        success: true,
        service: service,
      }
      res.status(200).json(successResponse)
    } else {
      const errorResponse = {
        message: 'No Service found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (error) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findOneAndDelete({
      serviceId: req.params.serviceId,
    })

    if (service) {
      const successResponse = {
        message: 'Service deleted successfully',
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
  } catch (error) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}
