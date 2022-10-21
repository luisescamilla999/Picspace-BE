const connectDB = require("./config/connection")
const bodyParser = require('body-parser');
const routesList = require("./routes")
const express = require('express');
const morgan = require('morgan')
const dotenv = require("dotenv")
const cors = require("cors")

const port = process.env.PORT || 3525;
const app = express();
dotenv.config();

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get("/", (_req, res) => {
	res.send("Backend working c:");
});

for (const { name, router } of routesList) {
	app.use(`/api/${name}`, router);
}

// Server uplift
app.listen(port, function(){
	console.log(`-----> Server running in http://localhost:${port}/api/`);
});