const updateUI = async () => {
    const request = await fetch('http://localhost:8081/all');
    try {
        const allData = await request.json();
        document.getElementById('results').innerHTML = allData.temp.data;
    } catch(error) {
        console.log("Error", error);
    }
}

export { updateUI };