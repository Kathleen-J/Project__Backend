const {Router} = require('express');
const { getActiveEducationProgram, getEducationPrograms, deleteProgram, updateProgram } = require('../controllers/index');

const router = Router();

router.get('/', getEducationPrograms);
router.get('/:id', getActiveEducationProgram);
router.delete('/:id', deleteProgram);
router.put('/:id', updateProgram);



module.exports = router;