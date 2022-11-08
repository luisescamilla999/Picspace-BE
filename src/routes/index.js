const registerRouter = require("./register")
const loginRouter = require("./login")
const uploadsRouter = require("./uploads")
const galleryRouter = require("./gallery")

module.exports = [
    {name: "register" , router: registerRouter},
    {name: "login" , router: loginRouter},
    {name: "uploads" , router: uploadsRouter},
    {name: "gallery", router: galleryRouter}
]