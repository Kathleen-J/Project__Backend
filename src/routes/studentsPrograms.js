const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkAuth } = require('../middlewares/checkAuth');
const { getStudentsEducationPrograms, deleteStudentsEducationPrograms, updateStudentsEducationPrograms } = require('../controllers/index');
const { catcher } = require('../utils/catcher');

const router = Router();

router.get('/', checkAuth, catcher(getStudentsEducationPrograms));
router.delete('/:id', checkAuth, catcher(deleteStudentsEducationPrograms));
router.put('/:id', checkAdmin, catcher(updateStudentsEducationPrograms));

module.exports = router;