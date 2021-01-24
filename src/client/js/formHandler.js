import { getSummary } from './getSummary';
import { postData } from './postData';
import { updateUI } from './updateUI';


// Weather API
// const base_url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// const api_key = '&appid=5d10671a156bc50f016005850c1b873a&units=metric';

// meaninn cloud API
const BASE_API_URL = 'http://api.meaningcloud.com/summarization-1.0?key=';
const API = 'bf085169b57e36115f7a5c37685392de';

function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById('name').value;
    console.log(formText);
    console.log("::: Form Submitted :::");
    Client.getSummary('http://localhost:8081/api_call', formText)
        .then((data)=> {
            console.log(data);
            console.log(data.summary);
            Client.postData('http://localhost:8081/add', data.summary); 
        })
        .then(() => {
            console.log('Updating UI');
            Client.updateUI();
        });
};


export { handleSubmit, getSummary, postData, updateUI }