const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/Users');

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password -createdAt -updatedAt -__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });  
    }
});

module.exports = router;