const registerRouter = require("./register")
const loginRouter = require("./login")
const uploadsRouter = require("./uploads")
const galleryRouter = require("./gallery")
const deleteRouter = require("./gallery")
const maintenanceRouter = require("./maintenance")
const dashboardRouter = require("./dashboard")

module.exports = [
    {name: "register" , router: registerRouter},
    {name: "login" , router: loginRouter},
    {name: "uploads" , router: uploadsRouter},
    {name: "gallery", router: galleryRouter},
    {name: "deleteImage", router: deleteRouter},
    {name: "maintenance", router: maintenanceRouter},
    {name: "dashboard", router: dashboardRouter},
]