// "webpack": "^4.44.2",

var path = require('path');
var https = require('follow-redirects').https;
var fs = require('fs');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
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
    console.log(projectData);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

// API call
/* app.post('/api_call', (req, res) => {
    console.log(req.body.url);
    const user_url = req.body.url;

    var options = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': '/summarization-1.0?key=' + process.env.API_KEY + '&txt=' + user_url + '&sentences=5',
        'headers': {
        },
        'maxRedirects': 20
      };
    
    var req1 = https.request(options, function (res) {
        var chunks = [];
        console.log('chunks 1: ', chunks);
        
        res.on("data", function (chunk) {
            console.log(chunk);
            chunks.push(chunk);
        });

        console.log('chunks 2: ', chunks);

        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
          return body.toString();
        });
    
        res.on("error", function (error) {
          console.error(error);
        });
      });
    res.send(req1);
    req1.end();
    
}); */

// POST route to add temperature, date, user response
app.post('/add', (req, res) => {
    console.log("Starting post request");
    // console.log(req);
    console.log(req.body);
    const newEntry = {
        summary: req.body,
    };
    console.log(newEntry);
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
});

console.log(`Your API key is ${process.env.API_KEY}`);

const getSummary = async (text) => {
    const newURL = BASE_API_URL + process.env.API_KEY + '&url=' + text + '&sentences=5';
    console.log(newURL);
    const res = await fetch(newURL);
    console.log(res);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
};

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
    console.log("FetchAPI data input:", data);
    const res = await axios(
        BASE_API_URL + process.env.API_KEY + '&url=' + data.url + '&sentences=5'
    );
    try {
        console.log("Fetch API res.data: ",res.data);
        return res.data;
    } catch (e) {
        console.log("Error",e)
    }
}