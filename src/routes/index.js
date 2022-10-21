const registerRouter = require("./register")
const loginRouter = require("./login")

module.exports = [
    {name: "register" , router: registerRouter},
    {name: "login" , router: loginRouter}
]