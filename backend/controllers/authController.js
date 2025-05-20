const User = require('../models/Users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // Check if user already exists
        const { username, email, phoneno } = req.body;
        const existingUser = await User.findOne({
            $or: [
                { username },
                { email },
                { phoneno }
            ]
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User(req.body);
        await user.save();
        const token = user.generateJWT();

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phoneno: user.phoneno,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateJWT();

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}