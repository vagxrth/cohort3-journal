function timeout() {
    console.log("100xDevs");
}

const timeoutPromise = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

timeoutPromise(3000).then(timeout)