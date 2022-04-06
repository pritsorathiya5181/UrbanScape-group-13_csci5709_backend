/*  Author: Prit Ajaykumar Sorathiya - B00890175 */

const mongoose = require('mongoose')
const Service = require('../../models/professional/Service')
const { v4: uuidv4 } = require('uuid')

//addservice controller
exports.addService = async (req, res, next) => {
  var id = mongoose.Types.ObjectId()

  const newService = new Service({
    serviceId: req.body.serviceId,
    serviceCategory: req.body.serviceCategory,
    serviceName: req.body.serviceName,
    // serviceCost: req.body.serviceCost,
    serviceImage: req.body.serviceImage,
    serviceLocation: req.body.serviceLocation,
    serviceDescription: req.body.serviceDescription,
    userId: req.body.userId || uuidv4(),
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

//get all the services controller
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

//get all my services controller (for service stats)
exports.fetchAllMyServices = async (req, res, next) => {
  try {
    const services = await Service.find({ userId: req.params.professionalId })
    if (services.length > 0) {
      req.myservices = services
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

//get all my services controller
exports.getAllMyServices = async (req, res, next) => {
  try {
    const services = await Service.find({ userId: req.params.professionalId })
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

//get a service controller
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
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

//update a service controller
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
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

//delete a services controller
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
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

//get my services stats controller
exports.getServiceStats = async (req, res, next) => {
  const myServices = req.myservices.map((service) => service.serviceName)
  const orders = req.orders
  console.log(myServices)

  // pending task: you have req.params.professionalId here, so need to implement
  // get professionalName from the professional table and use it in the
  // Pending Order section, becuase we have to check that that professional
  // has cancelled the services or not.

  const serviceStats = {
    pendingRequests: [],
    approvedRequests: [],
    processedRequests: [],
    cancelledRequests: [],
  }

  orders.forEach((order) => {
    order.orderDetails.forEach((orderDetail) => {
      console.log(orderDetail.serviceName)
      if (myServices.includes(orderDetail.serviceName)) {
        var orderResponse = JSON.parse(JSON.stringify(orderDetail))
        orderResponse.orderId = order.orderId

        if (orderDetail.orderItemStatus === 'Pending') {
          const professionalArr = orderDetail.professionalName?.split(' ')
          const hasProfessional = professionalArr?.filter(
            (name) =>
              name.toLowerCase() === req.params.professionalEmail.toLowerCase()
          )
          console.log(hasProfessional)
          if (hasProfessional?.length > 0) {
            serviceStats.cancelledRequests.push(orderResponse)
            serviceStats.processedRequests.push(orderResponse)
          } else {
            serviceStats.pendingRequests.push(orderResponse)
          }
        } else if (orderDetail.orderItemStatus === 'Approved') {
          serviceStats.approvedRequests.push(orderResponse)
          serviceStats.processedRequests.push(orderResponse)
        } else if (orderDetail.orderItemStatus === 'Cancelled') {
          serviceStats.cancelledRequests.push(orderResponse)
          serviceStats.processedRequests.push(orderResponse)
        }
      }
    })
  })

  const successResponse = {
    message: 'Service stats fetched successfully',
    success: true,
    serviceStats: serviceStats,
  }
  res.status(200).json(successResponse)
}
