const {Router} = require('express');
const { getUsers } = require('../crud/index');

const router = Router();

router.get('/', getUsers);

module.exports = router;