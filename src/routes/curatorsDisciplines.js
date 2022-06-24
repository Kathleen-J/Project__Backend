const {Router} = require('express');
const { getCuratorsOfDisciplines, getCuratorsOfDisciplinesJoin } = require('../db/crud/index');

const router = Router();

router.get('/', getCuratorsOfDisciplines);
// router.get('/', getCuratorsOfDisciplinesJoin);

module.exports = router;