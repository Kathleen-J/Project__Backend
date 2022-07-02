const {Router} = require('express');
const { getCurators, deleteCurator, updateCurator } = require('../crud/index');

const router = Router();

router.get('/', getCurators);
// router.get('/:id', getCurator);
router.delete('/:id', deleteCurator);
router.put('/:id', updateCurator);

module.exports = router;