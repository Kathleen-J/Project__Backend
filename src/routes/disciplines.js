const {Router} = require('express');
const { getActiveDisciplines } = require('../crud/index');

const router = Router();

router.get('/', getActiveDisciplines);

module.exports = router;