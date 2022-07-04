const {Router} = require('express');
const { getStudents, deleteStudent, updateStudent, updateStudentLogin, updateStudentPassword } = require('../crud/index');

const router = Router();

router.get('/', getStudents);
router.delete('/:id', deleteStudent);
router.put('/:id', updateStudent);
router.put('/login/:id', updateStudentLogin);
router.put('/password/:id', updateStudentPassword);

module.exports = router;