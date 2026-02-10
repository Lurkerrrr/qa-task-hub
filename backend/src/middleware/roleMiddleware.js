const checkIsAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).send({ message: "Require Admin Role!" });
    }
    next();
};

module.exports = checkIsAdmin;