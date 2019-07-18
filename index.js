require('dotenv').config();

var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors');


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 4000;

require('./routes')(app);

app.listen( port);

console.log('App is running on port ' + port);
