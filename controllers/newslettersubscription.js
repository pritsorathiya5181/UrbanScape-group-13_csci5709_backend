const mongoose = require('mongoose')
const NewsletterSubscription = require('../models/NewsletterSubscription')
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
    newSubscription.save().then((result)=>{
        console.log(result);
        res.send(result);
      })
   return res.status(200).json({ message: "New email subscription added", success: 'true' });
    
} catch (err) {
    return res.status(500).json({ success: 'false', message: 'Internal Server Error' });
}
}