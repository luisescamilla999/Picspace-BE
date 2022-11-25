const db = require('../config/connection');
const {response} = require('express');
const bcrypt = require('bcrypt');
const { generarJWT} = require('../helpers/jwt');

const newUser = async(req, res = response)=>{

    let {
        firstName,
        secondName,
        firstSurname,
        secondSurname,
        email,
        password,
        userName,
        joinDate,
    } = req.body;
    
    const date = new Date(joinDate);
    const [user,] = await db.query("select * from User where email=?",[email]);

    if(user.length === 0){

        const salt = await bcrypt.genSaltSync(10);
        const newPass = await bcrypt.hashSync(password,salt);

        const [result,] = await db.query("select MAX(userId) as id from User");
        let { id } = result[0];

        if (id !== null) {
            id = id + 1;
        }
        else {
            id = 1;
        }
        secondSurname = secondSurname === '' ? " " : secondSurname;
        const usr = {

            userId:id,
            firstName,
            secondName,
            firstSurname,
            secondSurname,
            email,
            password:newPass,
            userName,
            joinDate : date,
            usedStorage: 0,
            userTypeId:2,
            storagePlanId:1
        }

        await db.query('INSERT INTO User set?',[usr]);
        const token = await generarJWT(id,firstName);

        const usrInfo = {
            userId: usr.userId,
            firstName: usr.firstName,
            secondName: usr.secondName,
            firstSurname: usr.firstSurname,
            secondSurname: usr.secondSurname,
            userName: usr.userName,
            usedStorage: usr.usedStorage,
            userTypeId: usr.userTypeId,
            storagePlanId: usr.storagePlanId
        }

        return res.status(200).json({
            ok : true,
            msg: "¡Usuario registrado exitosamente!",
            firstName,
            firstSurname,
            id,
            token,
            usr: usrInfo
        })

    }
    else{

        return res.status(400).json({
            ok : false,
            msg : "El usuario ya existe"
        })

    }
    
    

}

module.exports = {
    newUser
}