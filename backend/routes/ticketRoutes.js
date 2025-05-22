const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ticketController = require('../controllers/ticketController');
const multer = require('multer');
const path = require('path');

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Create a new ticket (protected, with image upload)
router.post('/', authMiddleware, ticketController.createTicket);

// Get all available tickets (public)
router.get('/', ticketController.getAvailableTickets);

// Enquire about a ticket (protected)
router.post('/:id/enquire', authMiddleware, ticketController.enquireTicket);

// Get ticket details
router.get('/:id/contact', authMiddleware, ticketController.getSellerContact);

// Update ticket status
router.patch('/:id/sold', authMiddleware, ticketController.markTicketSold);

// Upload image for a ticket (protected)
router.post('/:id/image', authMiddleware, upload.single('image'), ticketController.uploadTicketImage);

// Get details of a specific ticket
router.get('/:id', ticketController.getTicketById);

module.exports = router;
