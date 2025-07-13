const { readDB, writeDB } = require('../utils/dbUtils');

exports.submitContact = (req, res) => {
    const db = readDB();
    const newContact = {
        id: Date.now(),
        ...req.body,
        date: new Date().toISOString()
    };

    db.contacts.push(newContact);
    writeDB(db);

    res.status(201).json(newContact);
};