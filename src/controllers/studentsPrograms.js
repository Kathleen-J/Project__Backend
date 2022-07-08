const knex = require('knex');
const config = require('../../configs/index');
const { Forbidden, Unauthorized } = require('../errors');

module.exports = {

    getStudentsEducationPrograms: async (req, res) => {
        const {id, role} = req.user;
        const status = req.query.status;
        const db = knex(config.development.database);
    
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

            } else if (role === 'student' && status !== 'all') {

                const st_ed_pr = await db
                    .select({
                        id: 'st_ed_pr.id',
                        id_student: 'st_ed_pr.id_user',
                        login: 'u.login',
                        education_form: 'ed_form.form_name',
                        education_area: 'ed_area.area_name',
                        id_discipline: 'd.id',
                        discipline: 'd.discipline_name',
                        profile: 'ed_pr.profile_name',
                        purchase_date: 'st_ed_pr.purchase_date',
                        status_education: 'st_ed_pr.education_status',
                        status_program: 'st_ed_pr.program_status', 
                        modules: 'ed_pr.modules',
                        test_results: 'st_ed_pr.test_results',
                        test_finished_at: 'st_ed_pr.test_finished_at',
                        status_updated_at: 'st_ed_pr.status_updated_at',
                        curator: 'u_с.login',
                        status_curator: 'curators.status_curator'
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
                    // .andWhere({'curators.status_curator': 'active'})
                    .andWhere({'st_ed_pr.program_status': 'active'})
                    // .andWhere({"u_c.status_user": 'active'})
                    .distinctOn('st_ed_pr.id')
                    .orderBy('st_ed_pr.id');
                res.status(200).json(st_ed_pr);

                // const st_ed_pr = await db
                // .select({
                //     id: 'st_ed_pr.id',
                //     id_student: 'st_ed_pr.id_user',
                //     login: 'u.login',
                //     education_form: 'ed_form.form_name',
                //     education_area: 'ed_area.area_name',
                //     id_discipline: 'd.id',
                //     discipline: 'd.discipline_name',
                //     profile: 'ed_pr.profile_name',
                //     purchase_date: 'st_ed_pr.purchase_date',
                //     status_education: 'st_ed_pr.education_status',
                //     status_program: 'st_ed_pr.program_status', 
                //     modules: 'ed_pr.modules',
                //     test_results: 'st_ed_pr.test_results',
                //     test_finished_at: 'st_ed_pr.test_finished_at',
                //     status_updated_at: 'st_ed_pr.status_updated_at'
                // })
                // .from({st_ed_pr: 'students_education_programs'})
                // .innerJoin({u: 'users'}, {'st_ed_pr.id_user': 'u.id'})
                // .innerJoin({ed_pr: 'education_programs'}, {'st_ed_pr.id_education_program': 'ed_pr.id'})
                // .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
                // .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
                // .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
                // .orderBy('st_ed_pr.id')
                // .where({'st_ed_pr.program_status': 'active'})
                // .andWhere({'st_ed_pr.id_user': id});
                // res.status(200).json(st_ed_pr);
            } else if (role !== 'student' || role !== 'admin') {
                res.status(403).json({message: 'forbidden / error on getStudentsEducationPrograms'})
            } else {
                res.status(400).json({message: 'wrong adress / params / error on getStudentsEducationPrograms'})
            }
        } catch (error) {
            console.log(error.message, 'on getStudentsEducationPrograms');
        }
    },

    //status = deleted / finished
    updateStudentsEducationPrograms: async (req, res) => {
        const {id, value} = req.body;
        const role = req.user.role;
        const db = knex(config.development.database);
        
        if(value === 'deleted' && role === 'admin') {
            
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
            // throw new Forbidden('not enough rights');
            return res.status(403).json({message: 'not enough rights / error on updateStudentsEducationPrograms'});
        }
        
    },
      
    //status = active / unfinished
    deleteStudentsEducationPrograms: async (req, res) => {
        const {id, value} = req.body;
        const role = req.user.role;
        const db = knex(config.development.database);
        
        if(value === 'active' && role === 'admin') {
            
            await db
            .from('students_education_programs')
            .update({
                program_status: 'deleted',
                status_updated_at: new Date().toISOString()         
            })
            .where({id});
            res.status(200).json({message: 'status 200 OK'});
            
        } else if (value === 'unfinished') {
            
            await db
            .from('students_education_programs')
            .update({
                education_status: 'finished',
                status_updated_at: new Date().toISOString()    
            })
            .where({id});
            res.status(200).json({message: 'status 200 OK'});
        } else {
            // throw new Forbidden('not enough rights');
            return res.status(403).json({message: 'not enough rigths'});
        }
    
    },
    
}