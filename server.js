const express = require("express") // j'écris en CommonJS ce qui est visible par le require
// mais vous pouvez utiliser ESModule caractérisé par le import from
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");
const { Sequelize } = require("sequelize");

const app = express();

(async() => {
    try {
        const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
            host: process.env.HOST,
            dialect: process.env.DB_DIALECT
        });
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
    
})()


app.use(cors(
    {
        origin: "*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type","Authorization"]
    }
)); //tout le monde peut m'envoyer des requêtes

app.get("/books", function(req, res) {
    return res.status(200).send("Tu veux les livres")
})

app.post("/books",  function(req, res) {
    return res.status(201).send("Tu as créé un livre")
})

app.delete("/books/:id",  function(req, res) {
    return res.status(200).send("Tu as supprimé le livre ayant l'id "+ req.params.id)
})

app.put("/books/:id",  function(req, res) {
    return res.status(200).send("Tu as un modifié le livre ayant l'id "+ req.params.id)
})

app.use(function(req, res){
    return res.status(404).send("URL inconnue")
})

app.set("host", process.env.HOST)
app.set("port", process.env.PORT)


app.listen(app.get("port"), function(){
    console.log("Serve is running at "+ app.get("host") + ":" + app.get("port"))
})