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

async function checkFirstActivity(req){
    try {
        let  pool = await  sql.connect(config);
        let  user = await  pool.request()
            .input('id_User', sql.INT, req._idUser)
            .input('answerUser', sql.VarChar, req.answer)
            .input('idExcercise', sql.INT, req.id_excercise)
            .query("EXEC checkFirstActivity @idUser = @id_User, @answer = @answerUser, @id_excercise = @idExcercise");
        let idUser = user.recordsets;
        return idUser;
    } catch (error) {
        return -1; /* If it does not work */
    }
}
    
module.exports = {
    addNewUser: addNewUser,
    checkFirstActivity: checkFirstActivity
}