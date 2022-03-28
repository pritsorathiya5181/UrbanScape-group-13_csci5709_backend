const mongoose = require('mongoose')

const NewsLetterSubscriptionSchema = new mongoose.Schema(
    {
        emailAddress : {type: String, required: true},
    },
    { timestamps: true }
)

module.exports = mongoose.model('newslettersubscriptions', NewsLetterSubscriptionSchema)
