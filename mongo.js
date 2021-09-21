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

const Person = mongoose.model("Person", phoneSchema)

const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
})

const getEntries = () => {
    Person.find({}).then((result) => {
        return [...result]
    })
}

const createEntry = (newEntry) => {
    person.save().then((result) => {
        console.log("added ", result, " to phonebook")
        mongoose.connection.close()
    })
}

console.log("argv length:", process.argv.length)

if (process.argv.length === 2) {
    console.log("Phonebook:")
    Person.find({}).then((result) => {
        result.forEach((x) => {
            console.log(x.name, x.number)
        })
        mongoose.connection.close()
    })
} else {
    person.save().then((result) => {
        console.log("added", result.name, "number", result.number, "to phonebook")
        mongoose.connection.close()
    })
}
