// * library depend.
const express = require("express");
const helmet = require("helmet"); 
const cors = require("cors");
const env = require("dotenv/config");
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const database_access = require("./data/config")

// * access depend. 
const application_router = require("./routers/application_router")

const server = express()
const PORT = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(application_router)
server.use(session({
	resave: false, // avoid recreating sessions that have not changed
	saveUninitialized: false, // to comply with GDPR laws
	secret: process.env.JWT_VERIFY, // cryptographically sign the cookie
	store: new KnexSessionStore({
		knex: database_access, // configured instance of knex
		createtable: true, // if the sessions table doesn't exist, create it automatically
	}),
}))


server.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({
        message: "server error encountered"
    })
})

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})