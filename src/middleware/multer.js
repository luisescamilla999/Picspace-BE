const multer = require("multer");
const { v4 } = require("uuid")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public')
    },
    filename: function (req, file, cb) {
        const ext = /[^.]+$/.exec(file.originalname);
        const uniqueSuffix = Date.now() + '-' + v4() + "." + ext
        cb(null, uniqueSuffix)
    }
})

module.exports = multer({ storage: storage })

