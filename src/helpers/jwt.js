const jwt = require('jsonwebtoken');

const generarJWT = (idusuario,nombre) =>{

    const payLoad = {idusuario ,nombre};

    return new Promise((resolve,reject) =>{

    jwt.sign(payLoad,process.env.SECRET_JWT_SEED,{
        expiresIn: '24h'
    },(err,token) => {
        if(err){
            reject(err);
        }

        else{

            resolve(token);

        }
    })


    });
}


module.exports = {
    generarJWT
}