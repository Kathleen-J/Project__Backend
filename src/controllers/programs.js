// const knex = require('knex');
// const config = require('../../configs/index');
const db = require('./db');
const { InappropriateActionError, Forbidden } = require('../errors');

module.exports = {

    getEducationPrograms: async (req, res) => {
        // const db = knex(config[process.env.NODE_ENV || 'development'].database);

        try {
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
            .orderBy('ed_pr.price', 'desc')
            .orderBy('ed_pr.id');
            res.status(200).json(education_programs);
        } catch (error) {
            // res.status(400).json({message: 'bad request'});
            throw new InappropriateActionError('bad request / error on getEducationPrograms')
        }
    },

    //education_program :id (программа обучения)
    getActiveEducationProgram: async (req, res) => {
        const {id} = req.params;
        // const db = knex(config[process.env.NODE_ENV || 'development'].database);
    
        try {
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

        } catch (error) {
            throw new InappropriateActionError('bad request on getActiveEducationProgram')
            // return res.status(400).json({message: 'bad request'})
        }
    },

    getAllEducationPrograms: async (req, res) => {
        try {            
            // const db = knex(config[process.env.NODE_ENV || 'development'].database);
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
            .orderBy('ed_pr.price', 'desc')
            .orderBy('ed_pr.id');
            res.status(200).json(education_programs);
        } catch (er) {
            console.log(err.message, 'on getAllEducationPrograms');
            throw new InappropriateActionError('bad request on getActiveEducationProgram')
        }
    },

    deleteProgram: async (req, res) => {
        const {id} = req.body;
        // const db = knex(config[process.env.NODE_ENV || 'development'].database);

        try {            
            await db
            .from('education_programs')
            .update({
                status_program: 'deleted'            
            })
            .where({id});
            res.status(200);
        } catch (error) {
            console.log(error.message, 'error on deleteProgram');
            throw new InappropriateActionError('bad request on deleteProgram');
            // return res.status(403).json({message: 'bad request'})
        }

    },

    updateProgram: async (req, res) => {
        const {id} = req.body;
        // const db = knex(config[process.env.NODE_ENV || 'development'].database);

        try {            
            await db
            .from('education_programs')
            .update({
                status_program: 'active'            
            })
            .where({id});
            res.status(200);
        } catch (error) {
            console.log(error.message, 'error on updateProgram');
            throw new InappropriateActionError('bad request on updateProgram');
            // return res.status(403).json({message: 'bad request on updateProgram'});
        }

    },
}