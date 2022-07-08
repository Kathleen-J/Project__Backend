const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkAuth } = require('../middlewares/checkAuth');
const { getStudentsEducationPrograms, deleteStudentsEducationPrograms, updateStudentsEducationPrograms } = require('../controllers/index');

const router = Router();

router.get('/', checkAuth, getStudentsEducationPrograms);
router.delete('/:id', checkAuth, deleteStudentsEducationPrograms);
router.put('/:id', checkAdmin, updateStudentsEducationPrograms);

module.exports = router;