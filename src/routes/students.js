const {Router} = require('express');
const { getStudents, deleteStudent, updateStudent } = require('../crud/index');

const router = Router();

router.get('/', getStudents);
router.delete('/:id', deleteStudent);
router.put('/:id', updateStudent);

module.exports = router;