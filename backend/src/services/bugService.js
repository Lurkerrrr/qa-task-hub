const db = require('../../database');

const getAllBugs = (userId, role) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM bugs ORDER BY id DESC`;
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const createBug = (bugData, userId) => {
    return new Promise((resolve, reject) => {
        const { title, priority, severity, assignee, steps, status, date, timeSpent } = bugData;
        const sql = `INSERT INTO bugs (title, priority, severity, assignee, steps, status, date, timeSpent, userId) VALUES (?,?,?,?,?,?,?,?,?)`;
        db.run(sql, [title, priority, severity, assignee, steps, status, date, timeSpent, userId], function (err) {
            if (err) reject(err);
            resolve({ id: this.lastID, ...bugData, userId });
        });
    });
};

module.exports = { getAllBugs, createBug };