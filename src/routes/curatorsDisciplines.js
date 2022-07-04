const {Router} = require('express');
const { getActiveCuratorsOfDisciplines, getCuratorsOfDisciplines, deleteCuratorsDiscipline, updateCuratorsDiscipline } = require('../crud/index');

const router = Router();

router.get('/', getCuratorsOfDisciplines);
router.delete('/:id', deleteCuratorsDiscipline);
router.put('/:id', updateCuratorsDiscipline);
/* router.get('/', getActiveCuratorsOfDisciplines); */

module.exports = router;