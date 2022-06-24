const {Router} = require('express');
const { getEducationForms } = require('../db/crud/index');

const router = Router();

router.get('/', getEducationForms);

module.exports = router;