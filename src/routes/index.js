const {Router} = require('express');
const forms = require('./educationForms');
const areas = require('./educationAreas');
const disciplines = require('./disciplines');
const programs = require('./educationPrograms');
const users = require('./users');
const studentsPrograms = require('./studentsEducationPrograms');
const curatorsDisciplines = require('./curatorsDisciplines');
const curatorsDistribution = require('./curatorsDistribution');

const router = Router();

router.use('/forms', forms);
router.use('/areas', areas);
router.use('/disciplines', disciplines);
router.use('/programs', programs);
router.use('/users', users);
router.use('/studentsPrograms', studentsPrograms);
router.use('/curatorsDisciplines', curatorsDisciplines);
router.use('/curatorsDistribution', curatorsDistribution);

module.exports = router;