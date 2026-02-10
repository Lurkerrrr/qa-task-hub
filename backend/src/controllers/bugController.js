const bugService = require('../services/bugService');

const getBugs = async (req, res) => {
    try {
        const bugs = await bugService.getAllBugs(req.userId, req.userRole);
        res.json(bugs);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createBug = async (req, res) => {
    try {
        const newBug = await bugService.createBug(req.body, req.userId);
        res.status(201).json(newBug);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { getBugs, createBug };