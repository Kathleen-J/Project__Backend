const knex = require('knex');
const config = require('../../configs/index');
const bcrypt = require('bcrypt');
const { Forbidden, InappropriateActionError } = require('../errors');

module.exports = {

    getStudents: async (req, res) => {

        try {            
            const id = await req.user.id;
            const role = await req.user.role;
            const status = await req.query.status;
            const db = knex(config.development.database);
    
            if(status === 'all' && role === 'admin') {            
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
    
            } else if (status !== 'all' && role === 'curator'){
                const st_ed_pr = await db
                .select({
                    id: 'st_ed_pr.id',
                    id_student: 'st_ed_pr.id_user',
                    login: 'u.login',
                    education_form: 'ed_form.form_name',
                    education_area: 'ed_area.area_name',
                    discipline: 'd.discipline_name',
                    profile: 'ed_pr.profile_name',
                    purchase_date: 'st_ed_pr.purchase_date',
                    status_education: 'st_ed_pr.education_status',
                    status_program: 'st_ed_pr.program_status', 
                    modules: 'ed_pr.modules',
                    test_results: 'st_ed_pr.test_results',
                    test_finished_at: 'st_ed_pr.test_finished_at'
                })
                .from({st_ed_pr: 'students_education_programs'})
                .innerJoin({u: 'users'}, {'st_ed_pr.id_user': 'u.id'})
                .innerJoin({ed_pr: 'education_programs'}, {'st_ed_pr.id_education_program': 'ed_pr.id'})
                .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
                .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
                .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
                .innerJoin({curators: 'curators_of_disciplines'}, {'d.id': 'curators.id_discipline'})
                .where({"curators.id_user_curator": id})
                .andWhere({"u.status_user": 'active'})
                .andWhere({'st_ed_pr.education_status': 'unfinished'})
                .andWhere({'st_ed_pr.program_status': 'active'})
                .orderBy('st_ed_pr.id');
    
                res.status(200).json(st_ed_pr);
            } else if (role !== 'admin' || role !== 'curator') {
                throw new Forbidden('not enough rights');
            } else {
                // res.status(400).json({message: 'wrong adress / role in getStudents'})
                throw new InappropriateActionError('bad request getStudents');
            }
        } catch (error) {
            console.log(error.message);
            // throw new InappropriateActionError('error on getStudents');
            throw new Forbidden('not enough rights');
        }
    },

    getCurators: async (req, res) => {

        try {            
            const {id, role} = req.user;
            const status = req.query.status;
            const db = await knex(config.development.database);
    
            if(status === 'all' && role === 'admin') {            
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
                const query = await curators;
                res.status(200).json(query);
            } else if (status !== 'all' && role === 'student') {
                const st_ed_pr = await db
                .select({
                    id: 'st_ed_pr.id',
                    id_curator: 'curators.id_user_curator',
                    login: 'u.login'
                })
                .from({st_ed_pr: 'students_education_programs'})
                .innerJoin({ed_pr: 'education_programs'}, {'st_ed_pr.id_education_program': 'ed_pr.id'})
                .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
                .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
                .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
                .innerJoin({curators: 'curators_of_disciplines'}, {'d.id': 'curators.id_discipline'})
                .innerJoin({u: 'users'}, {'curators.id_user_curator': 'u.id'})
                .andWhere({"u.status_user": 'active'})
                .andWhere({'st_ed_pr.id_user': id})
                .andWhere({'curators.status_curator': 'active'})
                .distinctOn('u.login');
    
                const query = await st_ed_pr;
                res.status(200).json(query);
            } else if (role !== 'admin' || role !== 'student') {
                throw new Forbidden('not enough rights / getCurators');
            } else {
                throw new InappropriateActionError('error in request / getCurators');
                // res.status(400).json({message: 'wrong adress / role in getCurators'})
            }
        } catch (error) {
            console.log(error.message);    
            // throw new InappropriateActionError('error in request / getCurators');
            throw new Forbidden('not enough rights');
        }
    },

    createUser: async (req, res) => {
        try {
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
            } else {
                console.log('bad request on createUser');
                throw new InappropriateActionError('bad request on createUser');
                // return res.status(400).json({message: 'bad request / error on createUser'});
            }            
        } catch (error) {
            console.log(error.message);
            throw new InappropriateActionError('bad request on createUser');
        }
    },

    deleteUser: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        try {            
            await db
            .from('users')
            .update({
                status_user: 'deleted',
                updated_at: new Date().toISOString()         
            })
            .where({id});
            res.status(200);
        } catch (error) {
            console.log(error.message);
            throw new InappropriateActionError('bad request on deleteUser');
        }

    },
    
    updateUser: async (req, res) => {
        try {
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
                throw new InappropriateActionError('invalid parameters passed / updateUser');
                // return res.status(400).json({message: 'invalid parameters passed / error on updateUser'});
                
            }            
        } catch (error) {
            console.log(error.message);
            throw new InappropriateActionError('bad request / updateUser');
        }
    },
}