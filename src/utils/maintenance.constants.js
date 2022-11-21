const emptyData = { ok: false, msg: 'No hay datas en la tabla.' }
const nonexistentTable = { ok: false, msg: 'Error en el servidor o la tabla expecificada no existe.' }
const unspecifiedData = { ok: false, msg: 'No se especifico la data.' }
const unspecifiedID = { ok: false, msg: 'No se especifico el id.' }
const successfulInsert = { ok: true, msg: 'Fila insertada correctamente' }
const successfulUpdate = { ok: true, msg: 'Fila modificada correctamente' }
const successfulDelete = { ok: true, msg: 'Fila eliminada correctamente' }
const SQLErrors = (msg) => { return msg == undefined ? { ok: false, msg: "Error del servidor" } : { ok: false, msg } }

module.exports = {
    emptyData,
    nonexistentTable,
    successfulInsert,
    unspecifiedData,
    unspecifiedID,
    successfulUpdate,
    successfulDelete,
    SQLErrors
}