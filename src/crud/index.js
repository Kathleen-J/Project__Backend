const knex = require('knex');
const config = require('../../configs/index');

module.exports = {
    
    //                                                      AREAS

    //education_areas (учебные направления) 
    getActiveEducationAreas: async (req, res)   => {
    const db = knex(config.development.database);
    
    const ed_ar = await db
        .select({
        id: 'ed_ar.id',
        name: 'ed_ar.area_name',
        status: 'ed_ar.status_area'
    })
        .from({ed_ar: 'education_areas'})
        .where({'ed_ar.status_area': 'active'})
        .orderBy('ed_ar.id');
    res.status(200).json(ed_ar);
    
    },


    //                                                      PROGRAMS

    //education_programs ?status=all (программы обучения)
    getEducationPrograms: async (req, res) => {
        const status = req.query.status;
        const db = knex(config.development.database);
    
        if (status === 'all') {
            const education_programs = await db
            .select({
                id: 'ed_pr.id',
                education_form: 'ed_form.form_name',
                education_area: 'ed_area.area_name',
                discipline: 'd.discipline_name',
                education_program: 'ed_pr.profile_name',
                profile_name: 'ed_pr.profile_name',
                price: 'ed_pr.price',
                status: 'ed_pr.status_program'
            })
            .from({ed_pr: 'education_programs'})
            .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
            .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
            .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
            .orderBy('ed_pr.price', 'desc');
            res.status(200).json(education_programs);
        } else {
            const education_programs = await db
            .select({
                id: 'ed_pr.id',
                education_form: 'ed_form.form_name',
                education_area: 'ed_area.area_name',
                discipline: 'd.discipline_name',
                education_program: 'ed_pr.profile_name',
                profile_name: 'ed_pr.profile_name',
                price: 'ed_pr.price',
                status: 'ed_pr.status_program'
            })
            .from({ed_pr: 'education_programs'})
            .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
            .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
            .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
            .where({'ed_area.status_area': 'active'})
            .andWhere({'d.status_discipline': 'active'})
            .andWhere({'ed_pr.status_program': 'active'})
            .orderBy('ed_pr.price', 'desc');
            res.status(200).json(education_programs);
        }
    },

    //education_program :id (программа обучения) JOIN
    getActiveEducationProgram: async (req, res) => {
        const {id} = req.params;
        const db = knex(config.development.database);
    
        const education_programs = await db
        .first({
            id: 'ed_pr.id',
            education_form: 'ed_form.form_name',
            education_area: 'ed_area.area_name',
            discipline: 'd.discipline_name',
            education_program: 'ed_pr.profile_name',
            profile_name: 'ed_pr.profile_name',
            price: 'ed_pr.price'
        })
        .from({ed_pr: 'education_programs'})
        .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
        .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
        .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
        .where({'ed_area.status_area': 'active'})
        .andWhere({'d.status_discipline': 'active'})
        .andWhere({'ed_pr.status_program': 'active'})
        .andWhere({'ed_pr.id': id})
        .orderBy('ed_pr.id');
        res.status(200).json(education_programs);
    },

    deleteProgram: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        await db
        .from('education_programs')
        .update({
            status_program: 'deleted'            
        })
        .where({id});
        res.status(200);

        return;
    },

    updateProgram: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        await db
        .from('education_programs')
        .update({
            status_program: 'active'            
        })
        .where({id});
        res.status(200);

        return;
    },


    //                                                      ROLES

    //roles (роли)
    getRoles: async (req, res) => {
        const db = knex(config.development.database);
    
        const roles = await db
        .select({
            id: 'r.id',
            role: 'r.role'
        })
        .from({r: 'roles'});
        res.status(200).json(roles);
    },



    //                                                      USERS

    //users (пользователи)
    getUsers: async (req, res) => {
        const db = knex(config.development.database);
    
        const users = await db
        .select({
            id: 'u.id',
            login: 'u.login',
            password: 'u.password',
            status: 'u.status_user',
            role: 'r.role',
            created: 'u.created_at',
            updated: 'u.updated_at'
        })
        .from({u: 'users'})
        .innerJoin({r: 'roles'}, {'u.id_role': 'r.id'});
        res.status(200).json(users);
    },



    //                                                     STUDENTS

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

    deleteStudent: async (req, res) => {
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

    updateStudent: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        await db
        .from('users')
        .update({
            status_user: 'active',
            updated_at: new Date().toISOString()         
        })
        .where({id});
        res.status(200);

        return;
    },

    updateStudentLogin: async (req, res) => {
        const {id, login} = req.body;
        const db = knex(config.development.database);

        await db
        .from('users')
        .update({
            login,
            updated_at: new Date().toISOString()        
        })
        .where({id});
        res.status(200);

        return;
    },

    updateStudentPassword: async (req, res) => {
        const {id, password} = req.body;
        const db = knex(config.development.database);

        await db
        .from('users')
        .update({
            password,
            updated_at: new Date().toISOString()        
        })
        .where({id});
        res.status(200);

        return;
    },





    //                                                     CURATORS
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
    
    deleteCurator: async (req, res) => {
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

    updateCurator: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        await db
        .from('users')
        .update({
            status_user: 'active',
            updated_at: new Date().toISOString()         
        })
        .where({id});
        res.status(200);

        return;
    },

    updateCuratorLogin: async (req, res) => {
        const {id, login} = req.body;
        const db = knex(config.development.database);

        await db
        .from('users')
        .update({
            login,
            updated_at: new Date().toISOString()        
        })
        .where({id});
        res.status(200);

        return;
    },

    updateCuratorPassword: async (req, res) => {
        const {id, password} = req.body;
        const db = knex(config.development.database);

        await db
        .from('users')
        .update({
            password,
            updated_at: new Date().toISOString()        
        })
        .where({id});
        res.status(200);

        return;
    },




    //                                           STUDENT'S EDUCATION PROGRAMS

    //7.1 students_education_programs (образовательные программы учеников)
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
            status_education: 'st_ed_pr.education_status',
            status_program: 'st_ed_pr.program_status', 
            modules: 'ed_pr.modules',
            progress: 'st_ed_pr.progress',
            test_results: 'st_ed_pr.test_results'
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
                education_status: 'unfinished'       
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
            education_status: 'finished'       
        })
        .where({id});
        res.status(200);
    }
    
    },


    
    //                                             CURATORS OF DISCIPLINES

    //8.1 curators_of_disciplines (кураторы дисциплин)
    getActiveCuratorsOfDisciplines: async (req, res) => {
        const db = knex(config.development.database);
    
        const curators_dis = await db
        .select({
            id: 'curators_dis.id',
            id_curator: 'curators_dis.id_user_curator',
            login: 'u.login',
            education_area: 'ed_area.area_name',
            discipline: 'd.discipline_name',
            status: 'curators_dis.status_curator'
        })
        .from({curators_dis: 'curators_of_disciplines'})
        .innerJoin({u: 'users'}, {'curators_dis.id_user_curator': 'u.id'})
        .innerJoin({d: 'disciplines'}, {'curators_dis.id_discipline': 'd.id'})
        .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
        .where({'u.status_user': 'active'})
        .andWhere({'curators_dis.status_curator': 'active'})
        .orderBy('curators_dis.id');
        res.status(200).json(curators_dis);
    },

    getCuratorsOfDisciplines: async (req, res) => {
        const db = knex(config.development.database);
    
        const curators_dis = await db
        .select({
            id: 'curators_dis.id',
            id_curator: 'curators_dis.id_user_curator',
            login: 'u.login',
            education_area: 'ed_area.area_name',
            discipline: 'd.discipline_name',
            status: 'curators_dis.status_curator'
        })
        .from({curators_dis: 'curators_of_disciplines'})
        .innerJoin({u: 'users'}, {'curators_dis.id_user_curator': 'u.id'})
        .innerJoin({d: 'disciplines'}, {'curators_dis.id_discipline': 'd.id'})
        .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
        .orderBy('curators_dis.id');
        res.status(200).json(curators_dis);
    },

    deleteCuratorsDiscipline: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        await db
        .from('curators_of_disciplines')
        .update({
            status_curator: 'deleted'        
        })
        .where({id});
        res.status(200);

        return;
    },

    updateCuratorsDiscipline: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        await db
        .from('curators_of_disciplines')
        .update({
            status_curator: 'active'      
        })
        .where({id});
        res.status(200);

        return;
    },

};