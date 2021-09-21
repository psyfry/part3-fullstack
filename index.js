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

app.get("/info", (req, res) => {
    res.send(
        `Phonebook contains info from ${persons.length} people \n
         ${new Date()}`
    )
})

app.get("/api/persons", (req, res) => {
    Person.find({})
        .then((result) => {
            console.log(result)
            res.json(result)
        })
        .catch((error) => {
            console.error(error.message)
        })
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find((x) => x.id === id)
    !person ? res.status(400).end() : res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
    Person.findById(req.params.id).then((result) => {
        console.log("Result Found: ", result.name, result.number)
        !result
            ? res.status(400).end()
            : Person.deleteOne({ name: result.name }).then((deletedEntry) => {
                  console.log("Deleted Entry:", deletedEntry.name)
                  res.status(204).end()
              })
    })
})

app.post("/api/persons", (req, res) => {
    const body = req.body
    //const dupeCheck = persons.some((x) => x.name === body.name)
    //console.log(dupeCheck)

    if (!body.name || !body.number) {
        return res.status(400).json({ "error": "Name must be unique" })
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
            //mongoose.connection.close()
        })
        .catch((error) => {
            res.status(400).json({
                "error": "Name must be unique",
                "message": error.message,
            })
        })
})

/* app.put("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    res.send(`Feature not implemented yet. request ID: ${id}`)
})*/

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
