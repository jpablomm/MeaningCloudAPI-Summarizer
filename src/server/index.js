// "webpack": "^4.44.2",

var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');



const dotenv = require('dotenv');
dotenv.config();

const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

// POST route to add temperature, date, user response
app.post('/add', (req, res) => {
    console.log("Starting post request");
    console.log(req);
    console.log(req.body);
    const newEntry = {
        temp: req.body,
    };
    console.log(newEntry);
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
});