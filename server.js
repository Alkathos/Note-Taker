//Dependencies
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require ("uuid");
const fs = require ("fs");
console.log(__dirname);

//console.log(notes);

//-------------------------------------------------------------Set up server----------------------------------------------------------
const server = express();
const PORT = process.env.PORT || 3000;

//----------------------------------------------------Set up Express app to handle data parsing---------------------------------------
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//---------------------------------------------------this allows the use of the public directory--------------------------------------
server.use('/public', express.static('public'));

//---------------------------------------------------------------Basic Routing--------------------------------------------------------
server.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

server.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

//--------------------------------------------------------Displays the JSON file------------------------------------------------------
server.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

//-------------------------------------------------------------------Catch all--------------------------------------------------------
server.get("*", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//-------------------------------------------------------------------Push Notes to Server and add the ID--------------------------------------------------------
server.post('/api/notes', (req, res) => {
    //got post code from (https://github.com/RyanEllingson/Note-Taker/blob/master/server.js)
    fs.readFile(path.join(__dirname, '/db/db.json'), "utf8", (err, resp) => {
        if (err) {
            console.log(err);
        }
        const notes = JSON.parse(resp);
        const noteRequest = req.body;
        const noteId = uuidv4();
        const newNote = {
            title: noteRequest.title,
            text: noteRequest.text,
            id: noteId
        };
        notes.push(newNote);
        res.json(newNote);
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes, null, 2), (err) => {
            if (err) throw (err);
        });
    });
});

//--------------------------------------------------------Displays the Note------------------------------------------------------
server.get("/api/notes/:id", (req, res) => {
    const selectedNote = req.params.id;
    res.json(selectedNote);
});

//-------------------------------------------------------------------Delete Notes from Server--------------------------------------------------------
server.delete("/api/notes/:id"), (req, res) => {
    //1. read file
    //2. grab the note id
    //3. loop through notes to find id
    //4. remove note
    //5. rewrite the json file
    // fs.readFile(path.join(__dirname, '/db/db.json'), "utf8", (err, resp) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     const notes = JSON.parse(resp);
    //     console.log(notes);
    //     const delNoteId = notes.id;
    //     notes.filter(!delNoteId);
    //     console.log(notes);
    //     notes.push(notes);

    // })
};

//-----------------------------------------------------------Open server for listening------------------------------------------------
server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
});