const postData = async (url = '', data = {}) => {
    console.log("Beginning postData Client function: ", data, JSON.stringify({data}));
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
    })

    try {
        console.log('Starting try inside postData', response);
        const newData = await response.json();
        console.log("new Data from try!: ", newData);
        return newData;
    } catch(error) {
        console.log("error", error)
    }
};

export { postData };