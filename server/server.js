require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
const API_URL = '/api';

const APP_PORT = process.env.PORT;

require('./routes/order')(app,API_URL);
require('./routes/price')(app,API_URL);

app.listen(APP_PORT, ()=>{
    console.log(`App started at ${APP_PORT}`);
});