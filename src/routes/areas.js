const {Router} = require('express');
const { getActiveEducationAreas } = require('../controllers/index');

const router = Router();

router.get('/', getActiveEducationAreas);

module.exports = router;