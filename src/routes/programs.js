const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { getActiveEducationProgram, getEducationPrograms, deleteProgram, updateProgram, getAllEducationPrograms } = require('../controllers/index');
const { catcher } = require('../utils/catcher');

const router = Router();

router.get('/', catcher(getEducationPrograms));
router.get('/:id', catcher(getActiveEducationProgram));
router.get('/all/programs', checkAdmin, catcher(getAllEducationPrograms));
router.delete('/:id', checkAdmin, catcher(deleteProgram));
router.put('/:id', checkAdmin, catcher(updateProgram));



module.exports = router;