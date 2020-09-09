const express = require("express");
const secure = require('bcrypt');
const user_access = require('./application_model');
const middleware_access = require("../middleware/application_middleware")

const router = express.Router()

// * sign up end point (post)
router.post("/signup", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await user_access.getUserByFilter({ username })

        if (user) {
            res.status(409).json({
                message: "record already exists"
            })
        }

        const newUser = await user_access.add({
            username: username,
            password: await secure.hash(password, 10)
        })

        res.status(204).json(newUser)

    } catch(error) { 
        next(error) 
    }

})


// * login end point (post)
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await user_access.getUserByFilter({ username })

        if (!user) {
            res.status(401).json({
                message: "invalid credentials"
            })
        }

        const valid_password = await secure.compare(password, user.password)

        if (!valid_password) {
            res.status(401).json({
                messages: "invalid credentials"
            })
        }

        req.session.user = user

        res.json({
            message: `welcome, ${user.username}`
        })

    } catch(error) { 
        next(error) 
    }


})


// * log out endpoint (get w/ validation middleware)
router.get("/logout", middleware_access.restrict(), async (req, res, next) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                next(error)
            } else {
                res.status(204).end()
            }
        })
    } catch(error) { 
        next(error) 
    }
})


// * get all users when validated @ admin level (get w/ middleware)
router.get("/users", middleware_access.restrict("admin"), async (req, res, next) => {
    try {
        res.json(await user_access.getUsers())
    } catch(error) { 
        next(error) 
    }

})



// * get all users in same department when validated (get w/ middleware)
router.get("/users/:department", middleware_access.restrict("admin"), async (req, res, next) => {
    try {
        const users__department = await user_access.getUsersByDept(req.params.department)
        res.status(200).json(users__department)
    } catch(error) {
        next(error)
    }


})

module.exports = router;