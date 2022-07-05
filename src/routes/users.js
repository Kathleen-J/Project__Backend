const {Router} = require('express');
const { deleteUser, updateUser, getCurators, getStudents, createUser } = require('../controllers/index');

const router = Router();

router.get('/students', getStudents);
router.get('/curators', getCurators);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;