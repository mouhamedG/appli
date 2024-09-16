const express = require("express")
const PretenderController = require("./controllers/pretender")
const route = express.Router()


route.post('/', PretenderController.createOne)


module.exports = route