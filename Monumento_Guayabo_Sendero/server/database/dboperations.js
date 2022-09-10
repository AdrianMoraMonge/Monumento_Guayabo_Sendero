var  config = require('./dbconfig');
const  sql = require('mssql');
var jwt = require('jsonwebtoken');

async function addNewUser(req){
    try {
        let  pool = await  sql.connect(config);
        let  user = await  pool.request()
            .input('nameUser', sql.VarChar, req.name)
            .query("EXEC InsertUser @name = @nameUser");
        let idUser = user.recordsets;
        return idUser;
    } catch (error) {
        return -1; /* If it does not work */
    }
}
    
module.exports = {
    addNewUser: addNewUser
}