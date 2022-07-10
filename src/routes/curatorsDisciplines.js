const {Router} = require('express');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { getCuratorsOfDisciplines, deleteCuratorsDiscipline, updateCuratorsDiscipline } = require('../controllers/index');

const router = Router();

router.get('/', checkAdmin, getCuratorsOfDisciplines);
router.delete('/:id', checkAdmin, deleteCuratorsDiscipline);
router.put('/:id', checkAdmin, updateCuratorsDiscipline);

module.exports = router;