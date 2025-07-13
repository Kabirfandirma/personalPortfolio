const { readDB } = require('../utils/dbUtils');

exports.getProjects = (req, res) => {
    const db = readDB();
    res.json(db.projects);
};