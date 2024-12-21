const { UnauthenticatedError } = require('../errors');
const { verifyToken } = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload  = verifyToken({token});
        req.user = {
            name: payload.name,
            email: payload.email,
            role: payload.role
        };
        
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};

module.exports = authMiddleware; 