exports.crearUsuario =async (req, res) => {//next en el parametro//agrege
    try {
        let usuario;
        //Creamos nuestro usuario
        usuario = new Usuario(req.body);
        await  usuario.save();
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');        
    }
    }