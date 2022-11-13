const db = require('../config/connection');
const fs= require('fs').promises

//get all the images in default folder
const getImages = async(req, res) => {
   const { userId, albumId } = req.query

    let [rows,] = await db.query(`SELECT I.fileName, I.url, I.sizeInBytes, I.uploadDate, A.name, A.ownerUserId 
                                    FROM Image I INNER JOIN Album A ON A.albumId=I.albumId
                                    WHERE I.albumId=${albumId} AND A.ownerUserId=${userId};`);
    if (rows.length==0)
        res.status(400).json({ok:false,msg:'Aun no hay fotos cargadas' });
    else if (rows.length!=0) 
        res.status(200).json(rows);
    else
        res.status(400).json({ok:false, msg:'Ocurrió un error'});
}

const getAlbums = async(req, res) => {
    const { userId } = req.query
    let [rows,] = await db.query(`SELECT * FROM Album WHERE ownerUserId = ${userId};`);

    if (rows.length == 0)
        res.status(400).json({ok:false, msg:'No hay albums'});
    else if (rows.length != 0)
        res.status(200).json(rows);
    else
        res.status(400).json({ok:false, msg:'Ocurrió un error'});
}

//delete image 
const deleteImage = async(req,res) => {
    const {fileName} = req.body;
    
    let [rows] = await db.query(`SELECT * FROM Image WHERE fileName ="${fileName}"`)
        if(rows.length==0) 
            res.status(200).json({ok: false, msg: 'Archivo no existe'});
        else{
            const files = []

            for(var row in rows){
                files.push("src/public/" + rows[row].fileName)
            }

            Promise.all(files.map(file => fs.unlink(file)))
            .then(() => {
                db.query(`DELETE from Image WHERE fileName ="${fileName}"`)
                res.status(200).json({ok: true, mgs:'Todos los archivos se eliminaron del servidor'})
            })
            .catch(err => {
                res.status(400).json({ok:false, msg: 'Ocurrio un error al borrar los archivos'})
            })
        }
}
module.exports={
    getImages,
    getAlbums,
    deleteImage
}