const express = require("express");
const fs = require("fs");

const server = new express();

server.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

server.get("/notes", (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`)
})

server.listen(3000, () => {
    console.log("Server is up and running on port 3000.")
});