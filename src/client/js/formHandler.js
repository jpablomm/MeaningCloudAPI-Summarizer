import { getSummary } from './getSummary';
import { postData } from './postData';
import { updateUI } from './updateUI';


function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById('name').value;
    Client.getSummary('http://localhost:8081/api_call', formText)
        .then((data)=> {
            Client.postData('http://localhost:8081/add', data.summary); 
        })
        .then(() => {
            Client.updateUI();
        });
};


export { handleSubmit, getSummary, postData, updateUI }