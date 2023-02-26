require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const {log} = require("mercedlogger")
const cors = require("cors")


const {PORT} = process.env

const app = express()

app.use(cors()) 
app.use(morgan("tiny"))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Server yemchy cv  ")
})

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))