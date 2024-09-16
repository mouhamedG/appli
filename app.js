const express = require("express") // j'écris en CommonJS ce qui est visible par le require
// mais vous pouvez utiliser ESModule caractérisé par le import from
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");


const app = express();

app.use(cors(
    {
        origin: "*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type","Authorization"]
    }
)); //tout le monde peut m'envoyer des requêtes


app.set("host", process.env.HOST)
app.set("port", process.env.PORT)


module.exports = app;