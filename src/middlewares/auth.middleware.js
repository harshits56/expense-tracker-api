const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            res.status(401).json({ message: "Unauthorized" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "No token" });
    }
};