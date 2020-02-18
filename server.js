const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const client_id = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const queryString = require('querystring');

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

//api routes here

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Express app running on port ${port}`);
});

//setting up spotify authentication
