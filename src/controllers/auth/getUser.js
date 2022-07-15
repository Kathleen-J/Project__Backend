const knex = require('knex');
const config = require('../../../configs/index');

module.exports = {

    async getUserByLogin(login) {
        const db = knex(config[process.env.NODE_ENV || 'development'].database);
        
        const user = await db
            .first({
                id: 'u.id',
                login: 'u.login',
                password: 'u.password',
                status: 'u.status_user',
                role: 'r.role',
                created: 'u.created_at',
                updated: 'u.updated_at'
        })
            .from({u: 'users'})
            .innerJoin({r: 'roles'}, {'u.id_role': 'r.id'}) 
            .where({login});
            
            return user;
        
        },
}