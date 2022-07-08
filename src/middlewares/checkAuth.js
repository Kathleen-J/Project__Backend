const jwt = require('jsonwebtoken');
// const { Unauthorized } = require('../errors');

module.exports = {

    async checkAuth(req, res, next) {
        try {
            const token = await req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(403).json({message: 'Forbidden'})
                // throw new Unauthorized('unauthorized');
                // next(new Unauthorized('unauthorized'));
            }
    
            const decodedData = await jwt.verify(token, 'secret');
            req.user = decodedData;
            console.log(req.user);
            next();
    
        } catch (error) {
            return res.status(403).json({message: 'You need to log in'})
            // throw new Unauthorized('unauthorized');
        }
    }
}
