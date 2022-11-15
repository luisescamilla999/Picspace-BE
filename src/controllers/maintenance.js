const db = require('../config/connection');
const { response, request } = require('express');
const CONS = require("../utils/maintenance.constants")

const getDataTables = async (req = request, res = response) => {
    let { table } = req.params

    try {
        let [rows,] = await db.query(`SELECT * FROM ${table};`);

        if (rows.length == 0)
            res.status(400).json(CONS.emptyData);
        else if (rows.length != 0)
            res.status(200).json(rows);

    } catch (error) {
        res.status(404).json(CONS.SQLErrors(error.sqlMessage));
    }

}

const insertData = async (req = request, res = response) => {
    const { table } = req.params
    const { data } = req.body

    if (data == undefined)
        res.status(400).json(CONS.unspecifiedData)
    
    try {
        await db.query(`INSERT INTO ${table} set ?`, [data]);
        res.status(201).json(CONS.successfulInsert)
    } catch (error) {
        res.status(400).json(CONS.SQLErrors(error.sqlMessage))
    }
}

const updateData = async (req = request, res = response) => {
    const { table, id } = req.params
    const { data } = req.body

    if (data == undefined)
        res.status(400).json(CONS.unspecifiedData)
    
    try {
        await db.query(`UPDATE ${table} SET ? WHERE ${table + "id"} = ${id}`, [data]);
        res.status(200).json(CONS.successfulUpdate)
    } catch (error) {
        res.status(400).json(CONS.SQLErrors(error.sqlMessage))
    }
}

const deleteData = async (req = request, res = response) => {
    const { table, id } = req.params

    try {
        await db.query(`DELETE FROM ${table} WHERE ${table + "id"} = ${id}`);
        res.status(200).json(CONS.successfulDelete)
    } catch (error) {
        res.status(400).json(CONS.SQLErrors(error.sqlMessage))
    }
}

module.exports = {
    getDataTables,
    insertData,
    updateData,
    deleteData
}