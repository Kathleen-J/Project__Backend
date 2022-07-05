const knex = require('knex');
const config = require('../../configs/index');

module.exports = {

    getStudentsEducationPrograms: async (req, res) => {
        const db = knex(config.development.database);
    
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
    },

    updateStudentsEducationPrograms: async (req, res) => {
        const {id, value} = req.body;
        const db = knex(config.development.database);
        
        if(value === 'deleted') {
            
            await db
            .from('students_education_programs')
            .update({
                program_status: 'active',
                status_updated_at: new Date().toISOString()         
            })
            .where({id});
            res.status(200);
            
        } else if (value === 'finished') {
            
            await db
            .from('students_education_programs')
            .update({
                education_status: 'unfinished',
                status_updated_at: new Date().toISOString()      
            })
            .where({id});
            res.status(200);
        }
        
    },
      
    deleteStudentsEducationPrograms: async (req, res) => {
    const {id, value} = req.body;
    const db = knex(config.development.database);
    
    if(value === 'active') {
        
        await db
        .from('students_education_programs')
        .update({
            program_status: 'deleted',
            status_updated_at: new Date().toISOString()         
        })
        .where({id});
        res.status(200);
        
    } else if (value === 'unfinished') {
        
        await db
        .from('students_education_programs')
        .update({
            education_status: 'finished',
            status_updated_at: new Date().toISOString()    
        })
        .where({id});
        res.status(200);
    }
    
    },
    
}