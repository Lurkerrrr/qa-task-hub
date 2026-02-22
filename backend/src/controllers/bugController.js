const bugService = require('../services/bugService');

const getBugs = async (req, res, next) => {
    try {
        const bugs = await bugService.getAllBugs(req.userId, req.userRole);
        res.json(bugs);
    } catch (err) {
        // Passes the error to the global errorHandler
        next(err);
    }
};

const createBug = async (req, res, next) => {
    try {
        const newBug = await bugService.createBug(req.body, req.userId);
        res.status(201).json(newBug);
    } catch (err) {
        next(err);
    }
};

module.exports = { getBugs, createBug };