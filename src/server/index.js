// "webpack": "^4.44.2",

var path = require('path');
var https = require('follow-redirects').https;
var fs = require('fs');
const express = require('express');
const axios = require("axios");

const dotenv = require('dotenv');
dotenv.config();

const BASE_API_URL = 'http://api.meaningcloud.com/summarization-1.0?key=';

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
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});


// POST route to add temperature, date, user response
app.post('/add', (req, res) => {
    const newEntry = {
        summary: req.body,
    };
    projectData = newEntry;
    res.send(projectData);
});


app.post('/api_call', async (req, res) => {
    const userInput = req.body;

    try {
        const apiData = await fetchAPI(userInput);
        let summary = JSON.stringify(apiData);
        res.status(200).send(summary);
    } catch (e) {
        res.send(400).send(e);
    }
});

const fetchAPI = async (data) => {
    const res = await axios(
        BASE_API_URL + process.env.API_KEY + '&url=' + data.url + '&sentences=5'
    );
    try {
        return res.data;
    } catch (e) {
        console.log("Error",e)
    }
}