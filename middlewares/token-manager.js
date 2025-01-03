import jwt from 'jsonwebtoken';

export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Forbidden: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
        console.log('Authorization Header:', req.headers.authorization);
        console.log('Decoded Token:', jwt.decode(token));
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

};
