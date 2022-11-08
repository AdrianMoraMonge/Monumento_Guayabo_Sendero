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

async function checkActivity(req){
    try {
        let  pool = await  sql.connect(config);
        let  user = await  pool.request()
            .input('id_User', sql.INT, req._idUser)
            .input('answerUser', sql.VarChar, req.answer)
            .input('idExcercise', sql.INT, req.id_excercise)
            .query("EXEC checkActivity @idUser = @id_User, @answer = @answerUser, @id_excercise = @idExcercise");
        let points = user.recordsets;
        return points;
    } catch (error) {
        return -1; /* If it does not work */
    }
}

async function numberActivitiesSolved(req){
    try {
        let  pool = await  sql.connect(config);
        let  user = await  pool.request()
            .input('id_User', sql.INT, req._idUser)
            .query("EXEC numberActivitiesSolved @idUser = @id_User");
        let activitiesSolved = user.recordsets;
        return activitiesSolved;
    } catch (error) {
        return -1; /* If it does not work */
    }
}

async function getScore(req){
    try {
        let  pool = await  sql.connect(config);
        let  user = await  pool.request()
            .input('id_User', sql.INT, req._idUser)
            .query("EXEC getScore @idUser = @id_User");
        let score = user.recordsets;
        return score;
    } catch (error) {
        return -1; /* If it does not work */
    }
}
    
module.exports = {
    addNewUser: addNewUser,
    checkActivity: checkActivity,
    numberActivitiesSolved: numberActivitiesSolved,
    getScore: getScore
}