const {Router} = require('express');
const { getDisciplines, getDisciplinesJoin } = require('../db/crud/index');

const router = Router();

router.get('/', getDisciplines);
// router.get('/', getDisciplinesJoin);

module.exports = router;