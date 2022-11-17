const router = require("express").Router();
const album = require("../controllers/album");
  
module.exports = [
    router.post("/", album.createAlbum),
    router.delete("/:albumId", album.deleteAlbum),
];