const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // In-memory database for simplicity

db.serialize(() => {
    db.run("CREATE TABLE item (id INTEGER PRIMARY KEY, itemname TEXT, itemprice TEXT)")
});

module.exports = db;
