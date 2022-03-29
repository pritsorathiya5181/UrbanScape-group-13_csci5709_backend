const User = require('../models/user/User')
const Professional = require('../models/professional/Professional')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aditi2007sonawane@gmail.com',
    pass: 'qdjimcajmsbvucck',
  },
})

var currentotp = {}
function otp(email, otp) {
  currentotp[email] = otp
  console.log(currentotp)
}

//user signup
exports.signupUser = async (req, res, next) => {
  const newuser = await new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneno: req.body.phoneno,
    password:bcrypt.hashSync(req.body.password,10)
  })
  console.log(newuser)

  try {
    const result = await newuser.save()
    const successResponse = {
      message: 'User registered successfully',
      success: true,
      result,
    }
    res.status(201).json(successResponse)
  } catch (err) {
    console.log(err)
    const errorResponse = {
      message: 'User already registered',
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

//professional signup
exports.professionalsignup = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const newprofessional = await new Professional({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneno: req.body.phoneno,
    password: bcrypt.hashSync(req.body.password,10),
    experience: req.body.experience,
    workinghours: req.body.workinghours,
    preferredservice: req.body.preferredservice,
    preferredlocation: req.body.preferredlocation,
  })

  try {
    const result = await newprofessional.save()
    const successResponse = {
      message: 'Professional registered successfully',
      success: true,
      result,
    }
    res.status(201).json(successResponse)
  } catch (err) {
    console.log(err)
    const errorResponse = {
      message: 'Professional already registered',
      success: false,
    }
    res.status(500).json(errorResponse)
  }
}

//user login
exports.userlogin = async (req, res, next) => {
  try {
    if (!req.params.email || !req.params.password) {
      return res.status(400).json({ message: 'Invalid parameters' })
    }

    var email = req.params.email
    console.log("FIND ALL");
    console.log(await User.find({}).pretty());
    const user = await User.findOne({ email: email })
    if (!user) {
      const professionaluser = await Professional.findOne({ email: email })
      if (!professionaluser) {
        return res.status(401).json('User not registered')
      }
      const hashedPassword = bcrypt.hashSync(req.body.password,10)
      if (hashedPassword !== professionaluser.password) {
        console.log('in password')
        return res.status(401).json('Wrong password')
      }
      console.log(professionaluser._id)
      const accessToken = jwt.sign(
        {
          id: professionaluser._id,
        },
        process.env.JWT_SEC,
        { expiresIn: '1d' }
      )
      if (professionaluser) {
        return res
          .status(200)
          .json({
            message: 'Welcome Professional',
            accessToken,
            user: professionaluser,
          })
      } else {
        return res.status(401).json('Error')
      }
    }
    console.log(user.password)
    console.log(email)
    const pwd = bcrypt.hashSync(req.body.password,10)
    if (pwd !== user.password) {
      console.log('in password')
      return res.status(401).json('Wrong password')
    }
    console.log(user._id)
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: '1d' }
    )
    if (user) {
      return res
        .status(200)
        .json({ message: 'Welcome user', accessToken, user: user })
    } else {
      return res.status(401).json('Error')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

//professional login
exports.professionallogin = (req, res, next) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (!req.params.email || !req.params.password) {
      return res.status(400).json({ message: 'Invalid parameters' })
    }
    var email = req.params.email
    var password = req.params.password
    Professional.findOne({})
      .where('email')
      .equals(email)
      .where('password')
      .equals(password)
      .exec(function (err, data) {
        if (data) {
          res.send(200, data)
        } else {
          res.send(404, 'data not found')
        }
      })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

//forgetpassword
exports.forgetpassword = (req, res, next) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (!req.params.email) {
      res.send({ message: 'Invalid parameters' })
    }
    var email = req.params.email
    User.findOne({})
      .where('email')
      .equals(email)
      .exec(function (err, data) {
        if (data) {
          let r = (Math.random() + 1).toString(36).substring(7)
          otp(email, r)
          var mailOptions = {
            from: 'aditi2007sonawane@gmail.com',
            to: email,
            subject: 'OTP to change password is:',
            text: r,
          }

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)

              res.send('email sent')
            }
          })
        } else {
          Professional.findOne({})
            .where('email')
            .equals(email)
            .exec(function (err, data) {
              if (data) {
                let r = (Math.random() + 1).toString(36).substring(7)
                otp(email, r)
                var mailOptions = {
                  from: 'aditi2007sonawane@gmail.com',
                  to: email,
                  subject: 'OTP to change password is:',
                  text: r,
                }

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error)
                  } else {
                    console.log('Email sent: ' + info.response)

                    res.send('email sent')
                  }
                })
              } else {
                res.send({ message: 'Enter registered email address' })
              }
            })
        }
      })
  } catch (error) {}
}

//deleteuser
exports.deleteuser = (req, res, next) => {
  User.findOneAndDelete({})
    .where('email')
    .equals(req.body.email)
    .exec(function (error, data) {
      if (data) {
        res.send('userdeleted')
      } else {
        Professional.findOneAndDelete({})
          .where('email')
          .equals(req.body.email)
          .exec(function (error, data) {
            if (data) {
              res.send('userdeleted')
            } else {
              res.send('user not found')
            }
          })
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

exports.verifyotp = (req, res, next) => {
  var otp = req.params.otp
  var email = req.params.user;
  if (currentotp[email] == otp) {
    console.log('otp matched')
    res.send('otp matched')
  } else {
    res.send('Invalid otp')
    console.log('please enter valid otp')
  }
}

exports.updatepassword = (req, res, next) => {
  var hashedPassword = bcrypt.hashSync(req.params.password,10)
  User.findOneAndUpdate(
    { email: req.params.username },
    { $set: { password: hashedPassword } },
    { new: false },
    (err, doc) => {
      if (doc) {
        res.send('password updated')
      } else {
        Professional.findOneAndUpdate(
          { email: req.params.username },
          { $set: { password: hashedPassword } },
          { new: false },
          (err, doc) => {
            if (doc) {
              res.send('password updated')
            } else {
              res.send('user not found')
            }
          }
        )
      }
    }
  )
}
