const mongoose = require("mongoose")
require("dotenv").config()
const mongoUrl = process.env["MONGO_URI"]

mongoose.connect(mongoUrl)

const phoneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    id: { type: Number },
    date: Date,
})

phoneSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model("Person", phoneSchema)