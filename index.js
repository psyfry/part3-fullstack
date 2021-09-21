const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
//require("dotenv").config()
const app = express()
const Person = require("./models/mongoFun.js")
//console.log("mongoFun.getEntries Test", getEntries())
app.use(express.json())
app.use(cors())
app.use(express.static("build"))

let persons = Person.find({}).then((result) => {
    console.log("persons results: ", result)
    return result
})

const generateId = () => {
    const maxId = Math.max(...persons.map((p) => p.id))
    return maxId + 1
}

morgan.token("post-log", function logPostBody(req) {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    } else {
        return null
    }
})

app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :post-log")
)

app.get("/info", (req, res, next) => {
    Person.countDocuments()
        .lean()
        .then((result) => {
            res.send(
                `Phonebook contains info from ${result} people \n
         ${new Date()}`
            )
        })
        .catch((error) => next(error))
})

app.get("/api/persons", (req, res, next) => {
    Person.find({})
        .then((result) => {
            console.log(result)
            res.json(result)
        })
        .catch((error) => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => {
            console.log(error)
            next(error)
        })
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then((result) => {
            console.log("Record Deleted:", result)
            res.status(204).end()
        })
        .catch((error) => next(error))
})

app.post("/api/persons", (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ "error": "Missing required field" })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
        date: new Date(),
    })
    person
        .save()
        .then((result) => {
            console.log("Entry saved")
            res.json(result)
        })
        .catch((error) => {
            res.status(400).json({
                "error": "Name must be unique",
                "message": error.message,
            })
            next(error)
        })
})

app.put("/api/persons/:id", (req, res, next) => {
    const updatedPerson = {
        number: req.body.number,
    }
    Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true })
        .then((result) => {
            console.log("PUT Result: ", result)
            res.json(result)
        })
        .catch((error) => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error("Error Handler: ", error.message)

    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
