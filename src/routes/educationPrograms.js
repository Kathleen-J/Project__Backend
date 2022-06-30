const {Router} = require('express');
const { getActiveEducationPrograms, getActiveEducationProgram } = require('../crud/index');

const router = Router();

router.get('/', getActiveEducationPrograms);
router.get('/:id', getActiveEducationProgram)



module.exports = router;