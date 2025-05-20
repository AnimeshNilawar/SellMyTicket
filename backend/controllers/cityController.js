// controllers/cityController.js

exports.getCities = (req, res) => {
    const cities = [
        "Mumbai",
        "Delhi",
        "Bengaluru",
        "Chennai",
        "Hyderabad",
        "Kolkata",
        "Pune",
        "Ahmedabad",
        "Jaipur"
    ];

    res.status(200).json({ cities });
};
