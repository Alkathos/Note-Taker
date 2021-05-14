const express = require("express");
const server = express();
const fs = require("fs");
const PORT = process.env.PORT || 3000;

server.get("/:page", (req, res) => {
    res.sendFile(`${__dirname}/public/${req.params.page}.html`);  
});



server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`)
});