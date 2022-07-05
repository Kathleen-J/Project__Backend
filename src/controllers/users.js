const knex = require('knex');
const config = require('../../configs/index');
const bcrypt = require('bcrypt');

module.exports = {

    getStudents: async (req, res) => {
        const db = knex(config.development.database);

        const students = await db
        .select({
            id: 'u.id',
            login: 'u.login',
            status: 'u.status_user',
            role: 'r.role',
            created: 'u.created_at',
            updated: 'u.updated_at'
        })
        .from({u: 'users'})
        .innerJoin({r: 'roles'}, {'u.id_role': 'r.id'})
        .where({'r.role': 'student'})
        .orderBy('u.id');
        res.status(200).json(students);
    },

    getCurators: async (req, res) => {
        const db = knex(config.development.database);

        const curators = await db
        .select({
            id: 'u.id',
            login: 'u.login',
            status: 'u.status_user',
            role: 'r.role',
            created: 'u.created_at',
            updated: 'u.updated_at'
        })
        .from({u: 'users'})
        .innerJoin({r: 'roles'}, {'u.id_role': 'r.id'})
        .where({'r.role': 'curator'})
        .orderBy('u.id');
        res.status(200).json(curators);
    },

    createUser: async (req, res) => {
        const {role, login, password} = req.body;
        const db = knex(config.development.database);

        if (role === 'curator') {            
            await db
            .into('users')
            .insert([{
              login,
              password: await bcrypt.hash(password, 8),
              created_at: new Date().toISOString(),
              id_role: 2
            }]);
            res.status(200).json({login, password});
      
            return;
        } else if (role === 'student') {
            await db
            .into('users')
            .insert([{
              login,
              password: await bcrypt.hash(password, 8),
              created_at: new Date().toISOString(),
              id_role: 1
            }]);
            res.status(200).json({login, password});
      
            return;
        }
    },

    deleteUser: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        await db
        .from('users')
        .update({
            status_user: 'deleted',
            updated_at: new Date().toISOString()         
        })
        .where({id});
        res.status(200);

        return;
    },
    
    updateUser: async (req, res) => {
        const {id, login, password} = req.body;
        const db = knex(config.development.database);
        
        if(req.body.id && (Object.keys(req.body).length < 2)) {
            await db
            .from('users')
            .update({
                status_user: 'active',
                updated_at: new Date().toISOString()         
            })
            .where({id});
            res.status(200);
    
            return;
        } else  if (req.body.id && req.body.login && (Object.keys(req.body).length < 3)) {
            await db
            .from('users')
            .update({
                login,
                updated_at: new Date().toISOString()        
            })
            .where({id});
            res.status(200);
    
            return;
        } else  if (req.body.id && req.body.password && (Object.keys(req.body).length < 3)) {
            await db
            .from('users')
            .update({
                password: await bcrypt.hash(password, 8),
                updated_at: new Date().toISOString()        
            })
            .where({id});
            res.status(200);
    
            return;
        } else {
            throw new Error('invalid parameters passed');
            
        }
    },
}