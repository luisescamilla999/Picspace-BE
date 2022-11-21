const db = require('../config/connection');
const { response, request } = require('express');
const CONS = require("../utils/maintenance.constants")

const getTotalUser = async (req = request, res = response) => {

    try {
        let [rows,] = await db.query(`select count(*) as total from User;`);

        if (rows.length == 0)
            res.status(400).json(CONS.emptyData);
        else if (rows.length != 0)
            res.status(200).json({ ok: true, msg: rows[0].total });

    } catch (error) {
        res.status(404).json(CONS.SQLErrors(error.sqlMessage));
    }

}

const getUseStorage = async (req = request, res = response) => {

    try {
        let [rows,] = await db.query(`select sum(sizeInBytes) as total from Image;`);

        if (rows.length == 0)
            res.status(400).json(CONS.emptyData);
        else if (rows.length != 0)
            res.status(200).json({ ok: true, msg: rows[0].total });

    } catch (error) {
        res.status(404).json(CONS.SQLErrors(error.sqlMessage));
    }

}

const getTotalImages = async (req = request, res = response) => {

    try {
        let [rows,] = await db.query(`select count(*) as total from Image;`);

        if (rows.length == 0)
            res.status(400).json(CONS.emptyData);
        else if (rows.length != 0)
            res.status(200).json({ ok: true, msg: rows[0].total });

    } catch (error) {
        res.status(404).json(CONS.SQLErrors(error.sqlMessage));
    }

}

const getDateRegister = async (req = request, res = response) => {
    const { firstDate, lastDate } = req.body

    let sql = `Select date_format(joinDate,'%d/%m/%Y') as date, count(*) as amount from User where joinDate between '${firstDate}' AND '${lastDate}' group by joinDate;`

    try {
        let [rows,] = await db.query(sql);

        if (rows.length == 0)
            res.status(400).json(CONS.emptyData);
        else if (rows.length != 0) {
            let chartLabel = [];
            let chartData = [];
            let up = {
                label: "",
                value: -1
            }
            let down = {
                label: rows[0].date,
                value: rows[0].amount
            }
            rows.map(data => {
                chartLabel.push(data.date)
                chartData.push(data.amount)
                if (data.amount > up.value) {
                    up = {
                        label: data.date,
                        value: data.amount
                    }
                }
                if (data.amount <= down.value) {
                    down = {
                        label: data.date,
                        value: data.amount
                    }
                }
            })

            res.status(200).json({ 'labels': chartLabel, 'data': chartData, 'up': up, 'down': down })
        }

    } catch (error) {
        console.log(error)
        res.status(404).json(CONS.SQLErrors(error.sqlMessage));
    }
}

const getDateImage = async (req = request, res = response) => {
    const { firstDate, lastDate } = req.body

    let sql = `select date_format(uploadDate,'%d/%m/%Y') as date, count(*) as amount from image where uploadDate between '${firstDate}' AND '${lastDate}' group by uploadDate;`
    
    try {
        let [rows,] = await db.query(sql);

        if (rows.length == 0)
            res.status(400).json(CONS.emptyData);
        else if (rows.length != 0) {
            let chartLabel = [];
            let chartData = [];
            let up = {
                label: "",
                value: -1
            }
            let down = {
                label: rows[0].date,
                value: rows[0].amount
            }
            rows.map(data => {
                chartLabel.push(data.date)
                chartData.push(data.amount)
                if (data.amount > up.value) {
                    up = {
                        label: data.date,
                        value: data.amount
                    }
                }
                if (data.amount <= down.value) {
                    down = {
                        label: data.date,
                        value: data.amount
                    }
                }
            })

            res.status(200).json({ 'labels': chartLabel, 'data': chartData, 'up': up, 'down': down })
        }

    } catch (error) {
        console.log(error)
        res.status(404).json(CONS.SQLErrors(error.sqlMessage));
    }

}

module.exports = {
    getTotalUser,
    getUseStorage,
    getTotalImages,
    getDateRegister,
    getDateImage
}