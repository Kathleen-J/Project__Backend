const {Router} = require('express');
const { getActiveUsers } = require('../crud/index');

const router = Router();

router.get('/', getActiveUsers);

module.exports = router;