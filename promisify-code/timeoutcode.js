function timeout() {
    console.log("100xDevs");
}

const timeoutPromise = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            timeout();
            resolve();
        }, time);
    });
}

timeoutPromise(5000).then(() => {
    console.log("Finished");
})