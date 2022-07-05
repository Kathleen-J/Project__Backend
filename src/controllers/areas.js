const knex = require('knex');
const config = require('../../configs/index');

module.exports = {

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
}