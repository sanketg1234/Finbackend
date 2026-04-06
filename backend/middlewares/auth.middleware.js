import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ error: 'User not found' });
            }
            if (req.user.status === 'inactive') {
                return res.status(403).json({ 
                    error: 'Your account has been deactivated. Please contact an administrator.' 
                });
            }
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token provided' });
    }
};


export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: `User role '${req.user.role}' is not authorized to access this route` 
            });
        }
        next();
    };
};