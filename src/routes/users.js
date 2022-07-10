const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { deleteUser, updateUser, getCurators, getStudents, createUser } = require('../controllers/index');
const {catcher} = require('../utils/catcher');
const { checkAuth } = require('../middlewares/checkAuth');

const router = Router();

router.get('/students', checkAuth, catcher(getStudents));
router.get('/curators', checkAuth, catcher(getCurators));
router.post('/', catcher(createUser));
router.put('/:id', checkAuth, catcher(updateUser));
router.delete('/:id', checkAdmin, catcher(deleteUser));

module.exports = router;