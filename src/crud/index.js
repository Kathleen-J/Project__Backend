//crud, test vershion
const knex = require('knex');
const config = require('../../configs/index');

module.exports = {
    
    //                                                      GET

    //1.0 education_forms (формы обучения)
    getEducationForms: async (req, res)   => {
        const db = knex(config.development.database);
      
        const ed_forms = await db
          .select({
            id: 'ed_f.id',
            name: 'ed_f.form_name'
        })
          .from({ed_f: 'education_forms'});
        res.status(200).json(ed_forms);
    },

    //2.0 education_areas (учебные направления) 
    getActiveEducationAreas: async (req, res)   => {
    const db = knex(config.development.database);
    
    const ed_ar = await db
        .select({
        id: 'ed_ar.id',
        name: 'ed_ar.area_name',
        status: 'ed_ar.status_area'
    })
        .from({ed_ar: 'education_areas'})
        .where({'ed_ar.status_area': 'active'});
    res.status(200).json(ed_ar);
    
    },

    //3.1 disciplines (дисциплины) JOIN 
    getActiveDisciplines: async (req, res)   => {
        const db = knex(config.development.database);
    
        const disciplines = await db
        .select({
            id: 'd.id',
            education_area: 'ed_ar.area_name',
            discipline_name: 'd.discipline_name'
        })
        .from({d: 'disciplines'})
        .innerJoin({ed_ar: 'education_areas'}, {'d.id_education_area': 'ed_ar.id'})
        .where({'ed_ar.status_area': 'active'})
        .andWhere({'d.status_discipline': 'active'});
        res.status(200).json(disciplines);
        
    },

    //4.0 education_programs (программы обучения)
    getEducationPrograms: async (req, res) => {
        const db = knex(config.development.database);
    
        const education_programs = await db
        .select({
            id: 'ed_pr.id',
            education_form: 'ed_pr.id_education_form',
            discipline: 'ed_pr.id_discipline',
            profile_name: 'ed_pr.profile_name',
            status: 'ed_pr.status_program',
            price: 'ed_pr.price',
            modules: 'ed_pr.modules'
        })
        .from({ed_pr: 'education_programs'});
        res.status(200).json(education_programs);
    },

    //4.1 education_programs (программы обучения) JOIN
    getActiveEducationPrograms: async (req, res) => {
        const db = knex(config.development.database);
    
        const education_programs = await db
        .select({
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
        .andWhere({'ed_pr.status_program': 'active'});
        res.status(200).json(education_programs);
    },

    //4.2 education_program:id (программа обучения) JOIN
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
        .andWhere({'ed_pr.id': id});
        res.status(200).json(education_programs);
    },

    //5.0 roles (роли)
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

    //6.0 users (пользователи)
    getUsers: async (req, res) => {
        const db = knex(config.development.database);
      
        const users = await db
          .select({
            id: 'u.id',
            login: 'u.login',
            password: 'u.password',
            status: 'u.status_user',
            role: 'u.id_role',
            created: 'u.created_at',
            updated: 'u.updated_at'
        })
          .from({u: 'users'});
        res.status(200).json(users);
    },

    //6.1 users (пользователи) JOIN 
    getActiveUsers: async (req, res) => {
        const db = knex(config.development.database);
    
        const users = await db
        .select({
            id: 'u.id',
            login: 'u.login',
            password: 'u.password',
            status: 'u.status_user',
            role: 'r.role'
        })
        .from({u: 'users'})
        .innerJoin({r: 'roles'}, {'u.id_role': 'r.id'})
        .where({'u.status_user': 'active'});
        res.status(200).json(users);
    },

    //7.1 students_education_programs (образовательные программы учеников)
    getStudentsEducationPrograms: async (req, res) => {
        const db = knex(config.development.database);
    
        const st_ed_pr = await db
        .select({
            id: 'st_ed_pr.id',
            login: 'u.login',
            education_form: 'ed_form.form_name',
            education_area: 'ed_area.area_name',
            discipline: 'd.discipline_name',
            profile: 'ed_pr.profile_name',
            status: 'st_ed_pr.education_status',
            modules: 'ed_pr.modules',
            progress: 'st_ed_pr.progress',
            test_results: 'st_ed_pr.test_results'
        })
        .from({st_ed_pr: 'students_education_programs'})
        .innerJoin({u: 'users'}, {'st_ed_pr.id_user': 'u.id'})
        .innerJoin({ed_pr: 'education_programs'}, {'st_ed_pr.id_education_program': 'ed_pr.id'})
        .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
        .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
        .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'});
        res.status(200).json(st_ed_pr);
    },

    //8.1 curators_of_disciplines (кураторы дисциплин)
    getActiveCuratorsOfDisciplines: async (req, res) => {
        const db = knex(config.development.database);
    
        const curators_dis = await db
        .select({
            id: 'curators_dis.id',
            login: 'u.login',
            education_area: 'ed_area.area_name',
            discipline: 'd.discipline_name'
        })
        .from({curators_dis: 'curators_of_disciplines'})
        .innerJoin({u: 'users'}, {'curators_dis.id_user_curator': 'u.id'})
        .innerJoin({d: 'disciplines'}, {'curators_dis.id_discipline': 'd.id'})
        .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
        .where({'u.status_user': 'active'})
        .andWhere({'curators_dis.status_curator': 'active'});
        res.status(200).json(curators_dis);
    },

    //9.1 curators_distribution (распределение кураторов) JOIN 
    getCuratorsDistribution: async (req, res) => {
        const db = knex(config.development.database);
    
        const curators = await db
        .select({
            id: 'c_d.id',
            student: 'us1.login',
            education_form: 'ed_form.form_name',
            education_area: 'ed_area.area_name',
            discipline: 'd.discipline_name',
            profile: 'ed_pr.profile_name',
            status: 'st_ed_pr.education_status',
            progress: 'st_ed_pr.progress',
            test_result: 'st_ed_pr.test_results',
            curator: 'us2.login'
        })
        .from({c_d: 'curators_distribution'})
        .innerJoin({st_ed_pr: 'students_education_programs'}, {'c_d.id_student_education_program': 'st_ed_pr.id'})
        .innerJoin({ed_pr: 'education_programs'}, {'st_ed_pr.id_education_program': 'ed_pr.id'})
        .innerJoin({d: 'disciplines'}, {'ed_pr.id_discipline': 'd.id'})
        .innerJoin({ed_form: 'education_forms'}, {'ed_pr.id_education_form': 'ed_form.id'})
        .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
        .innerJoin({curators_dis: 'curators_of_disciplines'}, {'c_d.id_curator_of_discipline': 'curators_dis.id'})
        .innerJoin({us1: 'users'}, {'st_ed_pr.id_user': 'us1.id'})
        .innerJoin({us2: 'users'}, {'curators_dis.id_user_curator': 'us2.id'});
        res.status(200).json(curators);
    },



    //                                                   [ON PROGRESS]
    //                                               POST / PUT / DELETE

    //1.0 education_areas (учебные направления)

    //create
    createArea: async (req, res) => {
        const db = knex(config.development.database);
        const areaName = req.body;

        const educationArea = await db
            .into('education_areas')
            .insert({
                area_name: areaName
            });

        res.status(200).json({educationArea});
    },
    /**
     * fetch(`/api/areas`, {
     *      method: 'POST',
     *      body: JSON.stringify({areaName: nameArea.value}),
     *      headers: { 'Content-Type': 'application/json' }
     * });
     */

    //update
    updateAreaName: async (req, res) => {
        const db = knex(config.development.database);
        const { nameArea, areaId } = req.body;

        await db    
            .from('education_areas')
            .update({
                area_name: nameArea
            })
            .where({id: areaId});
        res.status(200);
    },
    /**
     * fetch(`/api/areas/${event.target.dataset.id}`, {
     *      method: 'PUT',
     *      body: JSON.stringify(
     *                   {nameArea: name.value},
     *                   {areaId: event.target.dataset.id}
     *      ),
     *      headers: { 'Content-Type': 'application/json' }
     * });
     */
    
     updateAreaStatus: async (req, res) => {
        const db = knex(config.development.database);
        const { areaId } = req.body;

        await db    
            .from('education_areas')
            .update({
                status_area: 'active'
            })
            .where({id: areaId});
        res.status(200);
    },
    /**
     * fetch(`/api/areas/${event.target.dataset.id}`, {
     *      method: 'PUT',
     *      body: JSON.stringify(
     *                   {areaId: event.target.dataset.id}
     *      ),
     *      headers: { 'Content-Type': 'application/json' }
     * });
     */
    

    //delete
    deleteArea: async (req, res) => {
        const db = knex(config.development.database);
        const { areaId } = req.body;

        await db    
            .from('education_areas')
            .update({
                status_area: 'deleted'
            })
            .where({id: areaId});
        res.status(200);
    },
    /**
     * fetch(`/api/areas/${event.target.dataset.id}`, {
     *      method: 'DELETE',
     *      body: JSON.stringify(
     *                   {areaId: event.target.dataset.id}
     *      ),
     *      headers: { 'Content-Type': 'application/json' }
     * });
     */
    


    //2.0 disciplines (учебные направления)

    //create
    createDiscipline: async (req, res) => {
        const db = knex(config.development.database);
        const { nameDiscipline, areaId } = req.body;

        const discipline = await db
            .into('disciplines')
            .insert([{
                id_education_area: areaId,
                discipline_name: nameDiscipline
            }]);

        res.status(200).json({discipline});
    },
    /**
     * fetch(`/api/disciplines`, {
     *      method: 'POST',
     *      body: JSON.stringify({nameDiscipline: disciplineName.value}, {areaId: event.target.dataset.id}),
     *      headers: { 'Content-Type': 'application/json' }
     * });
     */


    //update
    updateAreaOfDiscipline: async (req, res) => {
        const db = knex(config.development.database);
        const { disciplineId, areaId } = req.body;

        await db    
            .from('disciplines')
            .update({
                id_education_area: areaId
            })
            .where({id: disciplineId});
        res.status(200);
    },
    /**
     * fetch(`/api/areas/${event.target.dataset.id}`, {
     *      method: 'PUT',
     *      body: JSON.stringify(
     *                   {areaId: event.target.dataset.name},
     *                   {disciplineId: event.target.dataset.id}
     *      ),
     *      headers: { 'Content-Type': 'application/json' }
     * });
     */

};