const db = require('../../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (email, password, name, role = 'user') => {
    return new Promise((resolve, reject) => {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const sql = `INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)`;
        db.run(sql, [email, hashedPassword, name, role], function (err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, email, name, role });
        });
    });
};

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.get(sql, [email], (err, user) => {
            if (err) return reject(err);
            if (!user) return reject(new Error('User not found'));

            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) return reject(new Error('Invalid Password'));

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: 86400
            });

            resolve({ auth: true, token, user: { id: user.id, name: user.name, role: user.role } });
        });
    });
};

module.exports = { register, login };