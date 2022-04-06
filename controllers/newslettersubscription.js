const mongoose = require('mongoose')
const NewsletterSubscription = require('../models/NewsletterSubscription')
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid')

exports.addSubscription = async (req, res, next) => {

  try {
    const email = req.body.email;
    const newsletterSubscription = await NewsletterSubscription.find({emailAddress: email })
    console.log("newsletterSubscription" + newsletterSubscription)
    if(newsletterSubscription.length > 0) {
        return res.status(409).json({ message: "Email already exists", success: 'true' });
    }
    
    console.log("Email is " + email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (email === null || email === undefined || email.length === 0 || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: 'false', message: 'Missing Request Body' });
    } else if (email) {
             if (email && !emailRegex.test(email)) {
                return res.status(400).json({ success: 'false', message: 'Invalid email id' });       
            }
    }
    const newSubscription = new NewsletterSubscription({
        emailAddress: email
    });
    const conf = await newSubscription.save().then((result)=>{
        console.log(result);
        if(result) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.email || 'fresky.france@gmail.com',
                  pass: process.env.pass || 'mynameisprit@5181',
                },
              });
              let mailOptions = {
                from: process.env.email,
                to: email,
                subject: `Newsletter Subscription`,
                html: `<!DOCTYPE html>
                <html>
                <body>
                
                <h2>UrbanScape</h2>
                <p>Thank you for subscribing to our Newsletter !</p>
                <p>Stay tuned for our latest exciting updates, offers and much more ! </p>
                
                </body>
                </html>
                `,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log('Email sending error: ', error)
                  const errorResponse = {
                    message: 'Email Error',
                    success: false,
                  }
                  res.status(404).json(errorResponse)
                } else {
                  const successResponse = {
                    message: 'Email Sent',
                    success: true,
                  }
                  res.status(200).json(successResponse)
                }
              });
              
        }
        return res.status(200).json({ message: "New email subscription added", success: 'true' });
      });
   
    
} catch (err) {
    return res.status(500).json({ success: 'false', message: 'Internal Server Error' });
}
}