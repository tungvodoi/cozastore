require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const configViewEngine = require('./config/viewEngine');
const configSession = require('./config/configSession');
const connectDB = require('./config/connectDB');
const initRoutes = require('./routes/index');

// Init app
const app = express();

//config DB
connectDB();

//Config session
configSession(app);

//Enable flash message
app.use(flash());

//config view engine
configViewEngine(app);

//Enable post data for request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Init all routes
initRoutes(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
