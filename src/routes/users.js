const {Router} = require('express');
const { getUsers, getUsersJoin } = require('../db/crud/index');

const router = Router();

router.get('/', getUsers);
//router.get('/', getUsersJoin);

module.exports = router;