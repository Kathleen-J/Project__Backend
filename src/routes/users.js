const {Router} = require('express');
const { deleteUser, updateUser, getCurators, getStudents } = require('../controllers/index');

const router = Router();

router.get('/students', getStudents);
router.get('/curators', getCurators);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
// router.post('/:id', createUser);

module.exports = router;