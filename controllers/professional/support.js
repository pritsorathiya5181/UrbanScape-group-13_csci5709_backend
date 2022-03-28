//Author: Rikin Pineshkumar Patel

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { schema } = require("../../models/User");
const Contactus = require('../../models/professional/Contactus')

exports.addSupport = async (req, res, next) => {
  var id = mongoose.Types.ObjectId()

  console.log('Reached here')
  let newRequest = await new Contactus({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  })

  try {
    const savedRequest = await newRequest.save()
    const successResponse = {
      message: 'Support added successfully',
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
