import { getTemperature } from './getTemperature';
import { postData } from './postData';
import { updateUI } from './updateUI';


// Weather API
const base_url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const api_key = '&appid=5d10671a156bc50f016005850c1b873a&units=metric';

// meaninn cloud API
const API = 'bf085169b57e36115f7a5c37685392de';

function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById('name').value;
    console.log(formText);
    console.log("::: Form Submitted :::")
    Client.getTemperature(base_url, formText, api_key)
        .then((data)=> {
            console.log(data);
            console.log(data.main.temp);
            Client.postData('http://localhost:8081/add', data.main.temp); 
        })
        .then(() => {
            console.log('Updating UI');
            Client.updateUI();
        });
};


export { handleSubmit, getTemperature, postData, updateUI }