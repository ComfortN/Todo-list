const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(403).json({ message: 'Invalid token format' });
    }

    const token = tokenParts[1];
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    console.log(token)
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log('Failed to authenticate token:', err.message);
            return res.status(500).json({ message: 'Failed to authenticate token', error: err.message });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
