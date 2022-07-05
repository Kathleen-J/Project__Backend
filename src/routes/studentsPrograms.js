const {Router} = require('express');
const { getStudentsEducationPrograms, deleteStudentsEducationPrograms, updateStudentsEducationPrograms } = require('../controllers/index');

const router = Router();

router.get('/', getStudentsEducationPrograms);
router.delete('/:id', deleteStudentsEducationPrograms);
router.put('/:id', updateStudentsEducationPrograms);

module.exports = router;