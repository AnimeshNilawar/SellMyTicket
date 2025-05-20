const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Authorization header format: "Bearer <token>"
    const authHeader = req.header('Authorization') || req.header('authorization');
    if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided.' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. Token missing.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info for next middleware/controllers
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
// This middleware checks for a valid JWT token in the Authorization header.