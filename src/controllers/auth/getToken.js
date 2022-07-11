const bcrypt = require('bcrypt');
const { getUserByLogin } = require('./getUser');
const { createToken } = require('./createToken');

module.exports = {

    getToken: async (req, res) => {
        try {
            const {login, password} = req.body;
            const user = await getUserByLogin(login);
        
            if(!user) {
                return res.status(400).json({message: 'Неверный логин'})
            }
    
            const validPassword = await bcrypt.compare(password, user.password);
    
            if(!validPassword) {
                return res.status(400).json({message: 'Неверный пароль'})
            }
            
            const token = await createToken(user.id, user.login, user.role);
            return res.json({token});
        } catch (error) {
            console.log(error.message);
        }
        
    }
}