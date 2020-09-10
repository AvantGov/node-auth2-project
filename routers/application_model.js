const database_access = require("../data/config")


// * adds users to the database
const add = async function(user) {
    const[id] = await database_access("users")
        .insert(user)
    
    return getUserById(id)
}

// * find all users 
const getUsers = () => {
    return database_access("users")
        .select("id", "username")
}


// * find all users by department 
const getUsersByDept = (dept) => {
    return database_access("users")
        .select("id", "username", "password")
        .where("department" === dept)
} 

// * find user by filter 
const getUserById = (id) => {
    return database_access("users")
        .select("id", "username")
        .where({ id }) // desctructures id from req message
        .first()
}

// * find user by id
const getUserByFilter = (filter) => {
    return database_access("users")
        .select("id", "username", "password")
        .where(filter)
        .first()
}


module.exports = {
    add,
    getUsers,
    getUsersByDept,
    getUserById,
    getUserByFilter
}