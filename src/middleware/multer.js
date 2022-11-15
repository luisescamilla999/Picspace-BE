/**
 * @author
 * @date 05/11/2022
 * @description Multer para imagenes
 * @version 1.0
 */
const { v4 } = require("uuid")
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

// Configuracion de multer
const storage = multer.diskStorage({
    // Destino de las imagenes
    destination: function (req, file, cb) {
        cb(null, 'src/public')
    },
    // Nombre de las imagenes
    filename: function (req, file, cb) {
        const ext = /[^.]+$/.exec(file.originalname);
        // Nombre unico para cada imagen
        const uniqueSuffix = Date.now() + '-' + v4() + "." + ext
        cb(null, uniqueSuffix)
    }
});

// Metodo para subir una imagen
let uploadFile = multer({
    storage: storage,
    // Tamaño limite de la imagen
    limits: { fileSize: maxSize },
    // Filtro para solo aceptar imagenes
    fileFilter: function (req, file, cb) {
        // Extensiones permitidas
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = /[^.]+$/.exec(file.originalname);
        if (mimetype && extname) {
            return cb(null, true);
        }
        return cb(null, false);
    }
  }).single("image");

// Convertir el metodo uploadFile en una promesa para poder usar async & await
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
