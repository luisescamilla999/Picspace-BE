const router = require("express").Router();
const {uploads} = require("../controllers")
  
module.exports = [
    router.post("/", uploads.upload),
];