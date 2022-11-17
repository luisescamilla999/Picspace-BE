/**
 * @author
 * @date 16/11/2022
 * @description CRUD de Albumes
 * @version 1.0
 */

const {response} = require('express');
const db = require('../config/connection');

/**
 * Crear un Album
 * @param {*} req 
 * @param {*} res 
 * @returns res.status(200).json({ok:true, msg:"Album creado exitosamente"})
 */
const createAlbum = async (req, res = response) => {
  try {
    // Obtener el id del ultimo album de  la base de datos
    const [albumId,] = await db.query("select MAX(albumId) as id from album");
    let { id } = albumId[0];

    if (id !== null) {
      id = id + 1;
    } else {
      id = 1;
    }

    // Obtener el usuario loggeado a partir del JWT
    const userId = req.body.user.userId;

    // Construir el objeto del album para la base de datos
    let album = {
      albumId: id,
      name: req.body.albumName,
      createDate: new Date(),
      ownerUserId: userId
    };

    // Insertar el album en la base de datos
    await db.query('INSERT INTO album set?',[album]);
    
    // Retornar el estado de la operacion
    res.status(200).json({
      ok: true,
      message: `El album se ha creado exitosamente: ${req.body.albumName}`,
      data: album
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado al crear el album, por favor hable con el administrador'
    })
  }
};

/**
 * Eliminar un Album
 * @param {*} req
 * @param {*} res
 * @returns res.status(200).json({ok:true, msg:"Album eliminado exitosamente"})
 * @returns res.status(400).json({ok:false, msg:"No se puede eliminar el album"})
 * 
 */

const deleteAlbum = async (req, res = response) => {
  try {
    // Obtener el id del album a eliminar
    const albumId = req.body.albumId;
    
    // Obtener el usuario loggeado
    const userId = req.body.user.userId;

    // Obtener el album a eliminar
    const [album,] = await db.query('SELECT * FROM album WHERE albumId = ?',[albumId]);

    // Si el album no existe
    if (album.length === 0) {
      return res.status(400).json({
        ok: false,
        msg: 'El album no existe'
      });
    }

    // Si el album no pertenece al usuario loggeado
    if (album[0].ownerUserId !== userId) {
      return res.status(400).json({
        ok: false,
        msg: 'No tiene permisos para eliminar este album'
      });
    }

    // Eliminar el album de la base de datos
    await db.query('DELETE FROM album WHERE albumId = ?',[albumId]);

    // Retornar el estado de la operacion
    res.status(200).json({
      ok: true,
      msg: 'El album se ha eliminado exitosamente'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado al eliminar el album, por favor hable con el administrador'
    })
  }
};

module.exports = {
  createAlbum, 
  deleteAlbum
};