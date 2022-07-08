const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { getActiveEducationProgram, getEducationPrograms, deleteProgram, updateProgram, getAllEducationPrograms } = require('../controllers/index');

const router = Router();

router.get('/', getEducationPrograms);
router.get('/:id', getActiveEducationProgram);
router.get('/all/programs', checkAdmin, getAllEducationPrograms);
router.delete('/:id', checkAdmin, deleteProgram);
router.put('/:id', checkAdmin, updateProgram);



module.exports = router;