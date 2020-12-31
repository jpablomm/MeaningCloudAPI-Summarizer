
const getSummary = async (url, text, key) => {
    const newURL = url + key + '&url=' + text + '&sentences=5';
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

export {getSummary};