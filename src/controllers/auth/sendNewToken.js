const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../../errors');
const { createToken } = require('./createToken');

module.exports = {

    sendNewToken: async(req, res) => {
        try {
            const oldToken = await req.headers.authorization.split(' ')[1];
            const {login} = req.body;

            const decodedData = await jwt.verify(oldToken, 'secret');
            req.user = decodedData;            
            const token = await createToken(req.user.id, login, req.user.role);
            return res.json({token});

        } catch (error) {
            console.log(error.message);
            throw new Unauthorized('unauthorized');
        }
        
    }
}
