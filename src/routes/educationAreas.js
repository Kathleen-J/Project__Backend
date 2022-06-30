const {Router} = require('express');
const { getActiveEducationAreas } = require('../crud/index');

const router = Router();

router.get('/', getActiveEducationAreas);

module.exports = router;