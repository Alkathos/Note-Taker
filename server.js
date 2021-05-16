//Dependencies
const express = require("express");
const path = require("path");
const notes = require("../Note-Taker/db/db.json");
console.log(notes);

//-------------------------------------------------------------Set up server----------------------------------------------------------
const server = express();
const PORT = process.env.PORT || 3000;

//----------------------------------------------------Set up Express app to handle data parsing---------------------------------------
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//---------------------------------------------------this allows the use of the public directory--------------------------------------
server.use('/public', express.static('public'));

//--------------------------------------------------------Displays the JSON file------------------------------------------------------
server.get("/api/notes", (req, res) => res.json(notes));

//---------------------------------------------------------------Basic Routing--------------------------------------------------------
server.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

server.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

//-------------------------------------------------------------------Catch all--------------------------------------------------------
server.get("*", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//-------------------------------------------------------------------Push Notes to Server--------------------------------------------------------
server.post('/api/notes', (req, res) => {
    notes.push(req.body);
    res.json(true);
});

//-----------------------------------------------------------Open server for listening------------------------------------------------
server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`)
});