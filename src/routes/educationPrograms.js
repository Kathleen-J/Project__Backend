const {Router} = require('express');
const { getEducationPrograms, getEducationProgramsJoin } = require('../db/crud/index');

const router = Router();

router.get('/', getEducationPrograms);

module.exports = router;