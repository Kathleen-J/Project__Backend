const {Router} = require('express');
const { getCuratorsDistribution, getCuratorsDistributionJoin } = require('../db/crud/index');

const router = Router();

router.get('/', getCuratorsDistribution);
// router.get('/', getCuratorsDistributionJoin);

module.exports = router;