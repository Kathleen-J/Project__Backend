const {Router} = require('express');
const { getEducationAreas } = require('../db/crud/index');

const router = Router();

router.get('/', getEducationAreas);

module.exports = router;