const { DataTypes } = require("sequelize");
const Database = require("./database");

const sequelize = Database.getInstance();

const Pretender = sequelize.define('Pretender', {

    firstname: {
        type: DataTypes.STRING,
        allowNull: true, // Optionnel
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true, // Optionnel
    },
    email: {
        type: DataTypes.STRING,
        unique: true, // L'email doit être unique
        allowNull: false, // Obligatoire
        validate: {
            isEmail: true // Valide que c'est un email
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Obligatoire pour sécuriser l'accès
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true, // Optionnel
        validate: {
            isDate: true // Vérifie que c'est bien une date
        }
    },
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'inactive'], // Choix limité à ces valeurs
        defaultValue: 'active' // Valeur par défaut
    },
    photo: {
        type: DataTypes.STRING, // Stockage de l'URL de la photo
        allowNull: true, // Optionnel
    },
    wallet: {
        type: DataTypes.FLOAT, // Montant du portefeuille
        defaultValue: 0.0, // Valeur par défaut de 0
        validate: {
            min: 0 // Empêche d'avoir une valeur négative
        }
    },
    likes: {
        type: DataTypes.INTEGER, // Nombre de "likes"
        defaultValue: 0, // Valeur par défaut
        validate: {
            min: 0 // Empêche les valeurs négatives
        }
    }
});

// Synchronise le modèle avec la base de données (option de mise à jour)
Pretender.sync({ alter: true }).catch(error => console.error("Erreur lors de la synchronisation:", error));

module.exports = Pretender;
