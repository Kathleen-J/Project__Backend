const jwt = require('jsonwebtoken');
const { Unauthorized, Forbidden } = require('../errors');

module.exports = {

    async checkAdmin(req, res, next) {
        try {
            const token = await req.headers.authorization.split(' ')[1];
            if(!token) {
                // throw new Unauthorized('unauthorized');
                // next(new Unauthorized('unauthorized'));
                return res.status(401).json({message: 'unauthorized'})
            }
    
            const decodedData = await jwt.verify(token, 'secret');
            req.user = decodedData;

            if(req.user.role !== 'admin') {
                // throw new Forbidden('not enough rights');
                // next(new Forbidden('not enough rights'));
                return res.status(403).json({message: 'not enough rights'})
            }

            next();
    
        } catch (error) {
            // throw new Unauthorized('unauthorized');
            return res.status(401).json({message: 'unauthorized'});
        }
    }
}

