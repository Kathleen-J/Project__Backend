const knex = require('knex');
const config = require('../../configs/index');

module.exports = {

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

    //education_program :id (программа обучения)
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
}