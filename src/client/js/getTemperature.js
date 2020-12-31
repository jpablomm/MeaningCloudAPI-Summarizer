

const getTemperature= async (url, zipcode, key) => {
    const newURL = url + zipcode + key;
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

export {getTemperature};