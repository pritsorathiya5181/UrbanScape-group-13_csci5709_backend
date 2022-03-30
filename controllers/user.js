const Professional = require('../models/professional/Professional')
const User = require('../models/user/User')
const bcrypt = require('bcryptjs')

exports.updateUser = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      {
        $set: req.body,
      },
      { new: true }
    )

    if (updatedUser) {
      const successResponse = {
        message: 'User updated successfully',
        success: true,
        user: updatedUser,
      }
      res.status(200).json(successResponse)
    } else {
      const errorResponse = {
        message: 'No User found',
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

exports.updateProfessionalUser = async (req, res, next) => {
  try {
    const updatedUser = await Professional.findOneAndUpdate(
      { email: req.params.email },
      {
        $set: req.body,
      },
      { new: true }
    )

    if (updatedUser) {
      const successResponse = {
        message: 'Professional updated successfully',
        success: true,
        user: updatedUser,
      }
      res.status(200).json(successResponse)
    } else {
      const errorResponse = {
        message: 'No Professional found',
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

exports.deleteCustomerUser = async (req, res, next) => {
  try {
    const deleteuser = await User.findOneAndDelete({ email: req.params.email })

    if (deleteuser) {
      const successResponse = {
        message: 'User deleted successfully',
        success: true,
      }
      res.status(200).json(successResponse)
    } else {
      const errorResponse = {
        message: 'No User found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (error) {
    const errorResponse = {
      message: error,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

exports.deleteProfessionalUser = async (req, res, next) => {
  try {
    const deleteprofessional = await Professional.findOneAndDelete({
      email: req.params.email,
    })

    if (deleteprofessional) {
      const successResponse = {
        message: 'Professional deleted successfully',
        success: true,
      }
      res.status(200).json(successResponse)
    } else {
      const errorResponse = {
        message: 'No Professional found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (error) {
    const errorResponse = {
      message: error,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

//get a customer by id controller
exports.getCustomerUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email })

    if (user) {
      const { password, ...others } = user._doc
      const successResponse = {
        message: 'User fetched successfully',
        success: true,
        user: others,
      }
      res.status(200).json(successResponse)
    } else {
      const errorResponse = {
        message: 'No User found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (error) {
    const errorResponse = {
      message: error,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

//get a professional by id controller
exports.getProfessionalUser = async (req, res, next) => {
  try {
    const professional = await Professional.findOne({ email: req.params.email })

    if (professional) {
      const { password, ...others } = professional._doc
      const successResponse = {
        message: 'professional fetched successfully',
        success: true,
        user: others,
      }
      res.status(200).json(successResponse)
    } else {
      const errorResponse = {
        message: 'No professional found',
        success: false,
      }
      res.status(404).json(errorResponse)
    }
  } catch (error) {
    const errorResponse = {
      message: error,
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

exports.getAllUSers = async (req, res, next) => {
  const query = req.query.new
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getUserStats = async (req, res, next) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ])
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
}
