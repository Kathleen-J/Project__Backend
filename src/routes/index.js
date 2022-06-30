const {Router} = require('express');
const areas = require('./educationAreas');
const programs = require('./educationPrograms');
const users = require('./users');
const studentsPrograms = require('./studentsEducationPrograms');
const curatorsDisciplines = require('./curatorsDisciplines');
const curatorsDistribution = require('./curatorsDistribution');

const router = Router();

router.use('/areas', areas);
router.use('/programs', programs);
router.use('/users', users);
router.use('/studentsPrograms', studentsPrograms);
router.use('/curatorsDisciplines', curatorsDisciplines);
router.use('/curatorsDistribution', curatorsDistribution);

module.exports = router;