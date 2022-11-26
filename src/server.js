const connectDB = require("./config/connection")
const bodyParser = require('body-parser');
const routesList = require("./routes")
const express = require('express');
const morgan = require('morgan')
const dotenv = require("dotenv")
const path = require('path');
const cors = require("cors")
const isauth = require('./middleware/isauth');

const port = process.env.PORT || 3525;
const app = express();
dotenv.config();

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (_req, res) => {
	res.send("Backend working c:");
});

for (const { name, router } of routesList) {
	if (name === "login" || name === "register") {
		app.use(`/api/${name}`, router);
	} else {
		app.use(`/api/${name}`, isauth, router);
	}
}

// Server uplift
app.listen(port, function(){
	console.log(`-----> Server running in http://localhost:${port}/api/`);
});
