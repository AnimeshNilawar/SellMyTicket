const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ticketController = require('../controllers/ticketController');

// Create a new ticket (protected)
router.post('/', authMiddleware, ticketController.createTicket);

// Get all available tickets (public)
router.get('/', ticketController.getAvailableTickets);

// Enquire about a ticket (protected)
router.post('/:id/enquire', authMiddleware, ticketController.enquireTicket);

// Get ticket details
router.get('/:id/contact', authMiddleware, ticketController.getSellerContact);

// Update ticket status
router.patch('/:id/sold', authMiddleware, ticketController.markTicketSold);

module.exports = router;
