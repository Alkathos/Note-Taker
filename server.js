const express = require("express");

const server = new express();



server.listen(3000, () => {
    console.log("Server is up and running on port 3000.")
});