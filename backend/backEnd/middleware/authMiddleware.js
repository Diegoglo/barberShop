const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send('Token no proporcionado');
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send('Fallo al autenticar el token');
        }
        req.user = decoded;
        next();
    });
};
