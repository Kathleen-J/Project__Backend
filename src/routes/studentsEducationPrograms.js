const {Router} = require('express');
const { getStudentsEducationPrograms } = require('../crud/index');

const router = Router();

router.get('/', getStudentsEducationPrograms);

module.exports = router;