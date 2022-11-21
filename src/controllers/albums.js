const db = require('../config/connection');
const { response, request } = require('express');
const CONS = require("../utils/maintenance.constants")
const fs = require('fs').promises

const newAlbum = async (req = request, res = response) => {

    const { name } = req.body
    const { ownerUserId } = req.params

    try {
        let [albumId,] = await db.query("select MAX(albumId) as id from album");
        let { id } = albumId[0];

        if (id !== null) {
            id = id + 1;
        } else {
            id = 1;
        }

        let album = {
            albumId: id,
            name,
            createDate: new Date(),
            ownerUserId
        };

        await db.query('INSERT INTO album set?', [album]);

        res.status(200).json({ ok: true, msg: "Se creo el album correctamente" });

    } catch (error) {
        res.status(404).json(CONS.SQLErrors(error.sqlMessage));
    }
}

const deleteAlbum = async (req = request, res = response) => {

    const { idAlbum } = req.params

    try {
        console.log(`select url from image where albumId = ${idAlbum}`)
        let [rows,] = await db.query(`select url from image where albumId = ${idAlbum}`);

        if (rows.length == 0) {
            db.query(`DELETE from album WHERE albumId = ${idAlbum}`)
            res.status(200).json({ ok: true, msg: 'Todos los archivos se eliminaron del servidor' })
        } else {
            const files = []

            for (var row in rows) {
                files.push("src/public/" + rows[row].url)
            }

            Promise.all(files.map(file => fs.unlink(file)))
                .then(() => {
                    db.query(`DELETE from Image WHERE albumId = ${idAlbum}`)
                    db.query(`DELETE from album WHERE albumId = ${idAlbum}`)
                    console.log("una vez")
                    res.status(200).json({ ok: true, msg: 'Todos los archivos se eliminaron del servidor' })
                })
                .catch(err => {
                    res.status(400).json({ ok: false, msg: 'Ocurrio un error al borrar los archivos' })
                })
        }

    } catch (error) {
        res.status(404).json(CONS.SQLErrors(error.sqlMessage));
    }

}


module.exports = {
    newAlbum,
    deleteAlbum
}