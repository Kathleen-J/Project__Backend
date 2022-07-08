const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { getCuratorsOfDisciplines, deleteCuratorsDiscipline, updateCuratorsDiscipline } = require('../controllers/index');
const { checkAuth } = require('../middlewares/checkAuth');

const router = Router();

router.get('/', checkAuth, getCuratorsOfDisciplines);
router.delete('/:id', checkAdmin, deleteCuratorsDiscipline);
router.put('/:id', checkAdmin, updateCuratorsDiscipline);

module.exports = router;