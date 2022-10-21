const mysql= require('mysql');

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}//configuration for using environment variables

//Create all the parameters that are required for the connection
const connection=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    port:3306,
    database:process.env.database
});

connection.connect((err)=>{
    if(err){
        console.log('Error: '+err)
    }else{
        console.log('----> Database connect success')
    }
});


//connection export
module.exports=connection;