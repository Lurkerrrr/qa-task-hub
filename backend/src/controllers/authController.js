const authService = require('../services/authService');

const register = async (req, res, next) => {
    try {
        const { email, password, name, role } = req.body;
        const user = await authService.register(email, password, name, role);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login };