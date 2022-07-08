const knex = require('knex');
const config = require('../../configs/index');
const { Forbidden } = require('../errors');

module.exports = {

    getCuratorsOfDisciplines: async (req, res) => {
        
        try {                        
            const {id, role} = req.user;
            const status = req.query.status;
            const db = knex(config.development.database);
            
            //все дисциплины кураторов для админа
            if(role === 'admin' && status === 'all') {            
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

            //дисциплины для конкретного куратора
            } else if (role === 'curator' && status !== 'all') {                
                const curators_dis = await db
                .select({
                    id: 'curators_dis.id',
                    id_curator: 'curators_dis.id_user_curator',
                    login: 'u.login',
                    education_area: 'ed_area.area_name',
                    id_discipline: 'd.id',
                    status_discipline: 'd.status_discipline',
                    discipline: 'd.discipline_name',
                    status: 'curators_dis.status_curator'
                })
                .from({curators_dis: 'curators_of_disciplines'})
                .innerJoin({u: 'users'}, {'curators_dis.id_user_curator': 'u.id'})
                .innerJoin({d: 'disciplines'}, {'curators_dis.id_discipline': 'd.id'})
                .innerJoin({ed_area: 'education_areas'}, {'d.id_education_area': 'ed_area.id'})
                .orderBy('curators_dis.id')
                .where({'d.status_discipline': 'active'})
                .andWhere({'curators_dis.id_user_curator': id});
                res.status(200).json(curators_dis);
            } else if (role !== 'admin' || role !== 'curator'){
                return res.status(403).json({message: 'not unough rights'})
            } else {
                console.log('bad requeest, error on getCuratorsOfDisciplines');
            }
        } catch (error) {
            // throw new Forbidden('not enough rights');
            console.log(error.message);
        }
    },

    deleteCuratorsDiscipline: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        try {            
            await db
            .from('curators_of_disciplines')
            .update({
                status_curator: 'deleted'        
            })
            .where({id});
            res.status(200);
    
        } catch (error) {
            // throw new Forbidden('not enough rights');
            // return res.status(403).json({message: 'not unough rights'})
            console.log(error.message, 'on deleteCuratorsDiscipline');
        }
    },

    updateCuratorsDiscipline: async (req, res) => {
        const {id} = req.body;
        const db = knex(config.development.database);

        try {            
            await db
            .from('curators_of_disciplines')
            .update({
                status_curator: 'active'      
            })
            .where({id});
            res.status(200);
        } catch (error) {
            // throw new Forbidden('not unough rights');
            // return res.status(403).json({message: 'not unough rights'})
            console.log(error.message, 'on updateCuratorsDiscipline');
        }

    },
    
}