const path = require("path");
const { Sequelize } = require("sequelize");
const envPath = path.resolve("././", ".env");
require("dotenv").config({
    path: envPath 
})



class Database {
    static instance = null;
    constructor() {
        Database.instance = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
            host: process.env.HOST,
            dialect: process.env.DB_DIALECT
        });
    }

    static getInstance () {
        if(Database.instance == null) {
            new Database
        }
        return Database.instance   
    }

 

}
/* 
(async() => {
    try {
        await Database.getInstance().authenticate()
        console.log("Tout s'est bien passé")
    } catch(e) {
        console.error("Erreur")
    }


})()
 */

module.exports = Database