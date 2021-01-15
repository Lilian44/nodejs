// importer body-parser et express
const express = require('express');
const bodyParser = require('body-parser');
const students = require('./app/routers/students.router.js');
// const lessons = require('./app/routers/lessons.router');
const users = require('./app/routers/users.router');
const { initDb } = require("./app/models/db");


//créer une application express
const app = express();
//ajouter bodyParser comme middleware
app.use(bodyParser.json())

initDb();

app.use('/students', students);
app.use('/', users);
// app.use('/lessons', lessons);


//lancer le serveur sur le port 8080
app.listen(8080);