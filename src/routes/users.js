const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { deleteUser, updateUser, getCurators, getStudents, createUser } = require('../controllers/index');
const {catcher} = require('../utils/catcher');
const { checkAuth } = require('../middlewares/checkAuth');

const router = Router();

router.get('/students', checkAuth, getStudents);
router.get('/curators', checkAuth, getCurators);
router.post('/', createUser);
router.put('/:id', checkAuth, updateUser);
router.delete('/:id', checkAdmin, deleteUser);

module.exports = router;