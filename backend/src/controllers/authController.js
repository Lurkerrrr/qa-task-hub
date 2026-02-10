const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const user = await authService.register(email, password, name, role);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send("Error registering user: " + err.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        res.status(200).json(data);
    } catch (err) {
        if (err.message === 'User not found' || err.message === 'Invalid Password') {
            res.status(401).send(err.message);
        } else {
            res.status(500).send("Error logging in");
        }
    }
};

module.exports = { register, login };