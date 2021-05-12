const express = require("express");
const fs = require("fs");

const server = new express();

server.get("/", (req, res) => {
    fs.readFile(`${__dirname}/public/index.html`, "utf-8", (err, html) => {
        if (err) {
            console.log(err);
        } else {
            res.send(html);
        }
    })
})

server.get("/notes", (req, res) => {
    fs.readFile(`${__dirname}/public/notes.html`, "utf-8", (err, html) => {
        if (err) {
            console.log(err);
        } else {
            res.send(html);
        }
    })
})

server.listen(3000, () => {
    console.log("Server is up and running on port 3000.")
});