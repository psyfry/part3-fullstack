const mongoose = require("mongoose")
require("dotenv").config()
const mongoUrl = process.env["MONGO_URI"]

mongoose.connect(mongoUrl)

const phoneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    id: { type: Number, required: true },
    date: Date,
})

const Person = mongoose.model("Person", phoneSchema)

const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
    date: new Date(),
})

const getEntries = () => {
    Person.find({}).then((result) => {
        return [...result]
    })
}

const createEntry = (newEntry, done) => {
    person
        .save((err) => {
            if (err) return console.error(err)
        })
        .then((result) => {
            console.log("Entry saved")
            mongoose.connection.close()
        })
}

const deleteEntry = (entryId, done) => {}
