const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { deleteUser, updateUser, getCurators, getStudents, createUser, getStatusUser } = require('../controllers/index');
const {catcher} = require('../utils/catcher');
const { checkAuth } = require('../middlewares/checkAuth');

const router = Router();

router.get('/students', checkAuth, catcher(getStudents));
router.get('/curators', checkAuth, catcher(getCurators));
router.get('/:id', checkAuth, catcher(getStatusUser));
router.post('/', catcher(createUser));
router.put('/:id', checkAuth, catcher(updateUser));
router.delete('/:id', checkAdmin, catcher(deleteUser));

module.exports = router;