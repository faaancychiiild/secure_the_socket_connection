const User = require('../../config/models');
const mongoose = require('mongoose');

const FetchUsers = (req, res) => {
    let count = Math.round(Math.random() * 10);
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });
    let interval = setInterval(() => {
        res.write(
            `data: ${count++}\n\n`
        );
    }, 1000);

    req.on('close', () => {
        clearInterval(interval);
    })

}

module.exports = FetchUsers;