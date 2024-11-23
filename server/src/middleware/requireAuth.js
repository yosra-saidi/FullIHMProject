import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const requireAuth = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];

    // Check if token is in valid format
    if (!token || token.split('.').length !== 3) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    try {
        // Verify token and extract user ID
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Check if user ID exists
        if (!_id) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Find user by ID and attach to request
        req.user = await User.findById(_id).select("_id");

        if (!req.user) {
            return res.status(401).json({ error: "User not found" });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authorization error:", error.message); // Improved logging
        res.status(401).json({ error: "Request is not authorized" });
    }
};

export default requireAuth;
