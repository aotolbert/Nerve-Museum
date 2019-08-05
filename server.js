// var deep = require('express-deep-link');
var deeplink = require('node-deeplink');
const express = require('express');
const fs = require('mz/fs');
var bodyParser = require("body-parser");
const port = process.env.PORT || 5000;



const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
var publicDir = require('path').join(__dirname,'/app');

app.use('/node_modules', express.static('node_modules'));
app.use(express.static(publicDir));

var routes = require("./routes/routes.js");
app.use(routes);





app.listen(port, () => console.log(`Server up and running on port ${port} !`));