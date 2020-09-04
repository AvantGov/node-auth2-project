// * library depend.
const express = require("express");
const helmet = require("helmet"); 
const cors = require("cors");

// * access depend. 
// const application_router = require("./routers/application_router")

const server = express()
const PORT = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())

// server.use(application_router)

server.use((error, req, res, next) => {
    console.log(error)
    res.stauts(500).json({
        message: "server error encountered"
    })
})

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})