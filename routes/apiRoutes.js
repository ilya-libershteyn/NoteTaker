// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
const fs = require('fs');
const db = "./db/db.json";

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {

    let notes = JSON.parse(fs.readFileSync(db));
    
    res.json(notes);
  });

  app.get("/api/notes/:id", function(req, res) {
    
    let target = req.params.id;
    let notes = JSON.parse(fs.readFileSync(db));
  
    return res.json(notes.find(element => element.id === target));
  
  });

  // API POST Request
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {

    let notes = JSON.parse(fs.readFileSync(db));
    let newNote = req.body;
    let id = "newId" + notes.length;
    newNote.id = id;
    notes.push(newNote)
    
    fs.writeFileSync(db, JSON.stringify(notes));
    res.json(true);
  });

  // API DELETE Request
  // Delete path for the api, deletes the note that matches the id in the request
  app.delete("/api/notes/:id", function(req, res) {
    
    let rawNotes = fs.readFileSync(db);
    let notes = JSON.parse(rawNotes);
    let id = req.params.id;
    
    notes = notes.filter(element => element.id !== id);
    
    fs.writeFileSync(db, JSON.stringify(notes));
    res.json({ ok: true });
  });
};
