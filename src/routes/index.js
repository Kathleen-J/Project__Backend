const {Router} = require('express');
const areas = require('./educationAreas');
const programs = require('./educationPrograms');
const users = require('./users');
const students = require('./students');
const curators = require('./curators'); 
const studentsPrograms = require('./studentsEducationPrograms');
const curatorsDisciplines = require('./curatorsDisciplines');

const router = Router();

router.use('/areas', areas);
router.use('/programs', programs);
router.use('/users', users);
router.use('/students', students);
router.use('/curators', curators);
router.use('/studentsPrograms', studentsPrograms);
router.use('/curatorsDisciplines', curatorsDisciplines);

module.exports = router;