const jwt = require('jsonwebtoken');

module.exports = {

    createToken(id, login, role) {        
        
        const payload = {
            id,
            login,
            role
        }

        return jwt.sign(payload, 'secret');
        
        },
}