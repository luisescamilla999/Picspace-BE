const testImage = (req, res)=>{
    const file = req.file
    console.log(file)
    res.end("Archivo subido")
}

module.exports = {
    testImage
}