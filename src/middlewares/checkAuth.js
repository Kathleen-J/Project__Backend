const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');

module.exports = {

    async checkAuth(req, res, next) {
        try {
            const token = await req.headers.authorization.split(' ')[1];
            if(!token) {
                console.log('unauthorized');
                // return res.status(403).json({message: 'Forbidden'})
                next(new Unauthorized('unauthorized'));
            }
    
            const decodedData = await jwt.verify(token, 'secret');
            req.user = decodedData;
            console.log(req.user, '=checkAuth=');
            next();
    
        } catch (error) {
            console.log('unauthorized');
            // return res.status(403).json({message: 'You need to log in'})
            next(new Unauthorized('You need to log in'));
        }
    }
}
