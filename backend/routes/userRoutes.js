const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/Users');
const Ticket = require('../models/Ticket');

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

// Get tickets listed by the logged-in user
router.get('/me/listed-tickets', authMiddleware, async (req, res) => {
    try {
        const tickets = await Ticket.find({ owner: req.user.id })
            .select('-createdAt -updatedAt -__v');
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get tickets the logged-in user has enquired about
router.get('/me/enquired-tickets', authMiddleware, async (req, res) => {
    try {
        const tickets = await Ticket.find({ enquiredUsers: req.user.id })
            .select('-createdAt -updatedAt -__v -enquiredUsers -listingFeePaid');
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;