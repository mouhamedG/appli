const { DataTypes } = require("sequelize");
const Database = require("../database");

const sequelize = Database.getInstance()


const Pretender = sequelize.define('Pretender', {

    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:true
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    wallet : {
        type: DataTypes.FLOAT,
        default: 0
    }


})


console.log(Pretender === sequelize.models.Pretender);