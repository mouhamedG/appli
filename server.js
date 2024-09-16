const express = require("express") 
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");

const app = express();

app.use(cors()); 

app.get("/books", function(req, res) {
    return res.send("Tu veux les livres")
})

app.post("/books",  function(req, res) {
    return res.send("Tu as créé un livre")
})

app.delete("/books/:id",  function(req, res) {
    return res.send("Tu as supprimé le livre ayant l'id "+ req.params.id)
})

app.put("/books/:id",  function(req, res) {
    return res.send("Tu as un modifié le livre ayant l'id "+ req.params.id)
})

app.use(function(req, res){
    return res.send("URL inconnue")
})

app.set("host", process.env.HOST)
app.set("port", process.env.PORT)


app.listen(app.get("port"), function(){
    console.log("Serve is running at "+ app.get("host") + ":" + app.get("port"))
})