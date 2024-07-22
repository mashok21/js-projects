import express from "express";
import configureDB from "./config/db.js";
import weatherCtrl from "./app/controller/weather-ctrl.js";
import cors from "cors";

const app = express();
const port = 3020;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Configure the database
configureDB();

// Routes
app.post('/weather', weatherCtrl.show); // Use POST method to handle request body

// Start the server
app.listen(port, () => {
    console.log("running on port", port);
});
