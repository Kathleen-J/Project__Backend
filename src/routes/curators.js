const {Router} = require('express');
const { getCurators, deleteCurator, updateCurator, updateCuratorLogin, updateCuratorPassword } = require('../crud/index');

const router = Router();

router.get('/', getCurators);
router.delete('/:id', deleteCurator);
router.put('/:id', updateCurator);
router.put('/login/:id', updateCuratorLogin);
router.put('/password/:id', updateCuratorPassword);

module.exports = router;