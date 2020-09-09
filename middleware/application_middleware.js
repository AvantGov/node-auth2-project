const jwt = require("jsonwebtoken");
const roles = ["basic","elevated", "admin", "super_user"]

function restrict(role) {
    return async (req, res, next) => {
        const authError = {
            message: "invalid credentials to perform action"
        }

        try {
            const token = req.headers.authorizations
            if (!token) {
                return res.status(401).json(authError)
            }

            jwt.verify(token, process.env.JWT_VERIFY, (error, decoded) => {
                if(error) {
                    return res.status(401).json(authError)
                }

                if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
                    res.status(403).json({
                        message: "access is forbidden"
                    })
                }

                req.token = decoded
            })

            

            next()
        } catch(error) {
            next(error)
        }
    }
}

modules.export = {
    restrict
}