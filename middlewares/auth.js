import jwt from 'jsonwebtoken';

const JWt_secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Acesso não autorizado' });
    }
    try {
        console.log(`Token original recebido: "${token}"`);
        console.log(`Token após replace: "${token.replace('Bearer', '')}"`);

        const decoded = jwt.verify(token.replace('Bearer ', ''), JWt_secret);
        req.userId = decoded.id;
        console.log(decoded);

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

export default auth;