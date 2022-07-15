const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkAuth } = require('../middlewares/checkAuth');
const { getStudentsEducationPrograms, getStudentsEducationProgram, deleteStudentsEducationPrograms, updateStudentsEducationPrograms, buyStudentsEducationProgram, updateTestResult } = require('../controllers/index');
const { catcher } = require('../utils/catcher');

const router = Router();

router.get('/', checkAuth, catcher(getStudentsEducationPrograms));
router.get('/:id', checkAuth, catcher(getStudentsEducationProgram));
router.post('/', checkAuth, catcher(buyStudentsEducationProgram));
router.delete('/:id', checkAuth, catcher(deleteStudentsEducationPrograms));
router.put('/', checkAuth, catcher(updateTestResult))
router.put('/:id', checkAdmin, catcher(updateStudentsEducationPrograms));

module.exports = router;