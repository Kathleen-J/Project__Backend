const {Router} = require('express');
const { getActiveEducationAreas } = require('../controllers/index');
const { catcher } = require('../utils/catcher');

const router = Router();

router.get('/', catcher(getActiveEducationAreas));

module.exports = router;