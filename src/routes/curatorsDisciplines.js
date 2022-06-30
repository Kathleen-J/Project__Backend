const {Router} = require('express');
const { getActiveCuratorsOfDisciplines } = require('../crud/index');

const router = Router();

router.get('/', getActiveCuratorsOfDisciplines);

module.exports = router;