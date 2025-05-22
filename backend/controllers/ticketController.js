const Ticket = require('../models/Ticket');
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

// POST /api/tickets - create a ticket
exports.createTicket = async (req, res) => {
    try {
        const {
            eventName,
            eventDate,
            venue,
            seatNumber,
            ticketType,
            originalPrice,
            resalePrice,
            city
        } = req.body;

        // Pick a random default image from assets
        const defaultImages = ['/assets/default.png', '/assets/default2.png', '/assets/default3.png'];
        const imageUrl = defaultImages[Math.floor(Math.random() * defaultImages.length)];

        const newTicket = new Ticket({
            eventName,
            eventDate,
            venue,
            city,
            seatNumber,
            ticketType,
            originalPrice,
            resalePrice,
            owner: req.user.id,
            listingFeePaid: true,
            imageUrl
        });

        await newTicket.save();
        res.status(201).json({ message: 'Ticket listed successfully', ticket: newTicket });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// GET /api/tickets - get available tickets

// Search by event name:
// GET /api/tickets?eventName=edm

// Search by event name and city:
// GET /api/tickets?city=Mumbai&eventName=concert

// Search by event name and date:
// GET /api/tickets?eventName=cricket&eventDate=2025-06-01

exports.getAvailableTickets = async (req, res) => {
    try {
        const { city, eventDate, eventName } = req.query;
        const query = { status: 'available' };

        if (city) {
            query.city = city;
        }

        if (eventDate) {
            const date = new Date(eventDate);
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);

            query.eventDate = { $gte: date, $lt: nextDate };
        }

        if (eventName) {
            query.eventName = { $regex: eventName, $options: 'i' }; // case-insensitive partial match
        }

        const tickets = await Ticket.find(query).populate('owner', 'username');
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// POST /api/tickets/:id/enquire — to simulate enquiry/payment
exports.enquireTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const userId = req.user.id;

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Check if user already enquired
        if (ticket.enquiredUsers.includes(userId)) {
            return res.status(200).json({ message: 'You already enquired. Contact access is available.' });
        }

        // Simulate payment completed by buyer
        ticket.enquiredUsers.push(userId);
        await ticket.save();

        res.status(200).json({ message: 'Enquiry successful. You can now access seller contact info.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// GET /api/tickets/:id/contact
exports.getSellerContact = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const userId = req.user.id;

        const ticket = await Ticket.findById(ticketId).populate('owner', 'username email phoneno');

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Check if current user is allowed to see contact info
        if (!ticket.enquiredUsers.includes(userId) && ticket.owner._id.toString() !== userId) {
            return res.status(403).json({ message: 'You have not enquired about this ticket.' });
        }

        res.status(200).json({
            owner: {
                username: ticket.owner.username,
                email: ticket.owner.email,
                phoneno: ticket.owner.phoneno
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// PATCH /api/tickets/:id/sold - mark ticket as sold
exports.markTicketSold = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const userId = req.user.id;

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Only owner can mark ticket as sold
        if (ticket.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You are not the owner of this ticket' });
        }

        // Check if already sold
        if (ticket.status === 'sold') {
            return res.status(400).json({ message: 'Ticket is already marked as sold' });
        }

        ticket.status = 'sold';
        await ticket.save();

        res.status(200).json({ message: 'Ticket marked as sold successfully', ticket });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST /api/tickets/:id/image - upload image for a ticket
exports.uploadTicketImage = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }
        ticket.imageUrl = `/uploads/${req.file.filename}`;
        await ticket.save();
        res.status(200).json({ message: 'Image uploaded successfully', imageUrl: ticket.imageUrl });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// GET /api/tickets/:id - get details of a specific ticket (selected fields only)
exports.getTicketById = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId).select('status resalePrice originalPrice ticketType seatNumber city venue eventDate eventName imageUrl');
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getTicketsByDate = async (req, res) => {
    try {
        const now = new Date();
        let start, end;
        const type = req.params.type;

        if (type === 'today') {
            start = new Date(now.setHours(0, 0, 0, 0));
            end = new Date(now.setHours(23, 59, 59, 999));
        } else if (type === 'tomorrow') {
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            start = new Date(tomorrow.setHours(0, 0, 0, 0));
            end = new Date(tomorrow.setHours(23, 59, 59, 999));
        } else if (type === 'weekend') {
            // Find next Saturday
            const day = now.getDay();
            const saturday = new Date(now);
            saturday.setDate(now.getDate() + ((6 - day) % 7));
            start = new Date(saturday.setHours(0, 0, 0, 0));
            // Sunday
            const sunday = new Date(saturday);
            sunday.setDate(saturday.getDate() + 1);
            end = new Date(sunday.setHours(23, 59, 59, 999));
        } else {
            return res.status(400).json({ message: 'Invalid type. Use today, tomorrow, or weekend.' });
        }

        const tickets = await Ticket.find({ eventDate: { $gte: start, $lte: end }, status: 'available' })
            .select('-owner -listingFeePaid -enquiredUsers -createdAt -updatedAt -__v');
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};