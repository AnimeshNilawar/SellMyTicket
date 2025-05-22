const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    seatNumber: {
        type: String,
        default: 'General'
    },
    ticketType: {
        type: String,
        default: 'Standard'
    },
    originalPrice: {
        type: Number,
        required: true
    },
    resalePrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listingFeePaid: {
        type: Boolean,
        default: true // Assume paid for now

    },
    enquiredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }],
    imageUrl: {
        type: String,
        default: ''
    }

}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
