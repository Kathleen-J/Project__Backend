const {Router} = require('express');
const { getCuratorsDistribution } = require('../crud/index');

const router = Router();

router.get('/', getCuratorsDistribution);

module.exports = router;