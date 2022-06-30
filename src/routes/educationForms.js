const {Router} = require('express');
const { getEducationForms } = require('../crud/index');

const router = Router();

router.get('/', getEducationForms);

module.exports = router;