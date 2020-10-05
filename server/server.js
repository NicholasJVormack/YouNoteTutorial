const express = require('express');
const mongoose = require('mongoose');
const note = require('./models/note');
const app = express();

const API_PORT = process.env.PORT || 8080;
//allows to parse json of the incomming request
app.use(express.json());

const dbPath = 'mongodb+srv://omni:Zxcv1212!!@testcluster.krve1.mongodb.net/<dbname>?retryWrites=true&w=majority'; //paste path from Mongo DB

mongoose.connect(dbPath, {
    dbName: 'you_note',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the DB.");

}).catch((err) => console.log("Error connecting to the database."));

app.post("/", (req, res) => {
    const {title, author, body} = req.body;

    let newNote = new note({
        title,
        author,
        body
    });

    newNote
    .save()
    .then((note) => {
        console.log("Note Saved");
        res.json(note);
    }).catch(err => {
        console.log("Error saving the note.")
        res.send("Error.");
    });
});
//listening on port 3000, with a call back Listening on Port 3000
app.listen(API_PORT, () => console.log(`Listening on Port  ${API_PORT}`));
