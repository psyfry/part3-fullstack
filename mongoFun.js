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

exports.getEntries = () => {
    Person.find({}).then((result) => {
        return [...result]
    })
}

exports.createEntry = (newEntry) => {
    Person.save(newEntry).then((result) => {
        console.log("Entry saved")
        mongoose.connection.close()
    })
}

exports.deleteEntry = (entryName) => {
    Person.find({ name: entryName }).then((result) => {
        console.log("Result Found: ", result.name, result.number)
        !result
            ? console.log("Error: No records found that match query")
            : Person.deleteOne({ name: result.name }).then((response) => {
                  console.log("Deleted Entry:", result.name)
              })
    })
}

exports.updateEntry = (entryName, newNumber) => {
    Person.updateOne({ name: entryName }, { number: newNumber }).then((result) => {
        console.log("Updated Number for", entryName, " to:", result.number)
    })
}
