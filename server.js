//Dependencies
const express = require("express");
const path = require("path");
const notes = require("../Note-Taker/db/db.json");
const { v4: uuidv4 } = require ("uuid");

//console.log(notes);

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

//--------------------------------------------------------Displays the Note------------------------------------------------------
server.get("/api/notes/:id", (req, res) => {
    const selectedNote = req.params.id;
    console.log(selectedNote);
    res.json(selectedNote);
});

//---------------------------------------------------------------Basic Routing--------------------------------------------------------
server.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

server.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

//-------------------------------------------------------------------Catch all--------------------------------------------------------
server.get("*", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//-------------------------------------------------------------------Push Notes to Server and add the ID--------------------------------------------------------
server.post('/api/notes', (req, res) => {
    const newNote = req.body;
    
    newNote.id = uuidv4();
    console.log(newNote);
    notes.push(req.body);
    res.json(true);
});

//-------------------------------------------------------------------Delete Notes from Server--------------------------------------------------------
server.delete("/api/notes/:id"), (req, res) => {
    const deletedNote = req.params.id;

    
}

//-----------------------------------------------------------Open server for listening------------------------------------------------
server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`)
});