const fetchPromise = (url) => {
    return new Promise ((resolve, reject) => {
        if (fetch(url).ok) {
            console.log("Fetching URL")
            resolve();
        }
        reject();
        
    })
}

fetchPromise("file.txt").then(() => {
    console.log("URL Fetched successfully");
}).catch(() => {
    console.log("Fuck this error")
}) ;