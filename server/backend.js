const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('./database');

const backend = express();
backend.use(bodyParser.json());

const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV_LENGTH = 16;

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

backend.post('/item', (req, res) => {
    const itemname = req.body.itemname;
    const itemprice = req.body.itemprice
    const encrypteditemname = encrypt(itemname);
    db.run("INSERT INTO item (itemname, itemprice) VALUES (?, ?)", [encrypteditemname, itemprice], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

backend.get('/item/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT itemname, itemprice FROM item WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Note not found' });
        }
        const decrypteditemname = decrypt(row.itemname);
        const itemprice = row.itemprice
        res.status(200).json({ itemname: decrypteditemname, itemprice: itemprice });
    });
});

backend.listen(5000, () => {
    console.log('Server is running on port 5000');
});
