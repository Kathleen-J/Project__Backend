const {Router} = require('express');
const { getCuratorsOfDisciplines, deleteCuratorsDiscipline, updateCuratorsDiscipline } = require('../controllers/index');

const router = Router();

router.get('/', getCuratorsOfDisciplines);
router.delete('/:id', deleteCuratorsDiscipline);
router.put('/:id', updateCuratorsDiscipline);

module.exports = router;