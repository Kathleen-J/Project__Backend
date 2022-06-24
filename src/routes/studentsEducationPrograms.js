const {Router} = require('express');
const { getStudentsEducationPrograms, getStudentsEducationProgramsJoin } = require('../db/crud/index');

const router = Router();

router.get('/', getStudentsEducationPrograms);
//router.get('/', getStudentsEducationProgramsJoin);

module.exports = router;