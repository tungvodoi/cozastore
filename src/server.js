require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const configViewEngine = require('./config/viewEngine');
const configSession = require('./config/configSession');
const connectDB = require('./config/connectDB');
const initRoutes = require('./routes/web');

// Init app
const app = express();

//config DB
connectDB();

//Config cookie
app.use(cookieParser());

//Config session
configSession(app);

//config view engine
configViewEngine(app);

//Enable post data for request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Init all routes
initRoutes(app);

//Error
app.get('*', function (req, res) {
  res.render('admin/404');
});

app.listen(process.env.APP_PORT, process.env.APP_HOST || 5000, () => {
  console.log(`Server is running on port ${process.env.APP_PORT || 5000}`);
});
