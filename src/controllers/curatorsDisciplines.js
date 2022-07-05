const knex = require('knex');
const config = require('../../configs/index');

module.exports = {

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
    
}