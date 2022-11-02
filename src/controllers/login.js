const db = require('../config/connection');
const bcrypt = require('bcrypt');
const { generarJWT} = require('../helpers/jwt');

const login = async(req, res) => {
    const {
        email,
        password
    } = req.body;

    const first = password;
    const [search,] = await db.query('SELECT * FROM User WHERE email =?',[email]);
    
    if(search.length === 0){

        res.status(200).json({
            ok : false,
            msg: "El usuario no existe"
        })
    }

    else{

        const {userId,firstName,secondName,firstSurname,secondSurname,userName,usedStorage,userTypeId,storagePlanId} = search[0];
        const second = search[0].password;
        const validar = bcrypt.compareSync(first,second);

        if(!validar){

            res.status(400).json({
                ok : false,
                msg: "Correo o contraseña incorrectos",
     
            })

        }

        else{

            const usr = {
                userId, firstName, secondName, firstSurname, secondSurname, userName, usedStorage, userTypeId, storagePlanId
            }

            const token = await generarJWT(userId,firstName);
            res.status(200).json({
                ok : true,
                msg: "Bienvenido",
                usr,
                token
         
            })
        }
        
    }
}

module.exports = {
    login
}