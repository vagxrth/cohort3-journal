const fetchPromise = (url) => {
    return new Promise ((resolve, reject) => {
        fetch(url).then((response) => {
            if (response.ok) {
                resolve();
                console.log("Fetching URL");
                
            }
            else {
                reject();
                console.log("Error fetching file");
            }
        }). catch((err) => {
            console.log("Wrong URL");
        });
        
    })
}

fetchPromise("https://www.vagarth.in/").then(() => {
    console.log("URL Fetched successfully");
});