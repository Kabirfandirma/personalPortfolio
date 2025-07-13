const fs = require('fs');
const path = require('path');

// Critical change for production vs development paths
const DB_PATH = process.env.NODE_ENV === 'production'
    ? '/opt/data/db.json'          // Production path (Render disk)
    : path.join(__dirname, '../data/db.json'); // Local development path

const readDB = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // Create file if it doesn't exist
        if (err.code === 'ENOENT') {
            fs.writeFileSync(DB_PATH, JSON.stringify({ contacts: [], projects: [] }));
            return { contacts: [], projects: [] };
        }
        throw err;
    }
};

const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDB };