const express = require('express')
const bodyParser = require('body-parser')

const db = require("./app/models/db")

const app = express();
app.use(bodyParser.json());

db.sequelize.sync({ force: true });

app.listen(8080, () => {
    console.log("serveur lancé");
})