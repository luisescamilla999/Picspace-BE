const db = require('../config/connection');

//get all the images in default folder
const getImages = async(req, res) => {
   const { userId, albumId } = req.body;

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

module.exports={
    getImages
}