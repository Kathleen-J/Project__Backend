// const knex = require('knex');
// const config = require('../../configs/index');
const db = require('../db');
const { Forbidden } = require('../errors');

module.exports = {

    getCuratorsOfDisciplines: async (req, res) => {
        
        try {
            // const db = knex(config[process.env.NODE_ENV || 'development'].database);
            const curators_dis = await db
                .select({
                    id: 'curators_dis.id',
                    id_curator: 'curators_dis.id_user_curator',
                    login: 'u.login',
                    education_area: 'ed_area.area_name',
                    id_discipline: 'd.id',
                    discipline: 'd.discipline_name',
                    status: 'curators_dis.status_curator'
                })
                .from({curators_dis: 'curators_of_disciplines'})
                .innerJoin({u: 'users'}, {'curators_dis.id_user_curator': 'u.id'})
                .innerJoin({d: 'disciplines'}, {'curators_dis.id_discipline': 'd.id'})
                .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
                .orderBy('curators_dis.id');
                res.status(200).json(curators_dis);
        } catch (error) {
            console.log(error.message);
            // throw new InappropriateActionError('error on getCuratorsOfDisciplines');
            throw new Forbidden('not enough rights');
        }
    },

    deleteCuratorsDiscipline: async (req, res) => {
        const {id} = req.body;
        // const db = knex(config[process.env.NODE_ENV || 'development'].database);

        try {            
            await db
            .from('curators_of_disciplines')
            .update({
                status_curator: 'deleted'        
            })
            .where({id});
            res.status(200);
    
        } catch (error) {
            console.log(error.message, 'on deleteCuratorsDiscipline');
            throw new Forbidden('not enough rights');
            // return res.status(403).json({message: 'not unough rights'})
        }
    },

    updateCuratorsDiscipline: async (req, res) => {
        const {id} = req.body;
        // const db = knex(config[process.env.NODE_ENV || 'development'].database);

        try {            
            await db
            .from('curators_of_disciplines')
            .update({
                status_curator: 'active'      
            })
            .where({id});
            res.status(200);
        } catch (error) {
            // return res.status(403).json({message: 'not unough rights'})
            console.log(error.message, 'on updateCuratorsDiscipline');
            throw new Forbidden('not unough rights');
        }

    },
    
}