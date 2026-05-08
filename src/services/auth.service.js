const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async ({ name, email, password }) => {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return {
        user,
        token: generateToken(user._id)
    };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");

    return {
        user,
        token: generateToken(user._id)
    };
};