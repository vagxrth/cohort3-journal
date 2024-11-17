const fs = require("fs");

const readPromise = (file) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                reject(err);
                console.log("Error reading file");
            }
            resolve(data);
        }) 
    })
}

readPromise("file.txt").then((data) => {
    console.log(data);
}) 