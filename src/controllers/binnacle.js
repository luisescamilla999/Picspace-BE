const db = require('../config/connection');

//get binnacles with or without filter
const getBinnacles = async (req,res) => {

    const {eventTypeId, modifiedTableId, eventDate}=req.body

    let select = ` SELECT date_format(log.eventDate,'%d/%m/%Y') as dateEvent,time_format(log.eventDate,
                    '%H:%i') as hourEvent , tableData.name as modifiedTableId, user.userName as userId,
                    eventType.name as eventTypeId FROM log
                    INNER JOIN tabledata ON log.modifiedTableId= tableData.tableDataId
                    INNER JOIN user ON log.userId= user.userId
                    INNER JOIN eventtype  ON log.eventTypeId= eventType.eventTypeId`
    let where= ' WHERE '
    let and = ' AND '
    let f1= ` log.eventTypeId=${eventTypeId}   `
    let f2=` log.modifiedTableId=${modifiedTableId} `
    let f3 = `log.eventDate LIKE '${eventDate}%'`

        if(eventDate!="" ){ 
           if(modifiedTableId!="" && eventTypeId!="") 
                select += where +f1 +and + f2 + and + f3
            else if (modifiedTableId!="")
                select+= where + f2 + and + f3
            else if (eventTypeId!="") 
                select += where + f1 + and+ f3
            else 
                select+= where+f3
        }else { 
            if(eventTypeId!="" && modifiedTableId!="" ) 
                select += where + f1 + and + f2
            else if(eventTypeId!="" )  
                select += where + f1
            else if (modifiedTableId!="")  
                select+= where +f2
            else 
                select += ' ORDER BY eventDate DESC'}

    console.log(select)
    let [rows,] = await db.query(select)

    if (rows.length==0)
        res.status(400).json({ok:false,msg:'Aun no hay registros' });
    else if (rows.length!=0) 
    
        res.status(200).json(rows);
    else
        res.status(400).json({ok:false, msg:'Ocurrió un error'});
}

module.exports={
    getBinnacles
}