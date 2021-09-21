const mongoose = require("mongoose")
require("dotenv").config()
const uniqueValidator = require("mongoose-unique-validator")
const mongoUrl = process.env["MONGO_URI"]

mongoose.connect(mongoUrl)
const minDigits = new RegExp(/(\d.*){8,}/, 'g')
const validator = (tel) => minDigits.test(tel)

const phoneSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true, minlength: 3 },
    number: {
        type: String,
        validate: [
            validator,
            `Telephone number is not valid. Requires at least 8 digits`,
        ],
        required: [true, "Please enter a 8 digit phone number"],
    },
    date: Date,
})

phoneSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})
phoneSchema.plugin(uniqueValidator)
module.exports = mongoose.model("Person", phoneSchema)
