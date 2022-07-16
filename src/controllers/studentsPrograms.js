// const knex = require('knex');
// const config = require('../../configs/index');
const db = require('./db');
const { Forbidden, Unauthorized, InappropriateActionError } = require('../errors');

module.exports = {

    //:id
    getStudentsEducationProgram: async (req, res) => {
        const {id} = req.params;
        const idUser = req.user.id;
        // const db = knex(config[process.env.NODE_ENV || 'development'].database);

        try {
            const program = await db
            .first({
                id: 'ed_pr.id'
            })
            .from({st_ed_pr: 'students_education_programs'})
            .innerJoin({ed_pr: 'education_programs'}, {'st_ed_pr.id_education_program': 'ed_pr.id'})
            .where({'ed_pr.id': id})
            .andWhere({'st_ed_pr.id_user': idUser})
            res.status(200).json(program);
        } catch (error) {
            console.log(error.message);            
            throw new InappropriateActionError('bad request / getStudentsEducationPrograms');
        }
    },

    getStudentsEducationPrograms: async (req, res) => {
        const {id, role} = req.user;
        const status = req.query.status;
        // const db = knex(config[process.env.NODE_ENV || 'development'].database);
    
        try {                 
            if (role === 'admin' && status === 'all') {
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
                    test_finished_at: 'st_ed_pr.test_finished_at',
                    status_updated_at: 'st_ed_pr.status_updated_at'
                })
                .from({st_ed_pr: 'students_education_programs'})
                .innerJoin({u: 'users'}, {'st_ed_pr.id_user': 'u.id'})
                .innerJoin({ed_pr: 'education_programs'}, {'st_ed_pr.id_education_program': 'ed_pr.id'})
                .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
                .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
                .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
                .orderBy('st_ed_pr.id');
                res.status(200).json(st_ed_pr);

            } else if (status !== 'all') {

                const st_ed_pr = await db
                    .select('*')
                    .from({st_ed_pr: db
                        .select({
                            id: 'st_ed_pr.id',
                            id_student: 'st_ed_pr.id_user',
                            login: 'u.login',
                            education_form: 'ed_form.form_name',
                            education_area: 'ed_area.area_name',
                            id_discipline: 'd.id',
                            discipline: 'd.discipline_name',
                            id_program: 'st_ed_pr.id_education_program',
                            profile: 'ed_pr.profile_name',
                            purchase_date: 'st_ed_pr.purchase_date',
                            status_education: 'st_ed_pr.education_status',
                            status_program: 'st_ed_pr.program_status', 
                            modules: 'ed_pr.modules',
                            test_results: 'st_ed_pr.test_results',
                            test_finished_at: 'st_ed_pr.test_finished_at',
                            status_updated_at: 'st_ed_pr.status_updated_at',
                            curator: 'u_с.login',
                            status_curator: 'curators.status_curator',
                            status_curator_user: 'u_с.status_user'
                        })
                        .from({st_ed_pr: 'students_education_programs'})
                        .innerJoin({u: 'users'}, {'st_ed_pr.id_user': 'u.id'})
                        .innerJoin({ed_pr: 'education_programs'}, {'st_ed_pr.id_education_program': 'ed_pr.id'})
                        .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
                        .innerJoin({curators: 'curators_of_disciplines'}, {'d.id': 'curators.id_discipline'})
                        .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
                        .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
                        .innerJoin({u_с: 'users'}, {'curators.id_user_curator': 'u_с.id'})
                        .where({'st_ed_pr.id_user': id})
                        .andWhere({'st_ed_pr.program_status': 'active'})
                        .andWhere({'u.status_user': 'active'})
                        .orderBy(['curators.status_curator', 'u_с.status_user'])
                    }).distinctOn('st_ed_pr.id')
                res.status(200).json(st_ed_pr);

            } else if (role !== 'student' || role !== 'admin') {
                // res.status(403).json({message: 'forbidden / error on getStudentsEducationPrograms'})
                throw new Forbidden('not enough rights / getStudentsEducationPrograms')
            } else {
                // res.status(400).json({message: 'wrong adress / params / error on getStudentsEducationPrograms'})
                throw new InappropriateActionError('wrong adress / params / getStudentsEducationPrograms')
            }
        } catch (error) {
            console.log(error.message);
            throw new InappropriateActionError('bad request / getStudentsEducationPrograms')
        }
    },

    buyStudentsEducationProgram: async (req, res) => {
        
        try {
            const {id} = req.body;
            const idUser = req.user.id;
            // const db = knex(config[process.env.NODE_ENV || 'development'].database);

            await db
            .into('students_education_programs')
            .insert([{
                id_user: idUser,
                id_education_program: id
            }]);
            res.status(200).json({idUser});
        } catch (error) {
            console.log(error.message);
            throw new InappropriateActionError('bad request / getStudentsEducationPrograms')
        }
    },

    updateTestResult: async (req, res) => {
        try {
            const {id, value} = req.body;
            // const db = knex(config[process.env.NODE_ENV || 'development'].database);

            await db
            .from('students_education_programs')
            .update({
                education_status: 'finished',
                test_results: value,
                test_finished_at: new Date().toISOString()         
            })
            .where({id});
            res.status(200).json({message: 'status 200 OK'});
        } catch (error) {
            console.log(error.message);
            throw new InappropriateActionError('bad request / updateStudentsEducationPrograms')
        }
    },

    //status = deleted / finished
    updateStudentsEducationPrograms: async (req, res) => {
        try {            
            const {id, value} = req.body;
            // const db = knex(config[process.env.NODE_ENV || 'development'].database);
            
            if(value === 'deleted') {
                
                await db
                .from('students_education_programs')
                .update({
                    program_status: 'active',
                    status_updated_at: new Date().toISOString()         
                })
                .where({id});
                res.status(200).json({message: 'status 200 OK'});
                
            } else if (value === 'finished') {
                
                await db
                .from('students_education_programs')
                .update({
                    education_status: 'unfinished',
                    status_updated_at: new Date().toISOString()      
                })
                .where({id});
                res.status(200).json({message: 'status 200 OK'});
            } else {
                throw new InappropriateActionError('invalid params passed / updateStudentsEducationPrograms');
                // return res.status(403).json({message: 'not enough rights / error on updateStudentsEducationPrograms'});
            }
        } catch (error) {
            console.log(error.message);
            throw new InappropriateActionError('bad request / updateStudentsEducationPrograms')
        }
        
    },
      
    //status = active / unfinished
    deleteStudentsEducationPrograms: async (req, res) => {

        try {            
            const {id, value} = req.body;
            const role = req.user.role;
            // const db = knex(config[process.env.NODE_ENV || 'development'].database);
            
            if(value === 'active' && role === 'admin') {
                
                await db
                .from('students_education_programs')
                .update({
                    program_status: 'deleted',
                    status_updated_at: new Date().toISOString()         
                })
                .where({id});
                res.status(200).json({message: 'status 200 OK'});
                
            } else if (value === 'unfinished' && role === 'admin') {
                
                await db
                .from('students_education_programs')
                .update({
                    education_status: 'finished',
                    status_updated_at: new Date().toISOString()    
                })
                .where({id});
                res.status(200).json({message: 'status 200 OK'});
            } else if (role === 'student') {
                await db
                .from('students_education_programs')
                .update({
                    education_status: 'finished',
                    status_updated_at: new Date().toISOString()    
                })
                .where({id});
                res.status(200).json({message: 'status 200 OK'});
            } else if (role !== 'admin' || role !== 'student'){
                throw new Forbidden('not enough rights');
                // return res.status(403).json({message: 'not enough rigths'});
            } else {
                throw new InappropriateActionError('invalid params passed / deleteStudentsEducationPrograms');
            }
        } catch (error) {
            // throw new InappropriateActionError('bad rqeuest on deleteStudentsEducationPrograms')
            throw new Forbidden('not enough rights');
        }
    
    },
    
}