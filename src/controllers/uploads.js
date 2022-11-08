/**
 * @author
 * @date 05/11/2022
 * @description CRUD de imagenes
 * @version 0.5
 */

const {response} = require('express');
const uploadFile = require("../middleware/multer");
const db = require('../config/connection');

/**
 * Cargar una imagen
 * @param {*} req 
 * @param {*} res 
 * @returns res.status(200).json({ok:true, msg:"Imagen subida exitosamente"})
 */
const upload = async (req, res = response) => {
  try {
    // Manipular la imagen con multer 
    await uploadFile(req, res);

    // Si no hay imagen
    if (req.file == undefined) {
      return res.status(400).json({ 
        ok: false,
        message: `Por favor cargue una imagen!` 
      });
    }
  
    // Si hay imagen
    // Obtener el id de la ultima imagen de  la base de datos
    const [imageId,] = await db.query("select MAX(imageId) as id from image");
    let { id } = imageId[0];

    if (id !== null) {
      id = id + 1;
    } else {
      id = 1;
    }

    // Construir el objeto de la imagen para la base de datos
    let image = {
      imageId: id,
      fileName: req.file.filename,
      url: req.file.path,
      sizeInBytes: req.file.size,
      uploadDate: new Date(),
      albumId: 2 // Sustituir el albumId por el album seleccionado
    };

    // Insertar la imagen en la base de datos
    await db.query('INSERT INTO image set?',[image]);
    
    // Retornar el estado de la operacion
    res.status(200).json({
      ok: true,
      message: `La imagen se ha cargado exitosamente: ${req.file.originalname}`,
      data: image
    });

  } catch (err) {
    // Error al subir una imagen que pesa más de 2MB
    if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "La imagen no puede pesar más de 2MB!",
        });
    }
    // Error al subir una imagen que no es de tipo .png, .jpg, .jpeg
    res.status(500).send({
      message: `No se puede cargar la imagen: ${req.file.originalname}. ${err}`,
    });
  }
};

module.exports = {
  upload
};