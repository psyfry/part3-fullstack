const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()

const mongoUrl = process.env["MONGO_URI"]

app.use(express.json())
app.use(cors())
app.use(express.static("build"))

/*let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456",
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345",
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
    },
]
*/

let persons = getEntries()

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
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find((x) => x.id === id)
    !person ? res.status(400).end() : res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find((d) => d.id === id)
    !person ? res.status(400).end() : (persons = persons.filter((d) => d.id !== id))
    res.status(204).end()
})

app.post("/api/persons", (req, res) => {
    const body = req.body
    const dupeCheck = persons.some((x) => x.name === body.name)
    console.log(`Duplicate Person?: ${dupeCheck}`)
    if (!body.name || !body.number || dupeCheck) {
        return res.status(400).json({ "error": "Name must be unique" })
    }

    const newEntry = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(newEntry)
    res.json(newEntry)
})

/* app.put("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    res.send(`Feature not implemented yet. request ID: ${id}`)
})*/

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
