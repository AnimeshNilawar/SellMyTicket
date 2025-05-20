const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    phoneno: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number'],
    }
}, { timestamps: true });

// Encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT method
userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { id: this._id, username: this.username, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = mongoose.model('User', userSchema);