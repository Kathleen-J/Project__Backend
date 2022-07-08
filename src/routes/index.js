const {Router} = require('express');
const areas = require('./areas');
const programs = require('./programs');
const users = require('./users');
const studentsPrograms = require('./studentsPrograms');
const curatorsDisciplines = require('./curatorsDisciplines');
const {catcher} = require('../utils/catcher');

const router = Router();

router.use('/areas', areas);
router.use('/programs', programs);
router.use('/users', users);
router.use('/studentsPrograms', studentsPrograms);
router.use('/curatorsDisciplines', curatorsDisciplines);

module.exports = router;